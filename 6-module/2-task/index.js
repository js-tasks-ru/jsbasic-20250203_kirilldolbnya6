import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  #elem = null;

  constructor(product) {
    this.product = product;
    this.#elem = this.#render();
  }

  #template () {
    return `
      <div class="card">
        <div class="card__top">
            <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
            <span class="card__price">€${this.product.price.toFixed(2) }</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this.product.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
      </div>
    `;
  }

  #render() {
    this.#elem = createElement(this.#template());

    this.#elem.querySelector(".card__button").addEventListener("click", (event) => this.#onClick(event));

    return this.#elem;
  }

  #onClick(event) {
    const newEvent = new CustomEvent('product-add', { detail: this.product.id, bubbles: true });
    event.target.closest('.card__button').dispatchEvent(newEvent);
    return newEvent;
  }

  get elem() {
    return this.#elem;
  }
}
