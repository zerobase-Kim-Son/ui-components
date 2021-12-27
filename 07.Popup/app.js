const $toggleBtn = document.querySelector('.toggle');
const $popUp = document.querySelector('.popup');
const $popUpMessage = document.querySelector('.popup-message');
const $message = document.querySelector('.message');

const showMessage = () => {
  $popUpMessage.textContent = 'from popup : ' + $message.value;
  $message.value = '';
};

$toggleBtn.onclick = () => {
  $popUp.style.display = 'block';
};

$popUp.onclick = ({ target }) => {
  if (!(target.matches('button') || target.classList.contains('popup'))) return;

  if (target.classList.contains('ok')) showMessage();

  $popUp.style.display = 'none';
};

$message.onkeyup = e => {
  if (e.key !== 'Enter') return;

  showMessage();

  $popUp.style.display = 'none';
};
