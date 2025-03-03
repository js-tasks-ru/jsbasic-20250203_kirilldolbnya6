function hideSelf() {
  const btn = document.querySelector('.hide-self-button');

  btn.addEventListener('click', function() {
    this.setAttribute('hidden', '');
  });
}
