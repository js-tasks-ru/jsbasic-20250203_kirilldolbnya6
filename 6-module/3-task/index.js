import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #elem = null;
  #transform = 0;
  #index = 0;

  constructor(slides) {
    this.slides = slides;
    this.#elem = this.#render();
  }

  #template() {
    return `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
        ${ this.slides.map(slide => `
          <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>`).join('')
        }
      </div>
    </div>
    `;
  }

  #render() {
    this.#elem = createElement(this.#template());

    this.#elem.addEventListener('click', (event) => this.#onClick(event));
    this.#elem.addEventListener('click', (event) => this.#thumb(event));
    this.#checkIndex(this.slides.length, this.#elem.querySelector('.carousel__arrow_left'), this.#elem.querySelector('.carousel__arrow_right'));

    return this.#elem;
  }

  #onClick(event) {
    const btn = event.target.closest('.carousel__button');

    if (btn) {
      const newEvent = new CustomEvent('product-add', { detail: btn.closest('.carousel__slide').getAttribute('data-id'), bubbles: true });
      btn.dispatchEvent(newEvent);
      return newEvent;
    }
  }

  #thumb(event) {
    const carousel = event.target.closest('.carousel');
    const carouselInner = carousel.querySelector('.carousel__inner');
    const btnRight = event.target.closest('.carousel__arrow_right');
    const btnLeft = event.target.closest('.carousel__arrow_left');

    if (btnRight) {
      this.#transform -= carouselInner.offsetWidth;
      this.#index += 1;
      carouselInner.style.transform = `translateX(${this.#transform}px)`;
      this.#checkIndex(this.slides.length, carousel.querySelector('.carousel__arrow_left'), carousel.querySelector('.carousel__arrow_right'));
    } else if (btnLeft) {
      this.#transform += carouselInner.offsetWidth;
      this.#index -= 1;
      carouselInner.style.transform = `translateX(${this.#transform}px)`;
      this.#checkIndex(this.slides.length, carousel.querySelector('.carousel__arrow_left'), carousel.querySelector('.carousel__arrow_right'));
    }
  }

  #checkIndex(slidesLength, btnLeft, btnRight) {
    btnLeft.style.display = (this.#index === 0) ? 'none' : 'flex';
    btnRight.style.display = (this.#index === slidesLength - 1) ? 'none' : 'flex';
  }

  get elem() {
    return this.#elem;
  }

}
