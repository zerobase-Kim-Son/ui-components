const $accordion = document.querySelector('.accordion');

[...$accordion.children].forEach($menuContainer => {
  $menuContainer.children[1].style.height = $menuContainer.classList.contains('active')
    ? `${$menuContainer.children[1].scrollHeight}px`
    : '0';
  if ($menuContainer.classList.contains('active')) $menuContainer.children[1].classList.add('notransition');
});

$accordion.onclick = e => {
  if (!(e.target.matches('.menu') || !e.target.matches('.menu *'))) return;

  [...$accordion.children].forEach($menuContainer => {
    $menuContainer.classList.toggle('active', e.target.parentNode === $menuContainer);
  });

  [...$accordion.children].forEach($menuContainer => {
    $menuContainer.children[1].style.height =
      e.target.parentNode === $menuContainer ? `${e.target.nextElementSibling.scrollHeight}px` : '0';
  });
};

window.onload = () => {
  [...$accordion.children].forEach($menuContainer => $menuContainer.children[1].classList.remove('notransition'));
};
