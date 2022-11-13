import { GetAllUsersController } from './GetAllUsersController';
import { SuperTokens } from '../../services/super-tokens/SuperTokens';
const userRepo = {
  a: 'a',
} as any;
const authProvider = new SuperTokens();
const getAllUsersController = new GetAllUsersController(userRepo, authProvider);

// Export the feature
export { getAllUsersController };
