function getPlainText(xpath) {
    const text = document.evaluate(xpath, document).iterateNext();
    if (text) {
        return text.data.replace('&nbsp;', '').trim();
    }
}
chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
    const input = document.getElementById('ww');
    input.value = request.username;

    const button = document.getElementsByClassName('uc-button')[0];
    button.click();

    const timer = setInterval(() => {
        const dialogue = document.getElementById('dialog_checkcode');
        if (dialogue && dialogue.style.display === 'none') {
            sendResponse({ needQueryAgain: true });
            window.location.href = window.location.href;
            return;
        }
        const registerTimeText = getPlainText('//*[@id="credit_content"]/table/tbody/tr[1]/td[1]/p/span/b/text()');
        const avgWeekText = getPlainText('//*[@id="credit_content"]/table/tbody/tr[3]/td[1]/p/span[2]/b/text()');
        const searchTimePerMonthText = getPlainText('//*[@id="credit_content"]/table/tbody/tr[6]/td/p/span[4]/b/text()');
        if (registerTimeText && avgWeekText && avgWeekText) {
            clearInterval(timer);
            const registerTime = registerTimeText === '未知' ? undefined : new Date(registerTimeText);
            const avgWeek = parseInt(avgWeekText);
            const searchTimePerMonth = parseInt(searchTimePerMonthText);
            if (isNaN(registerTime.getYear()) || registerTime.getYear() > 117 || avgWeek > 3 || searchTimePerMonth > 30) {
                sendResponse({ isWorkerCredible: false });
            } else {
                sendResponse({ isWorkerCredible: true });
            }
        }
    }, 1000);
});