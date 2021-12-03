const $accordion = document.querySelector('.accordion');

[...$accordion.children].forEach($menuContainer => {
  const $submenu = $menuContainer.lastElementChild;

  $submenu.style.height = $menuContainer.classList.contains('active') ? `${$submenu.scrollHeight}px` : '0';

  if ($menuContainer.classList.contains('active')) $submenu.classList.add('notransition');
});

$accordion.onclick = ({ target }) => {
  if (!target.matches('.menu')) return;

  [...$accordion.children].forEach($menuContainer => {
    const $submenu = $menuContainer.lastElementChild;

    $submenu.classList.remove('notransition');

    $menuContainer.classList.toggle('active', target.parentNode === $menuContainer);

    $submenu.style.height = target.parentNode === $menuContainer ? `${$submenu.scrollHeight}px` : '0';
  });
};
