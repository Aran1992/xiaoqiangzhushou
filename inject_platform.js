const timer = setInterval(() => {
    const username = document.evaluate('//*[@id="form1"]/table/tbody/tr/td[8]/text()', document).iterateNext();
    if (username) {
        clearInterval(timer);
        chrome.extension.sendRequest({ username: username.data }, (response) => {
            if (response.isWorkerCredible) {
                const a = document.evaluate('//*[@id="form1"]/table/tbody/tr[1]/td[9]/a', document).iterateNext();
                a.click();
                setTimeout(() => {
                    const confirmA = document.evaluate('//*[@id="layui-layer1"]/div[3]/a[1]', document).iterateNext();
                    confirmA.click();
                }, 1000);
            } else {
                const a = document.evaluate('//*[@id="form1"]/table/tbody/tr[1]/td[10]/a', document).iterateNext();
                a.click();
                setTimeout(() => {
                    const confirmA = document.evaluate('//*[@id="layui-layer1"]/div[3]/a[1]', document).iterateNext();
                    confirmA.click();
                }, 1000);
            }
        });
    } else {
        const badge = document.getElementById('auditbuyernum');
        if (badge && parseInt(badge.innerHTML) > 0) {
            clearInterval(timer);
            window.location.href = window.location.href;
        }
    }
}, 1000);