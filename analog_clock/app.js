const $hands = document.querySelectorAll('.hand');

const getCurrentTime = () => {
  const date = new Date();
  return { hh: date.getHours(), mm: date.getMinutes(), ss: date.getSeconds() };
};

const setInitialDeg = () => {
  const { hh, mm, ss } = getCurrentTime();

  return {
    hhDeg: (hh % 12) * 30 + mm * 0.5 + ss * (1 / 120),
    mmDeg: mm * 6 + ss * 0.1,
    ssDeg: ss * 6,
  };
};

let degs = Object.values(setInitialDeg());

const setDeg = () => {
  degs = [degs[0] + 1 / 120, degs[1] + 0.1, degs[2] + 6];
};

const render = () => {
  setDeg();

  $hands.forEach(($hand, idx) => {
    const format = deg => deg % 360;
    $hand.style.setProperty('--deg', format(degs[idx]));
  });
};

setInterval(() => render(), 1000);
