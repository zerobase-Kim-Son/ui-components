const $scrollIcon = document.querySelector('.scroll-icon');

// use lodash?
const throttle = (callback, delay) => {
  let timerId;
  return event => {
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(event);
        timerId = null;
      },
      delay,
      event
    );
  };
};

const displayIcon = () => {
  if (window.pageYOffset < 100) $scrollIcon.style.display = 'none';
  else $scrollIcon.style.display = 'block';
};

window.addEventListener('scroll', throttle(displayIcon, 500));

$scrollIcon.onclick = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
