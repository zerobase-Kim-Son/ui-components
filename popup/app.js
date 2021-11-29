const $toggleBtn = document.querySelector('.toggle');
const $popUp = document.querySelector('.popup-container');
const $popUpMessage = document.querySelector('.popup-message');
const $message = document.querySelector('.message');

$toggleBtn.onclick = e => {
  $popUp.style.display = 'block';
};

$popUp.onclick = e => {
  const { target } = e;
  if (
    target.classList.contains('closeBtn') ||
    target.classList.contains('popup-container') ||
    target.classList.contains('cancel')
  ) {
    $popUp.style.display = 'none';
  }

  if (target.classList.contains('ok')) {
    $popUpMessage.textContent = 'from popup : ' + e.target.previousElementSibling.value;
    e.target.previousElementSibling.value = '';
    $popUp.style.display = 'none';
  }
};

$message.onkeyup = e => {
  if (e.key !== 'Enter') return;
  $popUpMessage.textContent = 'from popup : ' + e.target.value;
  e.target.value = '';
  $popUp.style.display = 'none';
};
