import { Result } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { User } from '../../domain/user';
import { UserEmail } from '../../domain/userEmail';
import { IUserRepo } from '../../repositories/userRepo';
import { CreateUserDTO } from './CreateUserDTO';

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
