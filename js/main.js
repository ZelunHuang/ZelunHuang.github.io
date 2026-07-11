const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const isChinese = document.documentElement.lang.toLowerCase().startsWith('zh');
const locale = isChinese ? 'zh-CN' : 'en-US';
const timestamp = new Date().toLocaleString(locale, {
  hour12: false,
});

const repoOwner = 'ZelunHuang';
const repoName = 'ZelunHuang.github.io';
const repoBranch = 'main';

function formatFooterText(lastPushLabel) {
  return isChinese
    ? `更新时间：${timestamp} | 最后推送：${lastPushLabel}`
    : `Updated: ${timestamp} | Last push: ${lastPushLabel}`;
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

    return new Date(commitTime).toLocaleString(locale, { hour12: false });
  } catch (_error) {
    return isChinese ? '获取失败' : 'Unavailable';
  }
}

document.querySelectorAll('.site-footer .container').forEach((container) => {
  const stampLine = document.createElement('p');
  stampLine.className = 'footer-timestamp';
  stampLine.textContent = formatFooterText(isChinese ? '加载中...' : 'Loading...');
  container.appendChild(stampLine);

  fetchLastPushTime().then((lastPushTime) => {
    stampLine.textContent = formatFooterText(lastPushTime);
  });
});
