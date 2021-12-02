/**
 * 1. 캘린더 크기 지정
 * 2. 날짜 클릭 시 'yyyy-mm-dd'형식의 문자열 콘솔 출력
 */

const $calendar = document.querySelector('.calendar');
const $calendarNav = document.querySelector('.calendar-nav');
const $calendarMonthly = document.querySelector('.calendar-monthly');
const $calendarGrid = document.querySelector('.calendar-grid');
const $datePicker = document.querySelector('.date-picker');

const today = new Date();

const format = (monthIndex, year) =>
  monthIndex < 0
    ? { monthIndex: 11, year: year - 1 }
    : monthIndex > 11
    ? { monthIndex: 0, year: +year + 1 }
    : { monthIndex, year: +year };

const render = (monthIndex, year, pickDate) => {
  console.log(pickDate);

  const MONTH = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [$month, $year] = [...$calendarMonthly.children];

  // nav
  const formatted = format(monthIndex, year);

  $month.dataset.index = formatted.monthIndex;
  $month.textContent = MONTH[$month.dataset.index];

  $year.textContent = formatted.year;

  // grid
  const getFirstDayOfMonth = (year, month) => new Date(year, month).getDay();

  const getCurrentMonthDates = () => {
    const getLastDateOfMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    const date = [];

    let day = getFirstDayOfMonth(year, monthIndex);
    for (let i = 1; i <= getLastDateOfMonth(year, monthIndex); i++) {
      date.push({ date: i, day });
      day = ++day > 6 ? (day %= 7) : day;
    }

    return date;
  };

  const getPrevMonthDates = () => {
    const getLastDateOfPrevMonth = (year, month) => new Date(year, month, 0).getDate();

    const date = [];

    let prevDate = getLastDateOfPrevMonth(year, monthIndex);
    for (let i = 0; i < getFirstDayOfMonth(year, monthIndex); i++) {
      date.push(prevDate--);
    }

    return date.reverse();
  };

  const getNextMonthDates = () => {
    const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0).getDay();

    const date = [];

    for (let i = 1; i < 7 - getLastDayOfMonth(year, monthIndex); i++) {
      date.push(i);
    }

    return date;
  };

  $calendarGrid.innerHTML = '';

  ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].forEach(day => {
    const div = document.createElement('div');
    div.textContent = day;
    $calendarGrid.appendChild(div);
  });

  getPrevMonthDates().forEach(date => {
    const month = format(formatted.monthIndex - 1, formatted.year);

    $calendarGrid.innerHTML += `
      <div class="date gray" data-date="${month.year}-${month.monthIndex}">${date}</div>
    `;
  });

  getCurrentMonthDates().forEach(info => {
    const div = document.createElement('div');

    div.textContent = info.date;
    div.classList.add('date');
    div.dataset.date = `${formatted.year}-${formatted.monthIndex}`;

    if (info.day === 0) div.classList.add('red');
    if (info.day === 6) div.classList.add('blue');

    if (info.date === +pickDate) div.classList.add('active');
    if (
      info.date === today.getDate() &&
      formatted.monthIndex === today.getMonth() &&
      formatted.year === today.getFullYear()
    )
      div.classList.add('today');

    $calendarGrid.appendChild(div);
  });

  getNextMonthDates().forEach(date => {
    const month = format(formatted.monthIndex + 1, formatted.year);

    $calendarGrid.innerHTML += `
      <div class="date gray" data-date="${month.year}-${month.monthIndex}">${date}</div>
    `;
  });

  $calendar.style.display = 'block';
};

$calendarNav.onclick = ({ target }) => {
  const [$month, $year] = [...$calendarMonthly.children];

  const [, , day] = $datePicker.value.split('-');

  if (target.matches('.left') || target.matches('.left *')) render(--$month.dataset.index, $year.textContent, day);

  if (target.matches('.right') || target.matches('.right *')) render(++$month.dataset.index, $year.textContent, day);
};

$calendarGrid.onclick = ({ target }) => {
  if (!target.classList.contains('date')) return;
  const [year, month] = target.dataset.date.split('-');

  const formatLength = number => (number < 10 ? '0' + number : number);

  $datePicker.value = `${year}-${formatLength(+month + 1)}-${formatLength(target.textContent)}`;

  console.log(`${year}-${formatLength(+month + 1)}-${formatLength(target.textContent)}`);

  $calendar.style.display = 'none';
};

$datePicker.onclick = ({ target }) => {
  if (!target.value) render(today.getMonth(), today.getFullYear());
  else {
    const [year, month, day] = target.value.split('-');
    render(month - 1, year, day);
  }
};

window.onclick = ({ target }) => {
  if (target.matches('.calendar *') || target.matches('.date-picker')) return;
  $calendar.style.display = 'none';
};
