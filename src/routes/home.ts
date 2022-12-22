import { Router, Request, Response } from 'express';
import path = require('path');

const homeRouter = Router();

homeRouter.get('/', (request: Request, response: Response) => {
    if (request.params.username) {
        response.redirect('/chat');
        return;
    }
    response.redirect('/enter-room');
});

homeRouter.get('/enter-room', (request: Request, response: Response) => {
    response.status(200).render(path.join(__dirname, '../views/home'));
});

export default homeRouter;
