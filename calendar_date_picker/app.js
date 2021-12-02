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

const format = (month, year) =>
  month < 0 ? { month: 11, year: year - 1 } : month > 11 ? { month: 0, year: +year + 1 } : { month, year: +year };

const getCalendarDates = (year, month) => {
  const currentMonthDates = (() => {
    const getLastDateOfMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    return Array.from({ length: getLastDateOfMonth(year, month) }, (_, idx) => idx + 1);
  })();

  const prevMonthDates = (() => {
    const getLastDateOfPrevMonth = (year, month) => new Date(year, month, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month).getDay();

    return Array.from(
      { length: getFirstDayOfMonth(year, month) },
      (_, idx) => getLastDateOfPrevMonth(year, month) - idx
    ).reverse();
  })();

  const nextMonthDates = (() => {
    const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0).getDay();

    return Array.from({ length: 6 - getLastDayOfMonth(year, month) }, (_, idx) => idx + 1);
  })();

  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
};

const render = (year, month, pickDate) => {
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
  const formatted = format(month, year);

  $month.dataset.month = formatted.month;
  $month.textContent = MONTH[$month.dataset.month];

  $year.textContent = formatted.year;

  // grid
  $calendarGrid.innerHTML = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => `<div>${day}</div>`).join('');

  let isCurrentMonth = false;
  getCalendarDates(year, month).forEach(date => {
    isCurrentMonth = date === 1 ? !isCurrentMonth : isCurrentMonth;
    if (isCurrentMonth) {
      $calendarGrid.innerHTML += `<div class="date">${date}</div>`;
    } else {
      $calendarGrid.innerHTML += `<div class="date gray">${date}</div>`;
    }
  });

  $calendar.style.display = 'block';
};

$calendarNav.onclick = ({ target }) => {
  if (!target.matches('.bx')) return;

  const [$month, $year] = [...$calendarMonthly.children];

  let { month } = $month.dataset;
  target.classList.contains('left') ? month-- : month++;

  render($year.textContent, month);
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
  if (!target.value) render(today.getFullYear(), today.getMonth());
  else {
    const [year, month, day] = target.value.split('-');
    render(month - 1, year, day);
  }
};

window.onclick = ({ target }) => {
  if (target.matches('.calendar *') || target.matches('.date-picker')) return;
  $calendar.style.display = 'none';
};
