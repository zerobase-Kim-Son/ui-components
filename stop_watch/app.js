const $display = document.querySelector('.display');
const $controlBtn = document.querySelector('.control');
const $laps = document.querySelector('.laps');

const format = time => (time < 10 ? `0${time}` : time);

const time = { mm: 0, ss: 0, ms: 0 };

$controlBtn.onclick = e => {
  let timer;
  let num = 0;
  if (e.target.textContent === 'Start') {
    // element
    $controlBtn.textContent = 'Stop';
    $controlBtn.nextElementSibling.disabled = false;
    $controlBtn.nextElementSibling.textContent = 'Laps';

    // timer
    timer = setInterval(() => {
      time.ms++;

      if (time.ms > 99) {
        time.ss++;
        time.ms = 0;
      }

      if (time.ss > 59) {
        time.mm++;
        time.ss = 0;
      }

      $display.textContent = `${format(time.mm)}:${format(time.ss)}:${format(time.ms)}`;
    }, 10);

    // laps
    $controlBtn.nextElementSibling.onclick = () => {
      $laps.innerHTML +=
        num === 0
          ? '<div class="lap-title">Laps</div><div class="lap-title">Time</div>'
          : `<div>${num}</div><div>${format(time.mm)}:${format(time.ss)}:${format(time.ms)}</div>`;

      num++;
    };
  } else {
    // element
    $controlBtn.textContent = 'Start';
    $controlBtn.nextElementSibling.textContent = 'Reset';

    // timer
    clearInterval(timer);

    // reset
    $controlBtn.nextElementSibling.onclick = e => {
      $display.textContent = '00:00:00';
      e.target.disabled = true;

      time.mm = 0;
      time.ss = 0;
      time.ms = 0;

      $laps.innerHTML = '';

      num = 0;
    };
  }
};
