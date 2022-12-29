// import { JWTToken, JWTClaims, RefreshToken } from "../domain/jwt";
// import { User } from "../domain/user";

import { User } from '../domain/user.js';

// export interface IAuthService {
//   signJWT (props: JWTClaims): JWTToken;
//   decodeJWT (token: string): Promise<JWTClaims>;
//   createRefreshToken (): RefreshToken;
//   getTokens (username: string): Promise<string[]>;
//   saveAuthenticatedUser (user: User): Promise<void>;
//   deAuthenticateUser(username: string): Promise<void>;
//   refreshTokenExists (refreshToken: RefreshToken): Promise<boolean>;
//   getUserNameFromRefreshToken (refreshToken: RefreshToken): Promise<string>;
// }
export interface IAuthService {
  getUsers(): any;
  ensureAdmin(): any;
  ensureAuthenticated(): any;
  getUserForEmail(email: string): Promise<User | null>;
  deleteUserForId(userId: string): Promise<void>;
  getUserInfoWithRoles(userId: string): Promise<any>;
}
