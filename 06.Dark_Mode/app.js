const $toggleButton = document.querySelector('.toggle-button');

window.addEventListener('DOMContentLoaded', () => {
  [...$toggleButton.children].forEach($element => $element.classList.add('notransition'));

  if (localStorage.getItem('darkmode') === null)
    localStorage.setItem('darkmode', window.matchMedia('(prefers-color-scheme: dark)').matches);

  document.body.classList.toggle('dark', JSON.parse(localStorage.getItem('darkmode')));

  document.body.style.visibility = 'visible';
});

$toggleButton.onclick = () => {
  [...$toggleButton.children].forEach($element => $element.classList.remove('notransition'));

  document.body.classList.toggle('dark');

  localStorage.setItem('darkmode', document.body.classList.contains('dark'));
};
