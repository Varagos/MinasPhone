import { GetAllUsersController } from './GetAllUsersController.js';
import { SuperTokens } from '../../services/super-tokens/SuperTokens.js';
const userRepo = {
  a: 'a',
} as any;
const authProvider = new SuperTokens();
const getAllUsersController = new GetAllUsersController(userRepo, authProvider);

// Export the feature
export { getAllUsersController };
