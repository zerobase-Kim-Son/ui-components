import { checkUserid, checkUserName, checkPassword } from './checkValidation';
const $forms = document.querySelectorAll('.form');

const [$signin, $signup] = [...$forms];

// TODO: POST 요청
$signin.onsubmit = e => {
  e.preventDefault();
  console.log(e);
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
