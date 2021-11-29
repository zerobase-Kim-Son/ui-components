const $display = document.querySelector('.display');
const $controlBtns = document.querySelectorAll('.control');

let ms = 0;
let ss = 0;
let mm = 0;

let timer;

const getMsString = ms => {
  const modms = ms % 100;
  return modms < 9 ? '0' + modms : modms;
};

$controlBtns.forEach($btn => {
  $btn.onclick = e => {
    if (e.target.textContent === 'Start') {
      $btn.textContent = 'Stop';
      timer = setInterval(() => {
        ms++;

        ss = Math.floor(ms / 100);

        mm = Math.floor(ss / 60);
        mm = mm > 9 ? mm : '0' + mm;

        $display.textContent = `${mm}:${ss}:${getMsString(ms)}`;
      }, 10);
    } else {
      $btn.textContent = 'Start';
      clearInterval(timer);
    }
  };
});
