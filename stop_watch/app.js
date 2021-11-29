const $display = document.querySelector('.display');
const $btn1 = document.querySelector('.control');
const $laps = document.querySelector('.laps');

let ms = 0;
let ss = 0;
let mm = 0;

let num = 0;

let timer;

const laps = [];

const format = time => (time < 10 ? `0${time}` : time);

$btn1.onclick = e => {
  if (e.target.textContent === 'Start') {
    $btn1.textContent = 'Stop';

    timer = setInterval(() => {
      ms++;

      if (ms > 99) {
        ss++;
        ms = 0;
      }

      if (ss > 59) {
        mm++;
        ss = 0;
      }

      $display.textContent = `${format(mm)}:${format(ss)}:${format(ms)}`;
    }, 10);

    $btn1.nextElementSibling.disabled = false;
    $btn1.nextElementSibling.textContent = 'Laps';

    $btn1.nextElementSibling.onclick = e => {
      if (e.target.textContent !== 'Laps') return;
      $laps.innerHTML += `${
        num === 0 ? '<div class="lap-title">Laps</div><div class="lap-title">Time</div>' : ''
      }<div>${++num}</div>
      <div>${format(mm)}:${format(ss)}:${format(ms)}</div>`;
    };
  } else {
    $btn1.textContent = 'Start';

    clearInterval(timer);

    $btn1.nextElementSibling.textContent = 'Reset';

    $btn1.nextElementSibling.onclick = e => {
      if (e.target.textContent !== 'Reset') return;
      $display.textContent = '00:00:00';
      e.target.disabled = true;
      mm = 0;
      ss = 0;
      ms = 0;
      $laps.innerHTML = '';
      num = 0;
    };
  }
};
