function trimStr(xpath) {
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

    /**
     * 那边平台就 四种情况只要其中一种就拒绝    未知   超2017年 周超3   查询月超30
     */

    // 什么时候能够确定消息返回了呢？
    // 定时刷新？直到获取到内容？

    const timer = setInterval(() => {
        const registerTimeText = trimStr('//*[@id="credit_content"]/table/tbody/tr[1]/td[1]/p/span/b/text()');
        const avgWeekText = trimStr('//*[@id="credit_content"]/table/tbody/tr[3]/td[1]/p/span[2]/b/text()');
        const searchTimePerMonthText = trimStr('//*[@id="credit_content"]/table/tbody/tr[6]/td/p/span[4]/b/text()');
        console.log(registerTimeText, avgWeekText, avgWeekText);
        if (registerTimeText && avgWeekText && avgWeekText) {
            const registerTime = registerTimeText ? new Date(registerTimeText) : undefined;
            const avgWeek = parseInt(avgWeekText);
            const searchTimePerMonth = parseInt(searchTimePerMonthText);
            console.log(registerTime, avgWeek, searchTimePerMonth);
            clearInterval(timer);
            if (!registerTime || registerTime.getYear() > 117 || avgWeek > 3 || searchTimePerMonth > 30) {
                sendResponse({});
            } else {
                sendResponse({ ok: true });
            }
        }
    }, 1000);
});