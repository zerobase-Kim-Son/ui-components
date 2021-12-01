const $navBar = document.querySelector('.nav-bar');
const $toggleBtn = document.querySelector('.toggle');

const getCookie = cookieName => {
  const { cookie } = document;

  return cookie
    .split('; ')
    .filter(cookie => {
      const [name] = cookie.split('=');
      return name === cookieName;
    })[0]
    ?.split('=')[1];
};

const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`;
};

const toggleNoTransition = () => {
  $navBar.classList.toggle('notransition');
  document.querySelector('main').classList.toggle('notransition');
  $toggleBtn.classList.toggle('notransition');
};

$toggleBtn.onclick = () => {
  $navBar.classList.toggle('active');
};

window.addEventListener('beforeunload', e => {
  e.preventDefault();
  setCookie('isActive', $navBar.classList.contains('active'));
});

window.addEventListener('DOMContentLoaded', () => {
  toggleNoTransition();

  if (!(getCookie('isActive') === 'true')) return;

  $navBar.classList.add('active');
});

window.addEventListener('load', () => {
  toggleNoTransition();
});
