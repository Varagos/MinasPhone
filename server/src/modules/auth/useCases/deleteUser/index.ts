import { authService } from '../../services/index.js';
import { DeleteUser } from './deleteUser.js';
import { DeleteUserController } from './DeleteUserController.js';

const deleteUserUseCase = new DeleteUser(authService);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
