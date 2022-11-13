import { userRepo } from '../../repositories';
import { CreateUser } from './CreateUser';

export const createUser = new CreateUser(userRepo);

// Export the feature
