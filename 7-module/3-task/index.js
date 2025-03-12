export default class StepSlider {

  #elem = null;

  constructor({ steps, value = 0 }) {
    this.steps = steps ?? 5;
    this.value = value;
    this.#elem = this.#render();
  }

  #template() {
    let stepHTML = ``;
    for (let i = 0; i < this.steps; i++) {
      stepHTML += `<span class="${ i === 0 ? 'slider__step-active' : ''}" ></span>`;
    }

    return `
      <div class="slider">

        <div class="slider__thumb" style="left: 0;">
          <span class="slider__value">0</span>
        </div>

        <div class="slider__progress" style="width: 0;"></div>

        <div class="slider__steps">
          ${ stepHTML }
        </div>
      </div>
    `;
  }

  #render() {
    const divElement = document.createElement('div');

    divElement.innerHTML = this.#template();

    this.#elem = divElement.firstElementChild;

    this.#elem.addEventListener('click', (event) => this.#stepEvent(event));

    this.#elem.addEventListener('click', (event) => this.#onClick(event));

    return this.#elem;
  }

  #onClick(event) {
    const newEvent = new CustomEvent('slider-change', { detail: this.value, bubbles: true });

    const span = event.target.querySelector('span');

    if (span) {
      span.dispatchEvent(newEvent);
    }

    return newEvent;
  }

  #stepEvent(event) {
    const slider = event.target.closest('.slider');
    const progress = slider.querySelector('.slider__progress');
    const thumb = slider.querySelector('.slider__thumb');
    const index = slider.querySelector('.slider__value');

    let left = event.clientX - slider.getBoundingClientRect().left;
    let leftRelative = left / slider.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;


    this.value = value;
    index.textContent = value;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  }

  get elem() {
    return this.#elem;
  }

}
