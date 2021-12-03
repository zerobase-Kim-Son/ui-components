import { renderIcon } from './renderIcon.js';
import { hideForm } from './hideForm.js';
import { toaster, createToastAction } from './toaster.js';

const $forms = document.querySelectorAll('.form');

// TODO: POST 요청
[...$forms].forEach($form => {
  $form.addEventListener('submit', e => {
    e.preventDefault();

    $form.classList.contains('signin')
      ? toaster.add(createToastAction('success', 'Well done!', 'Signin Successfully'))
      : toaster.add(createToastAction('success', 'Well done!', 'Signup Successfully'));
  });

  $form.addEventListener('input', ({ target }) => {
    const $submitBtn = $form.querySelector('.button');
    renderIcon(target, $submitBtn, $form);
  });

  $form.addEventListener('click', ({ target }) => {
    hideForm(target, $form);
  });
});
