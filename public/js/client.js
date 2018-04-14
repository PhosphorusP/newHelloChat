var toasts = new Array();
var mList = new Array();
var uList = new Array();
uList['bbb']='bbb';
uList['bbbb']='bbbb';
uList['bbbbb']='bbbbb';

window.onload = function() {
    uiready();
    initToasts();
    initMessages();
}

//连接到服务器
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
    //登录失败
    socket.on('loginFailed', function(data) {
        switch(data.reason) {
            //昵称为空
            case 'nickEmpty': 
                document.querySelector('.login .container .errormsg').innerHTML = '请输入昵称';
                break;
            //昵称过长
            case 'nickLong': 
                document.querySelector('.login .container .errormsg').innerHTML = '昵称超过长度限制';
                break;
            //昵称被占用
            case 'nickExisted': 
                document.querySelector('.login .container .errormsg').innerHTML = '昵称已被占用';
                break;
        }
    }); 
}); 

//初始化Toast通知Interval
function initToasts() {
    setInterval('refreshToast()',3000);
}

//更新Toast通知
function refreshToast() {
    if(toasts.length>0) {
        showToast(toasts[0]);
        toasts.splice(0,1);
    }
}

//初始化消息列表
function initMessages() {
    setInterval('refreshMessageList()',200);
}

//向消息列表推送新消息
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
    refreshMlist();
}

//更新消息列表
function refreshMlist() {
    for(i=0;i<mList.length;i++) {
        if(document.querySelector('.sidebar #dlg' + mList[i].uuid)==null) {
            document.querySelector('.sidebar').innerHTML += '<div class="dialog newdialog" id="dlg' + mList[i].uuid +'" onmousedown="selectDialog(this)"><div class="name">' + uList[mList[i].uuid] + '</div><div class="preview">' + mList[i].message + '</div></div>';
        } else {
            document.querySelector('.sidebar #dlg' + mList[i].uuid + ' .preview').innerHTML = mList[i].message;
        }
    }
}

//更新消息列表样式
function refreshMessageList() {
    if(document.querySelectorAll('.sidebar .newdialog').length==1) document.querySelectorAll('.sidebar .newdialog')[0].setAttribute('class','dialog selected');
    for(i=0;i<document.querySelectorAll('.sidebar .newdialog').length;i++) {
        document.querySelectorAll('.sidebar .newdialog')[i].setAttribute('class','dialog');
    }
    for(i=mList.length-1;i>=0;i--) {
        document.querySelector('.sidebar #dlg' + mList[i].uuid).style.top = ((mList.length -1 - i)*68) + 'px';
    }
}

//用户点击消息列表会话
function selectDialog(obj) {
    if(obj == null) return false;
    for(i=0;i<document.querySelectorAll('dialog').length;i++) {
        document.querySelectorAll('dialog')[i].setAttribute('class','dialog');
    }
    obj.setAttribute('class','dialog selected');
}