const $form = document.querySelector('.form');
const $submitBtn = document.querySelector('.signin.button');

const getIconsAndMessage = target =>
  [...target.parentNode.children].filter(
    $element => $element.classList.contains('icon') || $element.classList.contains('error')
  );

const toggleIcon = ($icon, isValid) => {
  $icon.classList.toggle('hidden', isValid);
};

const checkUserid = $target => {
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const [$successIcon, $errorIcon, $errorMessage] = getIconsAndMessage($target);
  const isValid = regExp.test($target.value);

  toggleIcon($errorIcon, isValid);
  $errorMessage.textContent = !isValid ? '이메일 형식에 맞게 입력해 주세요.' : '';
  toggleIcon($successIcon, !isValid);
};

const checkPassword = $target => {
  const regExp = /^[0-9a-zA-Z]{6,12}$/;
  const [$successIcon, $errorIcon, $errorMessage] = getIconsAndMessage($target);
  const isValid = regExp.test($target.value);

  toggleIcon($errorIcon, isValid);
  $errorMessage.textContent = !isValid ? '영문 또는 숫자를 6 ~ 12자 입력하세요.' : '';
  toggleIcon($successIcon, !isValid);
};

$form.oninput = ({ target }) => {
  if (target.id === 'signin-userid') checkUserid(target);
  if (target.id === 'signin-password') checkPassword(target);
  const $successIcons = document.querySelectorAll('.icon-success');
  const countSuccessIcons = [...$successIcons].filter($successIcon => $successIcon.classList.contains('hidden')).length;

  countSuccessIcons === 0 ? ($submitBtn.disabled = false) : ($submitBtn.disabled = true);
};
