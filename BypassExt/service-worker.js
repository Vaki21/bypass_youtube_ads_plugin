// To handle youtube video page
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  chrome.scripting.executeScript({
    target: {tabId: details.tabId},
    files: ['popup.js']
  });
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      files: ['popup.js']
    });
  }
});
