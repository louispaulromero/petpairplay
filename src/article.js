import './style.css';

const DATA_URL = '/data/articles.json';
const target = document.getElementById('article');

// Back button
document.querySelector('.back-btn')?.addEventListener('click', () => history.back());

const id = new URLSearchParams(location.search).get('id');

// This chunk swaps the youtube thumbnail to the actual video when it's clicked 

function initVideoSlots(root = document) {
  root.querySelectorAll('.video-slot[data-video]').forEach((slot) => {
    const ytId = slot.getAttribute('data-video');
    const btn = slot.querySelector('.yt-thumb');
    if (!ytId || !btn) return;

    const activate = () => {
      slot.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${ytId}?rel=0&autoplay=1"
          title="Grooming video"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>`;
    };

    // Click to play
    btn.addEventListener('click', activate, { once: true });

    // Keyboard access 
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    }, { once: true });
  });
}

(async () => {
  try {
    const res = await fetch(DATA_URL);
    const articles = await res.json();
    const a = articles.find((x) => x.id === id);

    target.innerHTML = a
      ? (a.content || '<p style="color:#9a9a9a">Coming soon.</p>')
      : '<p style="color:#9a9a9a">Article not found.</p>';

    if (a && a.content) {
      // wire up video thumbnail(s) after content is injected
      initVideoSlots(target);
    }
  } catch (e) {
    target.innerHTML = '<p style="color:#9a9a9a">Couldn’t load this article.</p>';
  }
})();
