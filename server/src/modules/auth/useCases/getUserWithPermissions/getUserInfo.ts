import { AppError } from '../../../../shared/core/AppError.js';
import { Either, left, Result, right } from '../../../../shared/core/Result.js';
import { UseCase } from '../../../../shared/core/UseCase.js';
import { UserEmail } from '../../domain/userEmail.js';
import { IAuthService } from '../../services/authProvider.js';
import { getUserInfoDTO } from './getUserDTO.js';

type Response = Either<AppError.UnexpectedError | Result<any>, Result<any>>;

export class GetUserInfo implements UseCase<getUserInfoDTO, Promise<Response>> {
  constructor(private authService: IAuthService) {}
  async execute(request: getUserInfoDTO) {
    try {
      if (request.id) {
        const result = await this.authService.getUserInfoWithRoles(request.id);
        return right(Result.ok<void>(result));
      }

      if (!request.email) {
        return left(new AppError.UnexpectedError('No email provided'));
      }

      const emailOrError = UserEmail.create(request.email);
      if (emailOrError.isFailure) {
        return left(emailOrError);
      }
      const user = await this.authService.getUserForEmail(
        emailOrError.getValue().value,
      );
      if (!user) {
        return left(new AppError.UnexpectedError('No user found'));
      }
      const result = await this.authService.getUserInfoWithRoles(
        user.id.toString(),
      );
      return right(Result.ok<void>(result));
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
