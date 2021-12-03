const carousel = ($container, images) => {
  // get img size
  const img = new Image();
  img.src = `${images[0]}`;

  // use img size set container size
  $container.style.width = img.width + 10 + 'px';
  $container.style.height = img.height + 10 + 'px';
  $container.style.opacity = 1;

  // container innerHTML
  $container.innerHTML = `
    <div class="carousel-slides">
      <img src="${images[images.length - 1]}">
      ${images.map(image => `<img src="${image}">`).join('')}
      <img src="${images[0]}">
    </div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>`;

  // slide
  const duration = 500;

  const $slides = document.querySelector('.carousel-slides');

  $slides.style.setProperty('--duration', duration);

  let transitionState = false;

  let idx = getComputedStyle($slides).getPropertyValue('--currentSlide');
  const slideNext = () => {
    $slides.style.setProperty('--currentSlide', ++idx);
    if (idx === images.length + 1) {
      setTimeout(() => {
        $slides.classList.add('notransition');
        $slides.style.setProperty('--currentSlide', 1);
        transitionState = false;
      }, duration);
      idx = 1;
    }
    $slides.classList.remove('notransition');
  };

  const slidePrev = () => {
    $slides.style.setProperty('--currentSlide', --idx);
    if (idx === 0) {
      setTimeout(() => {
        $slides.classList.add('notransition');
        $slides.style.setProperty('--currentSlide', images.length);
        transitionState = false;
      }, duration);
      idx = images.length;
    }
    $slides.classList.remove('notransition');
  };

  let slideInterval = setInterval(slideNext, duration * 10);

  $slides.ontransitionstart = () => {
    transitionState = true;
  };

  $slides.ontransitionend = () => {
    transitionState = false;
  };

  $container.onclick = ({ target }) => {
    if (!target.classList.contains('carousel-control')) return;

    clearInterval(slideInterval);
    if (transitionState === false) {
      target.classList.contains('prev') ? slidePrev() : slideNext();
      slideInterval = setInterval(slideNext, duration * 10);
    }
  };
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpeg',
  'movies/movie-2.jpeg',
  'movies/movie-3.jpeg',
  'movies/movie-4.jpeg',
]);
