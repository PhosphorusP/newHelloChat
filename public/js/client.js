window.onload = function() {
    uiready();
}
var socket = io.connect('/'); 
socket.on('connect', function () {
    console.log('%cConnected to the server successfully.','color: #080');
    socket.on('loginSuccess', function(data) {
        console.log('%cLogin success!', 'color: #080');
        console.log('Your public key is: %c' + data.keys.public + '.', 'color: #00F')
        console.log('And your private key is: %c' + data.keys.private + '.', 'color: #00F')
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
