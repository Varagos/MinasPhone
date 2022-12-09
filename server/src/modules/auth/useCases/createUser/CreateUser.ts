import { AppError } from '../../../../shared/core/AppError.js';
import { Either, left, Result, right } from '../../../../shared/core/Result.js';
import { UseCase } from '../../../../shared/core/UseCase.js';
import { DomainEvents } from '../../../../shared/domain/events/DomainEvents.js';
import { User } from '../../domain/user.js';
import { UserEmail } from '../../domain/userEmail.js';
import { CreateUserDTO } from './CreateUserDTO.js';

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

export class CreateUser implements UseCase<CreateUserDTO, Promise<Response>> {
  async execute(request: CreateUserDTO) {
    try {
      const emailOrError = UserEmail.create(request.email);
      if (emailOrError.isFailure) {
        return left(emailOrError);
      }
      const userProps = {
        email: emailOrError.getValue(),
        firstName: request.firstName,
        lastName: request.lastName,
        joinedAt: request.timeJoined,
      };
      const userOrError = User.create(userProps);
      if (userOrError.isFailure) {
        return left(userOrError);
      }
      const user = userOrError.getValue();
      DomainEvents.dispatchEventsForAggregate(user.id);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
