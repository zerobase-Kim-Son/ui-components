import { checkUserid, checkUserName, checkPassword, checkConfirmPassword } from './checkValidation.js';

export const renderIcon = (target, $submitBtn, $form) => {
  if (target.name === 'userid') checkUserid(target);
  if (target.name === 'username') checkUserName(target);
  if (target.name === 'password') checkPassword(target);
  if (target.name === 'confirm-password') checkConfirmPassword(target);
  const $successIcons = [...$form.querySelectorAll('.icon-success')];
  const countSuccessIcons = [...$successIcons].filter($successIcon => $successIcon.classList.contains('hidden')).length;

  countSuccessIcons === 0 ? ($submitBtn.disabled = false) : ($submitBtn.disabled = true);
};
