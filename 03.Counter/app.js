const $increaseBtn = document.querySelector('.increase');
const $decreaseBtn = document.querySelector('.decrease');
const $counter = document.querySelector('.counter');

const increase = count => count + 1;

const decrease = count => (count < 1 ? 0 : count - 1);

const counter = (() => {
  let count = 0;
  return operation => {
    count = operation(count);
    return count;
  };
})();

$increaseBtn.onclick = () => {
  $counter.textContent = counter(increase);
};

$decreaseBtn.onclick = () => {
  $counter.textContent = counter(decrease);
};
