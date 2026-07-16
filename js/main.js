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

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function fmtDate(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fmtShortDate(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

async function fetchRecentCommits(count) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?sha=${repoBranch}&per_page=${count}`;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } catch {
    return null;
  }
}

// Render recent updates on the homepage
const updatesList = document.getElementById('updates-list');
const updatesTimestamp = document.getElementById('updates-timestamp');
if (updatesList && updatesTimestamp) {
  fetchRecentCommits(5).then((commits) => {
    if (!commits || commits.length === 0) {
      updatesList.innerHTML = '<p class="updates-loading">Unable to load updates.</p>';
      updatesTimestamp.textContent = '';
      return;
    }

    updatesTimestamp.textContent = `Last updated: ${fmtDate(commits[0].commit.committer.date)}`;

    updatesList.innerHTML = commits.map((c) => {
      const msg = c.commit.message.split('\n')[0];
      const dateStr = fmtShortDate(c.commit.committer.date);
      return `<div class="updates-item"><span class="updates-dot"></span><span class="updates-msg">${escapeHtml(msg)}</span><span class="updates-date">${dateStr}</span></div>`;
    }).join('');
  });
}

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
