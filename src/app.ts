/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from 'express';
import path = require('path');
import { Socket } from 'socket.io';

import homeRouter from './routes/home';
import chatRouter from './routes/chat';

const port = process.env.PORT || 3000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.use(homeRouter);
app.use(chatRouter);
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
