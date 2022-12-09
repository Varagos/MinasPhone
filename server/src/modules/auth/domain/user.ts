import { UserEmail } from './userEmail.js';
import { UserId } from './userId.js';
import { UserCreated } from './events/UserCreated.js';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot.js';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID.js';
import { Result } from '../../../shared/core/Result.js';

interface UserProps {
  email: UserEmail;
  firstName: string;
  lastName: string;
  joinedAt: number;
}

export class User extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return UserId.create(this._id).getValue();
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName;
  }
  get lastName(): string {
    return this.props.lastName;
  }

  get joinedAt(): number {
    return this.props.joinedAt;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const isNewUser = !!id === false;
    const user = new User(
      {
        ...props,
      },
      id,
    );

    if (isNewUser) {
      user.addDomainEvent(new UserCreated(user));
    }

    return Result.ok<User>(user);
  }
}
