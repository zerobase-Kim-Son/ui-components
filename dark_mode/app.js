const $toggleButton = document.querySelector('.toggle-button');

const getTheme = () => localStorage.getItem('theme');

const setTheme = theme => localStorage.setItem('theme', theme);

const initialTheme = () => {
  if (getTheme()) return;

  window.matchMedia('(prefers-color-scheme: dark)').matches ? setTheme('dark') : setTheme('light');
};

const render = () => {
  initialTheme();

  if (getTheme() !== 'dark') return;

  document.body.classList.add('dark');
};

$toggleButton.onclick = () => {
  document.body.classList.toggle('dark');

  document.body.classList.contains('dark') ? setTheme('dark') : setTheme('light');
};

render();
