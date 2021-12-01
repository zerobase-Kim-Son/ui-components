const $increaseBtn = document.querySelector('.increase');
const $decreaseBtn = document.querySelector('.decrease');
const $counter = document.querySelector('.counter');

const counter = (() => {
  let count = 0;
  return {
    increase() {
      return ++count;
    },
    decrease() {
      return count > 0 ? --count : 0;
    },
  };
})();

$increaseBtn.onclick = () => {
  $counter.textContent = counter.increase();
};

$decreaseBtn.onclick = () => {
  $counter.textContent = counter.decrease();
};
