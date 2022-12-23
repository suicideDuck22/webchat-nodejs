import { Router, Request, Response } from 'express';
import * as path from 'path';

const accountRouter = Router();

accountRouter.get('/create-account', (request: Request, response: Response) => {
    response
        .status(200)
        .render(path.join(__dirname, '../views/create-account'));
});

export default accountRouter;
