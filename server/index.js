const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
    console.log('user connected')

    socket.on('messageSent', message => {
        console.log('new message', message)
        socket.emit('newMessage', message);
    })
})