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
    <img src="${images[3]}">
    <img src="${images[0]}">
    <img src="${images[1]}">
    <img src="${images[2]}">
    <img src="${images[3]}">
    <img src="${images[0]}">
  </div>
  <button class="carousel-control prev">&laquo;</button>
  <button class="carousel-control next">&raquo;</button>
  `;

  // slide
  const duration = 300;

  const $slides = document.querySelector('.carousel-slides');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  $slides.style.setProperty('--duration', duration);

  let idx = 1;
  const slideNext = () => {
    $slides.style.setProperty('--currentSlide', ++idx);
    if (idx === 5) {
      setTimeout(() => {
        $slides.classList.add('noanimation');
        $slides.style.setProperty('--currentSlide', 1);
      }, duration);
      idx = 1;
    }
    $slides.classList.remove('noanimation');
  };

  const slidePrev = () => {
    $slides.style.setProperty('--currentSlide', --idx);
    if (idx === 0) {
      setTimeout(() => {
        $slides.classList.add('noanimation');
        $slides.style.setProperty('--currentSlide', 4);
      }, duration);
      idx = 4;
    }
    $slides.classList.remove('noanimation');
  };

  let slideInterval = setInterval(slideNext, duration * 10);

  prev.onclick = e => {
    clearInterval(slideInterval);
    slidePrev();
    slideInterval = setInterval(slideNext, duration * 10);
  };

  next.onclick = e => {
    clearInterval(slideInterval);
    slideNext();
    slideInterval = setInterval(slideNext, duration * 10);
  };
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpeg',
  'movies/movie-2.jpeg',
  'movies/movie-3.jpeg',
  'movies/movie-4.jpeg',
]);
