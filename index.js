const path = require('path');
const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start server
const server = app.listen(app.get('port'),  () => {
    console.log('server on port', app.get('port'));
});

//create socket
const socket = require('socket.io');
const io = socket(server);

//connection to websocket
io.on('connection', (socket) => {
    console.log('Connected', socket.id);

    socket.on('user_message', (data) => {
        io.sockets.emit('chat_message', data);
    });

    socket.on('user_typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});