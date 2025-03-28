const express = require('express');
const app = express();
const http = require('http');
const { disconnect } = require('process');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
    //res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    //User connected
    console.log('a user connected');
    io.emit('user connected', 'a user connected');

    //Handle a chat message event when it is emitted
    socket.on('chat message', (msg) => {
        console.log('message' + msg);
        io.emit('chat message', msg);
    });

    //User disconnected
    socket.on('disconnect', () => {
        console.log("user disconnected");
        io.emit('user disconnected', 'a user disconnected');

    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
