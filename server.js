var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var express = require('express');
var users = new Array();

function hashCode(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

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
    socket.on('login', function (data) {
        if (data.nickname.length > 32) {
            socket.emit('loginFailed', {
                reason: 'nickLong'
            });
            return;
        }
        for (i = 0; i < users.length; i++) {
            if (users[i].nickname == data.nickname) {
                socket.emit('loginFailed', {
                    reason: 'nickExisted'
                });
                return;
            }
        }
        var key = hashCode(data.nickname);
        users.push({
            nickname: data.nickname,
            status: data.status,
            key: key
        });
        socket.emit('loginSuccess', {
            key: key
        });
        socket.nickname = data.nickname;
    })
});