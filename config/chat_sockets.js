module.exports.chatSockets = function(socketServer) {
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
            credentials: true,
        }
    });


    //io fires the event connection 
    io.sockets.on('connection', function(socket) {
        console.log('new connection received', socket.id);
        //confirms to conhaldler that connection good

        socket.on('disconnect', function() {
            console.log('socket disconnected!');
        });


        socket.on('join_room', function(data) {
            console.log('joining request receive', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        //direct send messages and roadcast to everyone in the room

        socket.on('send_message', function(data) {
            console.log('SEND MESSAGE', data);
            io.in(data.chatroom).emit('receive_message', data);
        })

    });
}

// request receive