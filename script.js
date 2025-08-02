document.getElementById('btn-back').addEventListener('click', () => {
  window.history.back();
});

document.getElementById('btn-home').addEventListener('click', () => {
  window.location.href = '/';
});

document.getElementById('btn-forward').addEventListener('click', () => {
  window.history.forward();
});