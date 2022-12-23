/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from 'express';
import path = require('path');
import { Socket } from 'socket.io';
import * as bodyParser from 'body-parser';

import homeRouter from './routes/home';
import chatRouter from './routes/chat';
import accountRouter from './routes/account';

const port = process.env.PORT || 3000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use(homeRouter);
app.use(chatRouter);
app.use('/account', accountRouter);

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
    console.log(`Server running at @ localhost:${port}`);
});
