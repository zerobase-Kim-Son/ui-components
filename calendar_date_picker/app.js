const $calendar = document.querySelector('.calendar');
const $calendarNav = document.querySelector('.calendar-nav');
const $calendarMonthly = document.querySelector('.calendar-monthly');
const $calendarGrid = document.querySelector('.calendar-grid');
const $datePicker = document.querySelector('.date-picker');

const today = new Date();

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

const format = (year, month) =>
  month < 0 ? { year: year - 1, month: 11 } : month > 11 ? { year: +year + 1, month: 0 } : { year: +year, month };

const render = ({ year, month }) => {
  const [$month, $year] = [...$calendarMonthly.children];

  $month.dataset.month = month;
  $month.textContent = [
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
  ][month];

  $year.textContent = year;

  // grid
  $calendarGrid.innerHTML = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => `<div>${day}</div>`).join('');

  let isCurrentMonth = false;
  getCalendarDates(year, month).forEach(date => {
    isCurrentMonth = date === 1 ? !isCurrentMonth : isCurrentMonth;
    const monthly = date < 7 ? format(year, month + 1) : format(year, month - 1);

    if (isCurrentMonth) {
      $calendarGrid.innerHTML += `<div class="date" data-monthly="${year}-${month}">${date}</div>`;
    } else {
      $calendarGrid.innerHTML += `<div class="date gray" data-monthly="${monthly.year}-${monthly.month}">${date}</div>`;
    }
  });

  const isEqualDate = (date1, date2) => {
    const isEqualYear = date1.getFullYear() === date2.getFullYear();
    const isEqualMonth = date1.getMonth() === date2.getMonth();
    const isEqualDay = date1.getDate() === date2.getDate();

    return isEqualYear && isEqualMonth && isEqualDay;
  };

  const pickDate = new Date(...$datePicker.value.split('-').map((el, i) => (i === 1 ? el - 1 : el)));

  [...$calendarGrid.children].forEach($date => {
    if (!$date.classList.contains('date')) return;

    const newDate = new Date(...$date.dataset.monthly.split('-'), $date.textContent);
    const day = newDate.getDay();

    if (day === 0) $date.classList.add('red');
    if (day === 6) $date.classList.add('blue');

    if (isEqualDate(newDate, pickDate)) $date.classList.add('active');
    if (isEqualDate(newDate, today)) $date.classList.add('today');
  });

  $calendar.style.display = 'block';
};

$calendarNav.onclick = ({ target }) => {
  if (!target.matches('.bx')) return;

  const [$month, $year] = [...$calendarMonthly.children];

  let { month } = $month.dataset;
  target.classList.contains('left') ? month-- : month++;

  render(format($year.textContent, month));
};

$calendarGrid.onclick = ({ target }) => {
  if (!target.classList.contains('date')) return;

  const [year, month] = target.dataset.monthly.split('-');
  const date = target.textContent;

  const dateString = (() => `${year}-${month < 9 ? `0${+month + 1}` : +month + 1}-${date < 10 ? `0${date}` : date}`)();

  $datePicker.value = dateString;

  $calendar.style.display = 'none';
};

$datePicker.onclick = ({ target }) => {
  if (!target.value) render(format(today.getFullYear(), today.getMonth()));
  else {
    const [year, month] = target.value.split('-');
    render({ ...format(year, month - 1) });
  }
};

window.onclick = ({ target }) => {
  if (target.matches('.calendar *') || target.matches('.date-picker')) return;
  $calendar.style.display = 'none';
};
