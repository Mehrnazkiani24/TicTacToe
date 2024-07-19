const { request } = require('socket.io');

function initSocket(server){
    const io = new server(server, {
        cors: {
            origin : "*",
            methods: ["GET", "POST"]
        }
    });


    io.on('connection', (socket) => {
        console.log('Player connected', socket.id);

        socket.on('message', (message) => {
            console.log('Received: ', message);

            io.emit('message', message);
        });

        socket.on('disconnect', () => {
            console.log('Player disconnected', socket.id);
        });
    });

    return io;
}


module.exports = { initSocket };