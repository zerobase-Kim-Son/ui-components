const $display = document.querySelector('.display');
const $firstControlBtn = document.querySelector('.control');
const $laps = document.querySelector('.laps');

let timer;

const stopwatch = (() => {
  const getRandomNum = () => Math.floor(Math.random() * 9 + 1);

  const randomNum = getRandomNum();
  let time = { mm: 0, ss: 0, ms: 0 };

  const format = time => (time < 10 ? `0${time}` : `${time}`);

  const timeDisplay = randomNum => {
    const ms = randomNum ? format(time.ms).slice(0, 1) + randomNum : format(time.ms);
    $display.textContent = `${format(time.mm)}:${format(time.ss)}:${ms}`;
  };
  return {
    start() {
      return setInterval(() => {
        time.ms++;

        if (time.ms > 99) {
          time.ss++;
          time.ms = 0;
        }

        if (time.ss > 59) {
          time.mm++;
          time.ss = 0;
        }

        timeDisplay(randomNum);
      }, 10);
    },
    stop(timer) {
      clearInterval(timer);

      timeDisplay();
    },
    reset() {
      time = { mm: 0, ss: 0, ms: 0 };
    },
    laps(lapNum) {
      $laps.innerHTML += `<div>${lapNum}</div><div>${format(time.mm)}:${format(time.ss)}:${format(time.ms)}</div>`;
    },
  };
})();

$firstControlBtn.onclick = ({ target }) => {
  let lapNum = 1;

  const $secondControlBtn = target.nextElementSibling;

  const toggleBtn = state => {
    if (state === 'Start') {
      target.textContent = 'Stop';

      $secondControlBtn.textContent = 'Laps';
      $secondControlBtn.disabled = false;

      timer = stopwatch.start();
    } else {
      target.textContent = 'Start';

      $secondControlBtn.textContent = 'Reset';

      stopwatch.stop(timer);
    }
  };

  toggleBtn(target.textContent);

  $secondControlBtn.onclick = ({ target }) => {
    if (target.textContent === 'Reset') {
      stopwatch.reset();
      $display.textContent = '00:00:00';
      target.disabled = true;
      lapNum = 0;
      $laps.innerHTML = '';
    }

    if (target.textContent === 'Laps') {
      if (!$laps.innerHTML) $laps.innerHTML += '<div class="lap-title">Laps</div><div class="lap-title">Time</div>';
      stopwatch.laps(lapNum);
      lapNum++;
    }
  };
};
