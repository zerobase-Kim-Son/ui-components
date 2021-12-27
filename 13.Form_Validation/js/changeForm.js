const changeForm = ($target, $forms) => {
  if (!$target.matches('.link > a')) return;
  [...$forms].forEach($form => {
    $form.classList.toggle('hidden');
  });
};

export default changeForm;
