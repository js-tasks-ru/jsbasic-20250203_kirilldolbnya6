import createElement from '../../assets/lib/create-element.js';

export default class Modal {

  #elem = null;

  constructor() {
    this.#elem = this.#render();
  }

  #template() {
    return `
    <div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>

        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>`;
  }

  #render() {
    this.#elem = createElement(this.#template());

    document.body.addEventListener('click', (event) => this.#closeEvent(event));
    document.body.addEventListener('keydown', (event) => this.#closeEvent(event));

    return this.#elem;
  }

  open() {
    document.body.append(this.#elem);
    document.body.classList.add('is-modal-open');
  }

  setTitle(title) {
    this.#elem.querySelector('.modal__title').textContent = title;
  }

  setBody(content) {
    const modalBody = this.#elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    this.#elem.querySelector('.modal__body').appendChild(content);
  }

  #closeEvent(event) {
    if (event.target.closest('.modal__close') || event.key === 'Escape') {
      this.#elem.remove();
      document.body.classList.remove('is-modal-open');
    }
  }

  close() {
    this.#elem.remove();
    document.body.classList.remove('is-modal-open');
  }

  get elem() {
    return this.#elem;
  }
}
