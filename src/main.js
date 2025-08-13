import './style.css';

const JSON_URL = '/data/articles.json';
const LIST_SEL = '#article-previews';
const FALLBACK_IMG = '/assets/placeholder.png';

async function renderArticles() {
  const res = await fetch(JSON_URL);
  const articles = await res.json();
  const list = document.querySelector(LIST_SEL);

  list.innerHTML = articles.map(a => `
    <a class="card resource-card" href="/article.html?id=${a.id}">
      <img src="${a.image || FALLBACK_IMG}" alt="${a.title}">
      <div class="card-info">
        <h3>${a.title}</h3>
        <p>${a.readTime ?? ''}</p>
      </div>
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderArticles);
