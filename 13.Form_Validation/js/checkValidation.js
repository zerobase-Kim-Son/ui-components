const getIconsAndMessage = target =>
  [...target.parentNode.children].filter(
    $element => $element.classList.contains('icon') || $element.classList.contains('error')
  );

const toggleIcon = ($icon, isValid) => {
  $icon.classList.toggle('hidden', isValid);
};

const checkValid = (regex, $target) => {
  const [$successIcon, $errorIcon, $errorMessage] = getIconsAndMessage($target);
  const isValid = regex.test($target.value);

  toggleIcon($errorIcon, isValid);
  if ($target.name === 'userid') $errorMessage.textContent = !isValid ? '이메일 형식에 맞게 입력해 주세요.' : '';
  if ($target.name === 'username') $errorMessage.textContent = !isValid ? '이름을 입력해 주세요.' : '';
  if ($target.name === 'password') $errorMessage.textContent = !isValid ? '영문 또는 숫자를 6 ~ 12자 입력하세요.' : '';
  toggleIcon($successIcon, !isValid);
};

export const checkUserid = $target => {
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  checkValid(regExp, $target);
};

export const checkUserName = $target => {
  const regExp = /^[0-9a-zA-Z]{1,}$/;
  checkValid(regExp, $target);
};

export const checkPassword = $target => {
  const regExp = /^[0-9a-zA-Z]{6,12}$/;
  checkValid(regExp, $target);
};

export const checkConfirmPassword = $target => {
  const [$successIcon, $errorIcon, $errorMessage] = getIconsAndMessage($target);
  const isValid = $target.parentNode.previousElementSibling.firstElementChild.value !== $target.value;
  toggleIcon($errorIcon, !isValid);
  $errorMessage.textContent = isValid ? '비밀번호가 일치하지 않습니다.' : '';
  toggleIcon($successIcon, isValid);
};
