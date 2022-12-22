import { Router, Request, Response } from 'express';
import path = require('path');

const chatRouter = Router();

chatRouter.get('/chat', (request: Request, response: Response) => {
    console.log(!request.query.username);
    if (request.query.username !== '' && request.query.username) {
        const username = request.query.username;
        response.status(200).render(path.join(__dirname, '../views/chat'), {
            username: username,
        });
    } else {
        response.redirect('/enter-room');
    }
});

export default chatRouter;
