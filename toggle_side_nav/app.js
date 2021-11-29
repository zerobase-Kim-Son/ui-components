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
    .split('=')[1];
};

const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`;
};

if (getCookie('isActive') === 'true') $navBar.classList.add('active');

$toggleBtn.onclick = e => {
  $navBar.classList.toggle('active');
};

window.addEventListener('beforeunload', e => {
  e.preventDefault();
  setCookie('isActive', $navBar.classList.contains('active'));
});
