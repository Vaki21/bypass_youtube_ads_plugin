// To handle youtube video page
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    //chrome.tabs.executeScript(null,{file:"popup.js"});
    injectScript;
});

async function injectScript() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['popup.js']
    });
}