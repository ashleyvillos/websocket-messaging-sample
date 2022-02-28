const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);  

app.use(express.static('client'))

// this is an example of an http request
// POST, GET, PUT
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/homepage.html');
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/client/login.html');
})

// this is running on port 3001
server.listen(3000, function() {
    console.log('listening on *:3000');
});

let messageHistory = []

// WEBSOCKET IMPLEMENTATION
io.on('connection', function(socket) {
    // .on -- receiving
    // .emit -- sending
    socket.on('login', function(msg){
        messageHistory.push(msg.username + " has logged in")
        socket.broadcast.emit('login-user', {'username' : msg.username, 'message_history' : messageHistory})
    })

    socket.on('message', function(msg){
        messageHistory.push(msg.username + ": " + msg.message)
        // send the message back to the sender
        // socket.emit('message-user', {'username' : msg.username, 'message' : msg.message})

        // send the message to the other users
        socket.broadcast.emit('message-user', {'username' : msg.username, 'message' : msg.message, 'message_history' : messageHistory})
    })
})