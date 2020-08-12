const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public')
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');


    socket.emit('newMessage', {
        from: 'mark',
        text: 'hey, this is Mark',
        createdAt: 123
    });


    socket.on('disconnect', () => {
        console.log('Client disconnected from server');
    });

    socket.on('createMessage', (newMessage) => {
        console.log('received new message:', newMessage)
    });
});


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})