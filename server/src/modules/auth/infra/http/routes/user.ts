import express from 'express';
import { getAllUsersController } from '../../../useCases/getAllUsers/index.js';
import { deleteUserController } from '../../../useCases/deleteUser/index.js';
import { getUserInfoController } from '../../../useCases/getUserWithPermissions/index.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => getAllUsersController.execute(req, res));
userRouter.delete('/', (req, res) => deleteUserController.execute(req, res));
userRouter.get('/:id', (req, res) => getUserInfoController.execute(req, res));

export { userRouter };
