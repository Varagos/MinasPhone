import { userRepo } from '../../repositories/index.js';
import { CreateUser } from './CreateUser.js';

export const createUser = new CreateUser(userRepo);

// Export the feature
