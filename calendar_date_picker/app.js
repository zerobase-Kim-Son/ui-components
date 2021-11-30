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

const format = (monthIndex, year) =>
  monthIndex < 0
    ? { monthIndex: 11, year: year - 1 }
    : monthIndex > 11
    ? { monthIndex: 0, year: +year + 1 }
    : { monthIndex, year };

const render = (monthIndex, year, pickDay) => {
  const [$month, $year] = [...$calendarMonthly.children];

  // nav
  const formatted = format(monthIndex, year);

  $month.dataset.index = formatted.monthIndex;

  $month.textContent = MONTH[$month.dataset.index];
  $year.textContent = formatted.year;

  // grid
  const getFirstDayOfMonth = (year, month) => new Date(year, month).getDay();
  const getLastDateOfMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getLastDateOfPrevMonth = (year, month) => new Date(year, month, 0).getDate();

  const date = [];
  let week = [];
  let day = getFirstDayOfMonth(year, monthIndex);
  for (let i = 1; i <= getLastDateOfMonth(year, monthIndex); i++) {
    if (day > 6) {
      day %= 7;
      date.push(week);
      week = [];
    }
    week[day] = i;
    day++;
  }
  date.push(week);

  let prevDate = getLastDateOfPrevMonth(year, monthIndex);
  const prevMonthDates = [];
  const firstWeek = date[0].filter(x => x);
  for (let i = 7 - firstWeek.length - 1; i >= 0; i--) {
    prevMonthDates.push(prevDate--);
  }

  const nextMonthDates = [];
  const lastWeek = [...date[date.length - 1]];
  for (let i = 0; i < 7 - lastWeek.length; i++) {
    nextMonthDates.push(i + 1);
  }

  $calendarGrid.innerHTML = '';

  ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].forEach(day => {
    const div = document.createElement('div');
    div.textContent = day;
    $calendarGrid.appendChild(div);
  });

  prevMonthDates.forEach(date => {
    const div = document.createElement('div');
    div.textContent = date;
    div.classList.add('date');
    div.classList.add('gray');
    const prevMonth = format(formatted.monthIndex - 1, formatted.year);
    div.dataset.date = `${prevMonth.year}-${prevMonth.monthIndex}`;
    $calendarGrid.appendChild(div);
  });

  date.forEach(week => {
    week.forEach((day, idx) => {
      const div = document.createElement('div');
      div.textContent = day;
      if (day === +pickDay) div.classList.add('active');
      if (day === today.getDate() && monthIndex === today.getMonth()) div.classList.add('today');
      div.classList.add('date');
      if (idx === 0) div.classList.add('red');
      if (idx === 6) div.classList.add('blue');
      div.dataset.date = `${formatted.year}-${formatted.monthIndex}`;
      $calendarGrid.appendChild(div);
    });
  });

  nextMonthDates.forEach(date => {
    const div = document.createElement('div');
    div.textContent = date;
    div.classList.add('date');
    div.classList.add('gray');
    const nextMonth = format(formatted.monthIndex + 1, formatted.year);
    div.dataset.date = `${nextMonth.year}-${nextMonth.monthIndex}`;
    $calendarGrid.appendChild(div);
  });

  $calendar.style.display = 'block';
};

$calendarNav.onclick = ({ target }) => {
  const [$month, $year] = [...$calendarMonthly.children];

  if (target.matches('.left') || target.matches('.left *')) render(--$month.dataset.index, $year.textContent);

  if (target.matches('.right') || target.matches('.right *')) render(++$month.dataset.index, $year.textContent);
};

$calendarGrid.onclick = ({ target }) => {
  if (!target.classList.contains('date')) return;
  const [year, month] = target.dataset.date.split('-');

  const formatLength = number => (number < 10 ? '0' + number : number);

  $datePicker.value = `${year}-${formatLength(+month + 1)}-${formatLength(target.textContent)}`;

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
