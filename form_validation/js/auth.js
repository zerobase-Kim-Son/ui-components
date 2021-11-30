const $form = document.querySelectorAll('.form');
const $link = document.querySelector('.link');

const [$signin, $signup] = [...$form];

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

// $link.onclick = e => {};
