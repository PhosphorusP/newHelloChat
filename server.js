var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var express = require('express');
var secure = require('./secure.js');
var odds = require('./odds.js');

var users = new Array();
var froms = new Array();

server.listen(3000, function () {
    console.log('Server started. Listening on the port:' + 3000);
});

app.get('/source/socket.io.slim.js', function (req, res) {
    res.sendfile('sources/socket.io.slim.js');
});

app.use(express.static('public'));
io.on('connection', function (socket) {
    socket.emit('news', {
        hello: 'world'
    });
    socket.on('disconnect', function() {
        for (i = 0; i < users.length; i++) {
            if (users[i].nickname == socket.nickname)
                users.splice(i,1);
        }
    })
    /*socket.on('rotation', function(data) {
        socket.broadcast.emit('rotation',data);
    })*/

    //处理用户登录
    socket.on('login', function (data) {
        //登录失败：用户名为空
        if (data.nickname.length < 1) {
            socket.emit('loginFailed', {
                reason: 'nickEmpty'
            });
            return;
        }
        //登录失败：用户名过长
        if (data.nickname.length > 32) {
            socket.emit('loginFailed', {
                reason: 'nickLong'
            });
            return;
        }
        //登录失败：用户名被占用
        for (i = 0; i < users.length; i++) {
            if (users[i].nickname == data.nickname) {
                socket.emit('loginFailed', {
                    reason: 'nickExisted'
                });
                return;
            }
        }
        //用户信息
        var usr = {
            nickname: data.nickname,
            status: data.status,
            uuid: secure.uuid(),
            socketID: socket.id
        }
        //添加到在线用户列表
        users.push(usr);
        //设置连接属性
        socket.nickname = data.nickname;
        socket.fromHash = secure.hashCode(socket.handshake.address);
        //记录登录行为
        if(odds.isUndefined(froms[socket.fromHash])) {
            froms[socket.fromHash] = new Array;
        }
        froms[socket.fromHash].push( {
            time: new Date().toString(),
            nickname: data.nickname,
            status: data.status
        });
        //返回登录数据
        socket.emit('loginSuccess', {
            uuid: usr.uuid,
            socketID: socket.id,
            fromHash: socket.fromHash
        });
    })
});