import { Result } from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { User } from '../../domain/user.js';
import { UserEmail } from '../../domain/userEmail.js';
import { IUserRepo } from '../../repositories/userRepo.js';
import { CreateUserDTO } from './CreateUserDTO.js';

type Response = Result<void>;

export class CreateUser implements UseCase<CreateUserDTO, Promise<Response>> {
  constructor(private userRepo: IUserRepo) {}

  async execute(request: CreateUserDTO) {
    const emailOrError = UserEmail.create(request.email);
    const userProps = {
      email: emailOrError.getValue(),
      firstName: request.firstName,
      lastName: request.lastName,
      joinedAt: request.timeJoined,
    };
    const userOrError = User.create(userProps);
    await this.userRepo.save(userOrError.getValue());

    return Result.ok<void>();
  }
}
