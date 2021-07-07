chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
    chrome.tabs.query({ url: 'https://taodaxiang.com/credit2' }, (tabs) => {
        if (tabs && tabs.length > 0) {
            chrome.tabs.sendRequest(tabs[0].id, request, (response) => {
                sendResponse(response);
            });
        }
    });
});