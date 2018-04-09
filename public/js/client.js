var toasts = new Array();

window.onload = function() {
    uiready();
    initToasts();
}
var socket = io.connect('/'); 
socket.on('connect', function () {
    console.log('%cConnected to the server successfully.','color: #080');
    socket.on('loginSuccess', function(data) {
        console.log('%cLogin success!', 'color: #080');
        toasts.push('登录成功');
        console.log('Your UUID is: %c' + data.uuid + '.', 'color: #00F');
        console.log('Hash of your connection is: %c' + data.socketID + '.', 'color: #00F');
        console.log('Hash of your client is: %c' + data.fromHash + '.', 'color: #00F');
        hideLogin();
    }); 
    socket.on('loginFailed', function(data) {
        switch(data.reason) {
            case 'nickLong': 
                document.querySelector('.login .container .errormsg').innerHTML = '昵称超过长度限制'
                break;
            case 'nickExisted': 
                document.querySelector('.login .container .errormsg').innerHTML = '昵称已被占用'
                break;
        }
    }); 
}); 

function initToasts() {
    setInterval('refreshToast()',3000);
}

function refreshToast() {
    if(toasts.length>0) {
        showToast(toasts[0]);
        toasts.splice(0,1);
    }
}