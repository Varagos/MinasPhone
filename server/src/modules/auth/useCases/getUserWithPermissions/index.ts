import { authService } from '../../services/index.js';
import { GetUserInfo } from './getUserInfo.js';
import { GetUserInfoController } from './getUserController.js';

const getUserInfo = new GetUserInfo(authService);
export const getUserInfoController = new GetUserInfoController(getUserInfo);
