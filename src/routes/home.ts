import { Router, Request, Response } from 'express';
import path = require('path');

const homeRouter = Router();

homeRouter.get('/', (request: Request, response: Response) => {
    response.status(200).sendFile(path.join(__dirname, '../views/home.html'));
});

export default homeRouter;
