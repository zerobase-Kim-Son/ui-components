const carousel = ($container, images) => {
  (() => {
    // Get Image Size
    const image = new Image();
    image.src = `${images[0]}`;
    // Use Image Size to Set Container Size
    image.onload = () => {
      $container.style.width = `${image.width + 10}px`;
    };
  })();

  // Create Image Slide
  $container.innerHTML = `
    <div class="carousel-slides">
      <img src="${images[images.length - 1]}">
      ${images.map(image => `<img src="${image}">`).join('')}
      <img src="${images[0]}">
    </div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>`;

  $container.style.opacity = 1;

  // Set Movement
  const transitionTime = 500;

  const $slides = document.querySelector('.carousel-slides');

  $slides.style.setProperty('--duration', transitionTime);

  let transitionState = false;

  const prev = imageIndex => imageIndex - 1;

  const next = imageIndex => imageIndex + 1;

  const checkIndex = imageIndex => {
    if (imageIndex > 0 && imageIndex <= images.length) return imageIndex;

    const format = imageIndex => (imageIndex === 0 ? images.length : 1);

    setTimeout(() => {
      transitionState = false;
      $slides.classList.add('notransition');
      $slides.style.setProperty('--currentSlide', format(imageIndex));
    }, transitionTime);

    return format(imageIndex);
  };

  const slide = (() => {
    let imageIndex = 1;
    return direction => {
      imageIndex = direction(imageIndex);

      $slides.classList.remove('notransition');
      $slides.style.setProperty('--currentSlide', imageIndex);

      imageIndex = checkIndex(imageIndex);
    };
  })();

  let slideInterval = setInterval(() => {
    slide(next);
  }, transitionTime * 10);

  $slides.ontransitionrun = () => {
    transitionState = true;
  };

  $slides.ontransitionend = () => {
    transitionState = false;
  };

  $container.onclick = ({ target }) => {
    if (!target.classList.contains('carousel-control')) return;
    if (!transitionState === false) return;

    clearInterval(slideInterval);

    target.classList.contains('prev') ? slide(prev) : slide(next);

    slideInterval = setInterval(() => {
      slide(next);
    }, transitionTime * 10);
  };
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpeg',
  'movies/movie-2.jpeg',
  'movies/movie-3.jpeg',
  'movies/movie-4.jpeg',
]);
