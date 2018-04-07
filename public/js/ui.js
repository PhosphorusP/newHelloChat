function uiready() {
    document.querySelector('#loginbtn').addEventListener('click', function() {
        document.querySelector('#loginNickname').value = document.querySelector('#loginNickname').value.trim();
        var nickname = document.querySelector('#loginNickname').value;
        socket.emit('login',  {nickname:nickname, status:'normal'});
    });
    document.querySelector('#loginNickname').addEventListener('keydown', function(e) {
        if(e.keyCode == 13) document.querySelector('#loginbtn').click()
    });
}
function hideLogin() {
    document.querySelector('.login').setAttribute('class','login loginhidden');
    document.querySelector('.topbar').setAttribute('class','topbar topbarfull');
    document.querySelector('.sidebar').setAttribute('class','sidebar sidebarfull');
    document.querySelector('.mainbar').setAttribute('class','mainbar mainbarfull');
}