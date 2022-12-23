import { Router, Request, Response } from 'express';
import * as path from 'path';
import { prismaClient } from '../database/prismaClient';
import { createHash } from 'crypto';

const accountRouter = Router();

accountRouter.get('/create', (request: Request, response: Response) => {
    response
        .status(200)
        .render(path.join(__dirname, '../views/create-account'));
});

accountRouter.get('/validate-username', (request: Request, response: Response) => {
    const username = request.query.username as string
    const user = prismaClient.user.findUnique({
        where: {
            username: username
        }
    })
    if(user !== null || user !== undefined){
        return response.status(200).send('This username has been in user by another user, please change another.')
    }
    response.status(200).send('Username free to use.')
})

accountRouter.post('/create', async (request: Request, response: Response) => {
    const { name, username, password, _confirmPassword } = request.body;
    const hashedPassword = createHash('sha256').update(password).digest('hex');

    const newUser = await prismaClient.user.create({
        data: {
            name: name,
            username: username,
            password: hashedPassword,
        },
    });

    response.status(200).json(newUser);
});

export default accountRouter;
