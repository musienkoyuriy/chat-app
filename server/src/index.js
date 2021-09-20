const express = require('express');
const cors = require('cors');

// App setup
const app = express();
const socketIO = require('socket.io');
const { inMemoryDatabase } = require('./database');

app.use(cors())

app.get('/api/messages', (req, res) => {
    const messages = inMemoryDatabase.receiveMessages()
    res.json({ messages })
})

const server = app.listen(3000, function () {
    console.log('listening for requests on port 3000,');
});

let io = socketIO(server)
io.on('connection', socket => {
    const newUser = inMemoryDatabase.newUser(socket.id)

    socket.emit('loggedInUser', newUser);

    io.emit('users', inMemoryDatabase.users)
    io.emit('messages', inMemoryDatabase.messages)

    console.log(`${socket.id}  is connected`);

    socket.on('disconnect', function (user) {
        inMemoryDatabase.unconnectUser(socket.id)
        io.emit('users', inMemoryDatabase.users);
    });

    socket.on('messageSent', message => {
        const newMessage = inMemoryDatabase.addMessage(message)
        io.emit('messageSent', newMessage);
    })
});
