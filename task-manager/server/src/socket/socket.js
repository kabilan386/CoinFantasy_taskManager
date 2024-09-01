// server/src/socket/socket.js
module.exports = (socket) => {
    console.log('New WebSocket connection...');

    socket.on('message', (message) => {
        console.log('Message received:', message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};