function uiready() {
    document.querySelector('#loginbtn').addEventListener('click', function() {
        document.querySelector('#loginNickname').value = document.querySelector('#loginNickname').value.trim();
        var nickname = document.querySelector('#loginNickname').value;
        socket.emit('login',  {nickname:nickname, status:document.querySelector('.login .container #status').getAttribute('status')});
    });
    document.querySelector('#loginNickname').addEventListener('keydown', function(e) {
        if(e.keyCode == 13) document.querySelector('#loginbtn').click()
    });
    document.querySelector('.login .container #status').addEventListener('click', function() {
        if(document.querySelector('.login .container #status').getAttribute('status')=='normal') document.querySelector('.login .container #status').setAttribute('status','invisible');
        else document.querySelector('.login .container #status').setAttribute('status','normal');
    });
}
function hideLogin() {
    document.querySelector('.login').setAttribute('class','login loginhidden');
    document.querySelector('.topbar').setAttribute('class','topbar topbarfull');
    document.querySelector('.sidebar').setAttribute('class','sidebar sidebarfull');
    document.querySelector('.mainbar').setAttribute('class','mainbar mainbarfull');
}