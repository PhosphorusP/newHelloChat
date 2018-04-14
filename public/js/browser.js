function isIE() {
    if(!!window.ActiveXObject || "ActiveXObject" in window) return true;
    else return false;
}

function initBroser() {
    if(isIE()) document.write('<h1>请使用现代浏览器（Chrome、Firefox等）打开本页。</h1>')
}