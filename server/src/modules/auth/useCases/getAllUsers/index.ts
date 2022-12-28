import { authService } from '../../services/index.js';
import { GetAllUsersController } from './GetAllUsersController.js';

const getAllUsersController = new GetAllUsersController(authService);

// Export the feature
export { getAllUsersController };
