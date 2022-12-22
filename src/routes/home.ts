import { Router, Request, Response } from 'express';
import { networkInterfaces } from 'os';
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
    const nets = networkInterfaces();
    const localAddress = nets['Ethernet'][1]['address'];
    response.status(200).render(path.join(__dirname, '../views/home'), {
        localAddress: localAddress,
    });
});

export default homeRouter;
