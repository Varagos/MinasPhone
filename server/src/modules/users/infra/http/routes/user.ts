import { getAllUsersController } from './../../../useCases/getAllUsers/';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res) => getAllUsersController.execute(req, res));

export { userRouter };
