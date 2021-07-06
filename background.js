chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
    chrome.tabs.sendRequest(sender.tab.id, request, (response) => {
        sendResponse(response);
    });
});