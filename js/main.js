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

// Reading list: search & review toggle
(function () {
  const searchInput = document.getElementById('book-search');
  const bookList = document.getElementById('book-list');
  if (!searchInput || !bookList) return;

  const items = bookList.querySelectorAll('.showcase-item');

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
