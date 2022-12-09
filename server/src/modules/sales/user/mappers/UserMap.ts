import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID.js';
import { Mapper } from '../../../../shared/infra/Mapper.js';
import { User } from '../domain/user.js';
import { UserEmail } from '../domain/userEmail.js';

export class UserMap implements Mapper<User> {
  public static toPersistence(user: User): any {
    return {
      id: user.id.toString(),
      email: user.email.value,
      first_name: user.firstName,
      last_name: user.lastName,
      joined_at: new Date(user.joinedAt),
    };
  }

  public static toDomain(raw: any): User {
    const emailOrError = UserEmail.create(raw.email);
    const userOrError = User.create(
      {
        email: emailOrError.getValue(),
        firstName: raw.first_name,
        lastName: raw.last_name,
        joinedAt: raw.joined_at.getTime(),
      },
      new UniqueEntityID(raw.id),
    );

    userOrError.isFailure && console.log(userOrError.getErrorValue());

    return userOrError.getValue();
  }
}
