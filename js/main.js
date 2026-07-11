const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// --- Dropdown toggle (click + hover) ---

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

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!dd.contains(e.target)) menu.classList.remove('show');
  });
});

const timestamp = new Date().toLocaleString('en-US', {
  hour12: false,
});

const repoOwner = 'ZelunHuang';
const repoName = 'ZelunHuang.github.io';
const repoBranch = 'main';

function formatFooterText(lastPushLabel) {
  return `Updated: ${timestamp} | Last push: ${lastPushLabel}`;
}

async function fetchLastPushTime() {
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits/${repoBranch}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API failed: ${response.status}`);
    }

    const data = await response.json();
    const commitTime = data?.commit?.committer?.date;

    if (!commitTime) {
      throw new Error('Missing commit time');
    }

    return new Date(commitTime).toLocaleString('en-US', { hour12: false });
  } catch (_error) {
    return 'Unavailable';
  }
}

document.querySelectorAll('.site-footer .container').forEach((container) => {
  const stampLine = document.createElement('p');
  stampLine.className = 'footer-timestamp';
  stampLine.textContent = formatFooterText('Loading...');
  container.appendChild(stampLine);

  fetchLastPushTime().then((lastPushTime) => {
    stampLine.textContent = formatFooterText(lastPushTime);
  });
});

// --- Reading list: search & review toggle ---

(function () {
  const searchInput = document.getElementById('book-search');
  const bookList = document.getElementById('book-list');
  if (!searchInput || !bookList) return;

  const items = bookList.querySelectorAll('.showcase-item');

  // Search filter
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    items.forEach((item) => {
      const title = (item.dataset.title || '').toLowerCase();
      const author = (item.dataset.author || '').toLowerCase();
      const match = !q || title.includes(q) || author.includes(q);
      item.classList.toggle('hidden', !match);
    });
  });

  // Review expand / collapse
  bookList.addEventListener('click', (e) => {
    const btn = e.target.closest('.review-toggle');
    if (!btn) return;

    const preview = btn.parentElement.querySelector('.review-preview');
    const full = btn.parentElement.querySelector('.review-full');
    if (!preview || !full) return;

    const expanded = btn.dataset.expanded === 'true';
    preview.style.display = expanded ? 'inline' : 'none';
    full.style.display = expanded ? 'none' : 'inline';
    btn.textContent = expanded ? 'Read more' : 'Show less';
    btn.dataset.expanded = expanded ? 'false' : 'true';
  });
})();
