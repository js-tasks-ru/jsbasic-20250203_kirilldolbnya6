function toggleText() {
  const btn = document.querySelector('.toggle-text-button');
  const text = document.querySelector('#text');

  btn.addEventListener('click', function() {
    text.toggleAttribute('hidden');
  });
}
