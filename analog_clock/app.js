// const root = document.documentElement;
const $hand = document.querySelector('.hand');
const $secondHand = document.querySelector('.second');
const $minuteHand = document.querySelector('.minute');
const $hourHand = document.querySelector('.hour');

// 초침 → 1초당 6도씩
// 분침 → 60초당 6도씩
// 시침 → 3600초당 30도씩 ,

let date = new Date();
let hour = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();

let hourDeg = (hour % 12) * 30 + min * 0.5 + sec * 0.008;
let minuteDeg = min * 6 + sec * 0.1;
let secondDeg = sec * 6;

const runClock = () => {
  hourDeg += 0.008;
  minuteDeg += 0.1;
  secondDeg += 6;

  $secondHand.style.setProperty('--deg', secondDeg % 360);
  $minuteHand.style.setProperty('--deg', minuteDeg % 360);
  $hourHand.style.setProperty('--deg', hourDeg % 360);
};

setInterval(runClock, 1000);
