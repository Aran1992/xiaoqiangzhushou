const result = document.evaluate('//*[@id="form1"]/table/tbody/tr/td[8]/text()', document);
const username = result.iterateNext();
if (username) {
    console.log('开始处理用户', username);
    chrome.extension.sendRequest({ type: 'query', username: username.data }, (response) => {
        console.log('返回数据', response);
        if (response.ok) {
            const a = document.evaluate('//*[@id="form1"]/table/tbody/tr[1]/td[9]/a', document).iterateNext();
            a.click();
        } else {
            const a = document.evaluate('//*[@id="form1"]/table/tbody/tr[1]/td[10]/a', document).iterateNext();
            a.click();
        }
    });
}
