window.info = {
    handled: 0,
    passed: 0,
    refused: 0,
    lastHandledWorkerName: '',
};

function query(tabId, request, sendResponse) {
    chrome.tabs.sendRequest(tabId, request, (response) => {
        if (response.needQueryAgain) {
            query(tabId, request, sendResponse);
        } else {
            sendResponse(response);
            window.info.handled++;
            if (response.isWorkerCredible) {
                window.info.passed++;
            } else {
                window.info.refused++;
            }
            window.info.lastHandledWorkerName = request.username;
            chrome.browserAction.setBadgeText(window.info.handled);
        }
    });
}

chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
    chrome.tabs.query({ url: 'https://taodaxiang.com/credit2' }, (tabs) => {
        if (tabs && tabs.length > 0) {
            query(tabs[0].id, request, sendResponse);
        }
    });
});