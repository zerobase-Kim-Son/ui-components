export const hideForm = (target, $form) => {
  if (!target.matches('.link > a')) return;
  if ($form.classList.contains('signin')) {
    $form.classList.add('hidden');
    $form.nextElementSibling.classList.remove('hidden');
  } else {
    $form.classList.add('hidden');
    $form.previousElementSibling.classList.remove('hidden');
  }
};
