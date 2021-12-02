const $accordion = document.querySelector('.accordion');

const render = () => {
  [...$accordion.children].forEach($menuContainer => {
    const $submenu = $menuContainer.children[1];

    $submenu.style.height = $menuContainer.classList.contains('active') ? `${$submenu.scrollHeight}px` : '0';

    if ($menuContainer.classList.contains('active')) $submenu.classList.add('notransition');
  });
};

render();

$accordion.onclick = ({ target }) => {
  if (!target.matches('.menu')) return;

  [...$accordion.children].forEach($menuContainer => {
    $menuContainer.classList.toggle('active', target.parentNode === $menuContainer);

    $menuContainer.children[1].style.height =
      target.parentNode === $menuContainer ? `${target.nextElementSibling.scrollHeight}px` : '0';
  });
};

window.onload = () => {
  [...$accordion.children].forEach($menuContainer => $menuContainer.children[1].classList.remove('notransition'));
};
