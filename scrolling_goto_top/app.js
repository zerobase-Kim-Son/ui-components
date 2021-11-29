const $scrollIcon = document.querySelector('.scroll-icon');

// 100 이상인 경우 block
// console.log(window.scroll(0, 100));

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
  console.log(pageYOffset);
  if (pageYOffset < 100) $scrollIcon.style.display = 'none';
  else $scrollIcon.style.display = 'block';
};

const scrollToTop = () => {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  // console.log(height);
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 10);
  }
};

window.addEventListener('scroll', throttle(displayIcon, 100));

$scrollIcon.onclick = e => {
  e.preventDefault();
  scrollToTop();
};
