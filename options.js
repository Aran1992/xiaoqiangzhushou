
chrome.runtime.getBackgroundPage((bgWindow) => {
    bgWindow.limit.forEach(([key, value]) => {
        document.getElementById(key).value = localStorage[key] === undefined ? value : localStorage[key];
        document.getElementById('save-' + key).addEventListener('click', () => {
            const newValue = parseInt(document.getElementById(key).value);
            if (newValue) {
                localStorage[key] = newValue;
                alert('保存成功，新值为' + newValue);
            } else {
                alert('保存失败，请检查你的输入');
            }
        });
    });
});