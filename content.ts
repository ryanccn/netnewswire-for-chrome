chrome.runtime.onMessage.addListener(async (message, sender) => {
  if (message !== 'feed_open') return false;

  const elem =
    document.querySelector(
      'link[rel="alternate"][type="application/rss+xml"]'
    ) ?? document.querySelector('a[href$="feed.xml"], a[href$="atom.xml"]');
  if (!elem) return false;

  const href = elem.getAttribute('href');
  if (!href) return false;

  window.open(`feed://${href}`);

  return true;
});
