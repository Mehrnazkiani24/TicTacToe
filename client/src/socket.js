import { io } from 'socket.io-client';

let socket;


export function connectSocket(){
    socket = io('http://localhost:5001');

    socket.on('connect', () =>{
        console.log('Connected to socket.io server');
    });
    socket.on('message', (message) => {
        console.log('Received: ', message);
    });

    socket.on('connect_error', (Error) => {
        console.log("Socket.io error: ", error);
    });
}

export function sendMessage(message){
    if(socket){
        socket.emit('message', message);
    }
}