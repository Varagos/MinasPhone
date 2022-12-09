import models from '../../../../shared/infra/database/sequelize/models/index.js';
import { UserRepo } from './implementations/sequelizeUserRepo.js';
import { IUserRepo } from './userRepo.js';

export const userRepo: IUserRepo = new UserRepo(models);
