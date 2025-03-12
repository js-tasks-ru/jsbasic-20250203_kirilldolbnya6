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

    this.#elem.addEventListener('pointerdown', (event) => this.#onmousedown(event));

    this.#elem.addEventListener('click', (event) => this.#stepEvent(event));

    return this.#elem;
  }

  #onmousedown(event) {
    const thumb = event.target.closest('.slider__thumb');
    const slider = this.#elem;
    const progress = slider.querySelector('.slider__progress');
    const index = slider.querySelector('.slider__value');

    if (!thumb) return;

    const onMouseMove = (event) => {
      let left = event.clientX - slider.getBoundingClientRect().left;
      let leftRelative = left / slider.offsetWidth;

      slider.classList.add('slider_dragging');

      if (leftRelative < 0) leftRelative = 0;
      if (leftRelative > 1) leftRelative = 1;

      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = leftRelative * 100;

      this.lastKnownValue = Math.round(approximateValue);

      this.value = value;
      index.textContent = value;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
    };

    const onMouseUp = () => {
      document.removeEventListener('pointermove', onMouseMove);
      document.removeEventListener('pointerup', onMouseUp);

      let segments = this.steps - 1;

      this.value = this.lastKnownValue;
      let valuePercents = (this.value / segments) * 100;

      index.textContent = this.value;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      thumb.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        })
      );

    };

    document.addEventListener('pointermove', onMouseMove);
    document.addEventListener('pointerup', onMouseUp);
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

    thumb.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      })
    );
  }

  get elem() {
    return this.#elem;
  }

}
