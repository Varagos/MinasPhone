import models from '../../../../shared/infra/database/sequelize/models';
import { UserRepo } from './implementations/sequelizeUserRepo';
import { IUserRepo } from './userRepo';

export const userRepo: IUserRepo = new UserRepo(models);
