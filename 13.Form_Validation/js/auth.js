import { toaster, createToastAction } from './toaster.js';
import renderIcon from './renderIcon.js';
import changeForm from './changeForm.js';

const $forms = document.querySelectorAll('.form');
const $links = document.querySelectorAll('.link > a');

[...$forms].forEach($form => {
  $form.addEventListener('submit', e => {
    e.preventDefault();

    console.log(Object.fromEntries([...new FormData($form)]));

    $form.classList.contains('signin')
      ? toaster.add(createToastAction('success', 'Well done!', 'Signin Successfully'))
      : toaster.add(createToastAction('success', 'Well done!', 'Signup Successfully'));
  });

  $form.addEventListener('input', ({ target }) => {
    const $submitBtn = $form.querySelector('.button');
    renderIcon(target, $submitBtn, $form);
  });

  $form.addEventListener('click', ({ target }) => {
    changeForm(target, $forms);
  });
});
