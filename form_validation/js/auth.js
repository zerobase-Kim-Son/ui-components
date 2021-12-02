const $forms = document.querySelectorAll('.form');
const $link = document.querySelector('.link');

const [$signin, $signup] = [...$forms];

const getIconsAndMessage = target => {
  return [...target.parentNode.children].filter(
    $element => $element.classList.contains('icon') | $element.classList.contains('error')
  );
};

const toggleIcon = ($icon, isValid) => {
  $icon.classList.toggle('hidden', isValid);
};

// TODO: check함수 내부의 중복 요소들 함수화 => 유효한 필드값인지 확인하는 함수

const checkValid = (exp, $target) => {
  const [$successIcon, $errorIcon, $errorMessage] = getIconsAndMessage($target);
  const isValid = exp.test($target.value);

  toggleIcon($errorIcon, isValid);
  if ($target.name === 'userid') $errorMessage.textContent = !isValid ? '이메일 형식에 맞게 입력해 주세요.' : '';
  if ($target.name === 'username') $errorMessage.textContent = !isValid ? '이름을 입력해 주세요.' : '';
  if ($target.name === 'password') $errorMessage.textContent = !isValid ? '영문 또는 숫자를 6 ~ 12자 입력하세요.' : '';
  if ($target.name === 'confirm-password') $errorMessage.textContent = !isValid ? '비밀번호가 일치하지 않습니다.' : '';
  toggleIcon($successIcon, !isValid);
};

const checkUserid = $target => {
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  checkValid(regExp, $target);
};

const checkUserName = $target => {
  const regExp = /^[0-9a-zA-Z]{1,}$/;
  checkValid(regExp, $target);
};

const checkPassword = $target => {
  const $password = document.querySelector('#signup-password');
  const regExp = /^[0-9a-zA-Z]{6,12}$/;
  checkValid(regExp, $target);
};

$signin.oninput = ({ target }) => {
  const $submitBtn = $signin.querySelector('.button');
  if (target.id === 'signin-userid') checkUserid(target);
  if (target.id === 'signin-password') checkPassword(target);
  const $successIcons = [...$signin.querySelectorAll('.icon-success')];
  const countSuccessIcons = [...$successIcons].filter($successIcon => $successIcon.classList.contains('hidden')).length;

  countSuccessIcons === 0 ? ($submitBtn.disabled = false) : ($submitBtn.disabled = true);
};

$signup.oninput = ({ target }) => {
  const $submitBtn = $signup.querySelector('.button');
  if (target.id === 'signup-userid') checkUserid(target);
  if (target.id === 'signup-name') checkUserName(target);
  if (target.id === 'signup-password' || target.id === 'signup-confirm-password') checkPassword(target);

  const $successIcons = [...$signup.querySelectorAll('.icon-success')];
  const countSuccessIcons = [...$successIcons].filter($successIcon => $successIcon.classList.contains('hidden')).length;

  countSuccessIcons === 0 ? ($submitBtn.disabled = false) : ($submitBtn.disabled = true);
};

$signin.onclick = ({ target }) => {
  if (!target.matches('.link > a')) return;
  $signin.classList.add('hidden');
  $signup.classList.remove('hidden');
};

$signup.onclick = ({ target }) => {
  if (!target.matches('.link > a')) return;
  $signup.classList.add('hidden');
  $signin.classList.remove('hidden');
};
