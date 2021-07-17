window.info = {
    handled: 0,
    passed: 0,
    refused: 0,
    lastHandledWorkerName: '',
};

window.limit = [
    ['min-year', 2017],
    ['max-week-avg', 3],
    ['max-month-search', 30],
];

function query(tabId, request, sendResponse) {
    request.limit = {};
    window.limit.forEach(([key, value]) => {
        request.limit[key] = localStorage[key] === undefined ? value : localStorage[key];
    });
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
            chrome.browserAction.setBadgeText({ text: window.info.handled.toString() });
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