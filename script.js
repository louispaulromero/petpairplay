document.getElementById('btn-back').addEventListener('click', () => {
  window.history.back();
});

document.getElementById('btn-home').addEventListener('click', () => {
  window.location.href = '/';
});

document.getElementById('btn-forward').addEventListener('click', () => {
  window.history.forward();
});

// Slider value update
const slider = document.getElementById('time-slider');
const sliderValue = document.getElementById('slider-value');

slider.addEventListener('input', () => {
  sliderValue.textContent = slider.value;
});
