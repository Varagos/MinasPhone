import * as express from 'express';
import { Router } from 'express';
import { createUserController } from '../../../useCases/createUser';

const userRouter: Router = Router();

userRouter.post(
  '/new',
  //   middleware.useCORS,
  //   middleware.rateLimit,
  // + any other middleware
  (req, res) => createUserController.execute(req, res),
);

export { userRouter };
