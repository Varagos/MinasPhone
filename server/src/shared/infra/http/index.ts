import { authService } from '../../../modules/auth/services/index.js';
import { Middleware } from './utils/MiddleWare.js';

const middleware = new Middleware(authService);

export { middleware };
