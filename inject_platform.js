const timer = setInterval(() => {
    const username = document.evaluate('//*[@id="form1"]/table/tbody/tr/td[8]/text()', document).iterateNext();
    if (username) {
        clearInterval(timer);
        console.log('开始处理用户', username);
        chrome.extension.sendRequest({ username: username.data }, (response) => {
            console.log('返回数据', response);
            if (response.ok) {
                const a = document.evaluate('//*[@id="form1"]/table/tbody/tr[1]/td[9]/a', document).iterateNext();
                a.click();
                setTimeout(() => {
                    const confirmA = document.evaluate('//*[@id="layui-layer1"]/div[3]/a[1]', document).iterateNext();
                    confirmA.click();
                }, 0);
            } else {
                const a = document.evaluate('//*[@id="form1"]/table/tbody/tr[1]/td[10]/a', document).iterateNext();
                a.click();
            }
        });
    }
}, 1000);