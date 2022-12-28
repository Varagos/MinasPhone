import { IAuthService } from './authProvider.js';
import { SuperTokens } from './super-tokens/SuperTokens.js';

export const authService: IAuthService = new SuperTokens();
