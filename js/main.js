const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const isChinese = document.documentElement.lang.toLowerCase().startsWith('zh');
const timestamp = new Date().toLocaleString(isChinese ? 'zh-CN' : 'en-US', {
  hour12: false,
});
const lastPushTime = '2026-07-11 17:41:55';

document.querySelectorAll('.site-footer .container').forEach((container) => {
  const stampLine = document.createElement('p');
  stampLine.className = 'footer-timestamp';
  stampLine.textContent = isChinese
    ? `更新时间：${timestamp} | 最后推送：${lastPushTime}`
    : `Updated: ${timestamp} | Last push: ${lastPushTime}`;
  container.appendChild(stampLine);
});
