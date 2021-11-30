// <!-- <div class="carousel-slides">
//         <img src="movies/movie-4.jpg">
//         <img src="movies/movie-1.jpg">
//         <img src="movies/movie-2.jpg">
//         <img src="movies/movie-3.jpg">
//         <img src="movies/movie-4.jpg">
//         <img src="movies/movie-1.jpg">
//       </div>
//       <button class="carousel-control prev">&laquo;</button>
//       <button class="carousel-control next">&raquo;</button> -->
const carousel = ($container, images) => {
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

  /**
   * TODO: duration 설정, clearInterval 설정
   */

  const slides = document.querySelector('.carousel-slides');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  const slideNext = () => {
    slides.style.setProperty(
      '--currentSlide',
      getComputedStyle(slides).getPropertyValue('--currentSlide') > 3
        ? 0
        : +getComputedStyle(slides).getPropertyValue('--currentSlide') + 1
    );
  };

  const slideInterval = setInterval(slideNext, 5000);

  prev.onclick = e => {
    slides.style.setProperty(
      '--currentSlide',
      getComputedStyle(slides).getPropertyValue('--currentSlide') > 0
        ? getComputedStyle(slides).getPropertyValue('--currentSlide') - 1
        : 3
    );
  };

  next.onclick = e => {
    slides.style.setProperty(
      '--currentSlide',
      getComputedStyle(slides).getPropertyValue('--currentSlide') > 3
        ? 0
        : +getComputedStyle(slides).getPropertyValue('--currentSlide') + 1
    );
    console.log(getComputedStyle(slides).getPropertyValue('--currentSlide'));
  };
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpeg',
  'movies/movie-2.jpeg',
  'movies/movie-3.jpeg',
  'movies/movie-4.jpeg',
]);
