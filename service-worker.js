// To handle youtube video page
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"popup.js"});
});
