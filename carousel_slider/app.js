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
  // TODO: image 값 → 동적 생성, 이미지의 갯수도 가변적이다 → 이미지 배열을 받아서
  // TODO: 0번과 3번 → cloneNode
  /*
        const img = new Image();
          img.src = $carouselSlides.lastElementChild.getAttribute('src');
          image.width | image.height → padding의 넓이도 고려(scrollWidth)
          이미지 원본의 크기를 구한다
  */
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
   * TODO: duration 설정 → 우측으로 이미지가 이동, clearInterval 설정
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
