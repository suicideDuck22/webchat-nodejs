/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from 'express';
import path = require('path');
import { Socket } from 'socket.io';

const port = process.env.PORT || 3000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (request: express.Request, response: express.Response) => {
    response.sendFile(path.join(__dirname, './views/home.html'));
});

app.use(express.static(path.join(__dirname, './public')));

io.on('connection', (socket: Socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (message: string) => {
        console.log(message);
        socket.broadcast.emit('message', message);
    });
});

http.listen(port, () => {
    console.log('Rodando');
});

// const port: number | string = process.env.PORT || 3000;

// class App {
//     private server: http.Server;
//     private port: number | string;

//     private io: Server;
//     private clients: any = {};

//     constructor(port: number | string) {
//         this.port = port;
//         const app = express();
//         app.use(express.static(path.join(__dirname, './public')));
//         app.use(homeRouter);

//         this.server = new http.Server(app);
//         this.io = new Server(this.server);

//         this.io.on('connection', (socket: Socket) => {
//             console.log(socket.constructor.name);
//             this.clients[socket.id] = {};
//             console.log(this.clients);
//             console.log('a user connected: ' + socket.id);
//             socket.emit('id', socket.id);

//             socket.on('disconnect', () => {
//                 console.log('socket disconnected: ' + socket.id);
//                 if (this.clients && this.clients[socket.id]) {
//                     console.log('deleting ' + socket.id);
//                     delete this.clients[socket.id];
//                     this.io.emit('removeCliente', socket.id);
//                 }
//             });
//         });
//     }

//     public Start() {
//         this.server.listen(this.port, () => {
//             console.log(
//                 `Server running and listening at @ localhost:${this.port}`
//             );
//         });
//     }
// }

// new App(port).Start();
