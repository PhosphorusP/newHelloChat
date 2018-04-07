window.onload = function() {
    uiready();
}
var socket = io.connect('/'); 
socket.on('connect', function () {
    console.log('Connected to the server successfully.')
    socket.on('loginSuccess', function(data) {
        console.log('Login Success! The key is: ' + data.key);
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
