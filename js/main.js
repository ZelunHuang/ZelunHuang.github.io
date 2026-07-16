const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Dropdown toggle (click + hover)
document.querySelectorAll('.dropdown').forEach((dd) => {
  const btn = dd.querySelector('.dropbtn');
  const menu = dd.querySelector('.dropdown-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('show');
  });

  dd.addEventListener('mouseenter', () => menu.classList.add('show'));
  dd.addEventListener('mouseleave', () => menu.classList.remove('show'));

  document.addEventListener('click', (e) => {
    if (!dd.contains(e.target)) menu.classList.remove('show');
  });
});

// Footer: fetch last commit time from GitHub API
const repoOwner = 'ZelunHuang';
const repoName = 'ZelunHuang.github.io';
const repoBranch = 'main';

async function fetchLastPushTime() {
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits/${repoBranch}`;
  try {
    const res = await fetch(apiUrl, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const date = data?.commit?.committer?.date;
    if (!date) throw new Error('Missing date');
    const d = new Date(date);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return null;
  }
}

document.querySelectorAll('.site-footer .container').forEach((container) => {
  const stamp = document.createElement('p');
  stamp.className = 'footer-timestamp';
  stamp.textContent = 'Last updated: loading\u2026';
  container.appendChild(stamp);

  fetchLastPushTime().then((t) => {
    stamp.textContent = t ? `Last updated: ${t}` : 'Last updated: unavailable';
  });
});

// Reading list: search & collapse/expand
(function () {
  const searchInput = document.getElementById('book-search');
  const bookList = document.getElementById('book-list');
  if (!searchInput || !bookList) return;

  const items = bookList.querySelectorAll('.showcase-item');

  // Measure and conditionally collapse each book
  items.forEach((item) => {
    const text = item.querySelector('.review-text');
    const toggle = item.querySelector('.review-toggle');
    const thumb = item.querySelector('.showcase-thumb');
    if (!text || !toggle || !thumb) return;

    // text starts uncollapsed (no collapsed class), measure full height
    if (text.scrollHeight > thumb.offsetHeight) {
      text.classList.add('collapsed');
      toggle.classList.add('visible');
    }
  });

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    items.forEach((item) => {
      const title = (item.dataset.title || '').toLowerCase();
      const author = (item.dataset.author || '').toLowerCase();
      const match = !q || title.includes(q) || author.includes(q);
      item.classList.toggle('hidden', !match);
    });
  });

  bookList.addEventListener('click', (e) => {
    const btn = e.target.closest('.review-toggle');
    if (!btn) return;

    const text = btn.parentElement.querySelector('.review-text');
    if (!text) return;

    const collapsed = text.classList.toggle('collapsed');
    btn.textContent = collapsed ? 'Read more' : 'Show less';
  });
})();
