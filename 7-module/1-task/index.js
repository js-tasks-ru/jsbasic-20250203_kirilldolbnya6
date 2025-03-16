import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  #elem = null;

  constructor(categories) {
    this.categories = categories;
    this.#elem = this.#render();
  }

  #template() {
    return `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
        ${this.categories.map(category => `
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
        `).join('')
        }
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`;
  }

  #render() {
    this.#elem = createElement(this.#template());

    this.#elem.addEventListener('click', (event) => this.#onClick(event));
    this.#elem.addEventListener('click', (event) => this.#scrollEvent(event));

    return this.#elem;
  }

  #onClick(event) {
    event.preventDefault();

    const category = event.target.closest('.ribbon__item');

    if (category) {
      const newEvent = new CustomEvent('ribbon-select', { detail: category.getAttribute('data-id'), bubbles: true });
      category.dispatchEvent(newEvent);
      return newEvent;
    }
  }

  #scrollEvent(event) {
    const ribbon = event.target.closest('.ribbon');
    const ribbonInner = ribbon.querySelector('.ribbon__inner');
    const btnLeftTarget = event.target.closest('.ribbon__arrow_left');
    const btnLeft = ribbon.querySelector('.ribbon__arrow_left');
    const btnRightTarget = event.target.closest('.ribbon__arrow_right');
    const btnRight = ribbon.querySelector('.ribbon__arrow_right');

    if (btnLeftTarget) {
      ribbonInner.scrollBy(-350, 0);
      this.#checkScroll(ribbon, btnLeft, btnRight);
    } else if (btnRightTarget) {
      ribbonInner.scrollBy(350, 0);
      this.#checkScroll(ribbon, btnLeft, btnRight);
    }
  }

  #checkScroll(ribbon, btnLeft, btnRight) {
    const ribbonInner = ribbon.querySelector('.ribbon__inner');
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      btnLeft.classList.remove('ribbon__arrow_visible');
      btnRight.classList.add('ribbon__arrow_visible');
    } else if (scrollRight === 0) {
      btnLeft.classList.add('ribbon__arrow_visible');
      btnRight.classList.remove('ribbon__arrow_visible');
    }
  }

  get elem() {
    return this.#elem;
  }

}
