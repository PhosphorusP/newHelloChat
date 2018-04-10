var toasts = new Array();
var mList = new Array();
var uList = new Array();
uList['bbb']='bbb';
uList['bbbb']='bbbb';
uList['bbbbb']='bbbbb';

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
        toasts.push('当前状态：' + ((document.querySelector('.login .container #status').getAttribute('status')=='normal')?'在线':'隐身'));
        console.log('Your UUID is: %c' + data.uuid + '.', 'color: #00F');
        console.log('Hash of your connection is: %c' + data.socketID + '.', 'color: #00F');
        console.log('Hash of your client is: %c' + data.fromHash + '.', 'color: #00F');
        hideLogin();
    }); 
    socket.on('loginFailed', function(data) {
        switch(data.reason) {
            case 'nickEmpty': 
                document.querySelector('.login .container .errormsg').innerHTML = '请输入昵称';
                break;
            case 'nickLong': 
                document.querySelector('.login .container .errormsg').innerHTML = '昵称超过长度限制';
                break;
            case 'nickExisted': 
                document.querySelector('.login .container .errormsg').innerHTML = '昵称已被占用';
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

function pushMlist(message, uuid) {
    for(i=0;i<mList.length;i++) {
        if(mList[i].uuid == uuid) {
            mList.splice(i,1);
            break;
        }
    }
    mList.push({
        message: message,
        uuid: uuid
    });
}

function refreshMlist() {
    for(i=0;i<mList.length;i++) {
        if(document.querySelector('.sidebar #dlg' + mList[i].uuid)==null) {
            document.querySelector('.sidebar').innerHTML += '<div class="dialog newdialog" id="dlg' + mList[i].uuid +'"><div class="name">' + uList[mList[i].uuid] + '</div><div class="preview">' + mList[i].message + '</div></div>';
        } else {
            document.querySelector('.sidebar #dlg' + mList[i].uuid + ' .preview').innerHTML = mList[i].message;
        }
    }
    for(i=mList.length-1;i>=0;i--) {
        document.querySelector('.sidebar #dlg' + mList[i].uuid).setAttribute('class','dialog');
        document.querySelector('.sidebar #dlg' + mList[i].uuid).style.top = ((mList.length - i)*68) + 'px';
    }
}