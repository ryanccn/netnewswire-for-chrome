const runOnTab = async () => {
  const elem =
    document.querySelector(
      'link[rel="alternate"][type="application/rss+xml"]'
    ) ??
    document.querySelector(
      'link[rel="alternate"][type="application/feed+json"]'
    ) ??
    document.querySelector('a[href$="feed.xml"], a[href$="atom.xml"]');

  if (!elem) return false;

  const href = elem.getAttribute('href');
  if (!href) return false;

  const url = href.startsWith('/') ? new URL(href, location.origin) : href;

  window.open(`feed://${url}`);

  return true;
};

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: runOnTab,
  });
});
