const toaster = {
  toast: [],
  add(toast) {
    this.toast = [...this.toast, { ...toast, bottom: 0 }];
    let toastCount = this.toast.length;

    const div = document.createElement('div');
    div.className = `toast toast-${toast.type}`;
    div.innerHTML = `
      <h4 class="toast-heading">${toast.title} ${toastCount - 1}</h4>
      <div class="toast-message">
        <svg width="24" height="24">
          <use xlink:href="#${toast.type}" />
        </svg>
        <p>${toast.message}</p>
      </div>
      <a class="close">&times;</a>`;

    document.body.appendChild(div);

    setTimeout(() => {
      document.body.removeChild(div);
      this.toast.shift();
    }, 3000);

    this.toast = this.toast.map(element => ({ ...element, bottom: --toastCount * 100 }));

    [...document.querySelectorAll('.toast')].forEach(($toast, idx) => {
      $toast.style.bottom = this.toast[idx].bottom + 'px';
    });
  },
};

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

const createToastAction = (type, title, message) => ({ type, title, message });

// Button click Event Handlers
document.querySelector('.show-success').onclick = () =>
  toaster.add(createToastAction(TOAST_TYPE.SUCCESS, 'Well done!', 'This is a success alert'));

document.querySelector('.show-error').onclick = () =>
  toaster.add(createToastAction(TOAST_TYPE.ERROR, 'Check it out!', 'This is a error alert'));

document.querySelector('.show-warning').onclick = () =>
  toaster.add(createToastAction(TOAST_TYPE.WARNING, 'Check it out!', 'This is a warning alert'));
