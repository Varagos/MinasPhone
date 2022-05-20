import { CreateUserController } from './CreateUserController';
const userRepo = {
  a: 'a',
};
const createUserController = new CreateUserController(userRepo);

// Export the feature
export { createUserController };
