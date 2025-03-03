function initCarousel() {
  const sliders = document.querySelector('.carousel__inner');
  const prev = document.querySelector('.carousel__arrow_left');
  const next = document.querySelector('.carousel__arrow_right');
  let slideWidth = sliders.offsetWidth;
  let transform = 0;

  const state = {
    _index: 0,

    get index() {
      return this._index;
    },

    set index(index) {
      this._index = index;
      checkIndex();
    },
  };

  const checkIndex = () => {
    if (state.index === (sliders.children.length - 1)) {
      next.style.display = 'none';
    } else if (state.index === 0) {
      prev.style.display = 'none';
    } else {
      prev.style.display = 'flex';
      next.style.display = 'flex';
    }
  };

  next.addEventListener('click', function() {
    state.index += 1;
    transform += -slideWidth;
    sliders.style.transform = `translateX(${transform}px)`;
  });

  prev.addEventListener('click', function() {
    state.index -= 1;
    transform += slideWidth;
    sliders.style.transform = `translateX(${transform}px)`;
  });

  checkIndex();
}
