const $increaseBtn = document.querySelector('.increase');
const $decreaseBtn = document.querySelector('.decrease');

const $counter = document.querySelector('.counter');

const counter = (() => {
  let num = 0;
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    },
  };
})();

$increaseBtn.onclick = e => {
  $counter.textContent = counter.increase();
};

$decreaseBtn.onclick = e => {
  $counter.textContent = counter.decrease();
};
