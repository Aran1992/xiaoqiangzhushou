const info = document.getElementById('info');
chrome.runtime.getBackgroundPage((bgWindow) => {
    info.innerHTML = `总共已处理：${bgWindow.info.handled}<br/>
已通过：${bgWindow.info.passed}<br/>
已拒绝：${bgWindow.info.refused}`;
    if (bgWindow.info.lastHandledWorkerName) {
        info.innerHTML += `<br/>刚处理了用户：${bgWindow.info.lastHandledWorkerName}`;
    }
});