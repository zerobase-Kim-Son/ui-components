const $navBar = document.querySelector('.nav-bar');
const $main = document.querySelector('main');
const $toggle = document.querySelector('.toggle');

window.addEventListener('DOMContentLoaded', () => {
  [$navBar, $main, $toggle].forEach($element => $element.classList.add('notransition'));

  const isToggle = JSON.parse(localStorage.getItem('toggle'));

  $navBar.classList.toggle('active', isToggle);
});

$toggle.onclick = () => {
  [$navBar, $main, $toggle].forEach($element => $element.classList.remove('notransition'));

  $navBar.classList.toggle('active');

  localStorage.setItem('toggle', $navBar.classList.contains('active'));
};
