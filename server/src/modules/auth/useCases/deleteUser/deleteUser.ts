import { AppError } from '../../../../shared/core/AppError.js';
import { Either, left, Result, right } from '../../../../shared/core/Result.js';
import { UseCase } from '../../../../shared/core/UseCase.js';
import { UserEmail } from '../../domain/userEmail.js';
import { IAuthService } from '../../services/authProvider.js';
import { DeleteUserDTO } from './deleteUserDTO.js';
import { DeleteUserErrors } from './Errors.js';

type Response = Either<
  AppError.UnexpectedError | DeleteUserErrors.InvalidEmail,
  Result<void>
>;

export class DeleteUser implements UseCase<DeleteUserDTO, Promise<Response>> {
  constructor(private authService: IAuthService) {}
  async execute(request: DeleteUserDTO) {
    try {
      if (request.id) {
        await this.authService.deleteUserForId(request.id);
        return right(Result.ok<void>());
      }

      if (!request.email) {
        return left(new AppError.UnexpectedError('No email provided'));
      }

      const emailOrError = UserEmail.create(request.email);
      if (emailOrError.isFailure) {
        return left(new DeleteUserErrors.InvalidEmail());
      }
      const user = await this.authService.getUserForEmail(
        emailOrError.getValue().value,
      );
      if (!user) {
        return left(new DeleteUserErrors.UserNotFound());
      }
      await this.authService.deleteUserForId(user.id.toString());
      return right(Result.ok<void>());

      // TODO add domain event like in UserCreated
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
