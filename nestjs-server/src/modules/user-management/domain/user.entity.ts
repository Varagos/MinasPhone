import { AggregateRoot, AggregateID } from '@libs/ddd';
import { UserCreatedDomainEvent } from './events/user-created.domain-event';
import {
  CreateUserProps,
  UpdateUserAddressProps,
  UserProps,
  UserRoles,
} from './user.types';
import { randomUUID } from 'crypto';
import { UserDeletedDomainEvent } from './events/user-deleted.domain-event';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateUserProps): UserEntity {
    const id = randomUUID();
    /* Setting a default role since we are not accepting it during creation. */
    const props: UserProps = {
      ...create,
      role: UserRoles.customer,
      joinedAt: Date.now(),
    };
    const user = new UserEntity({ id, props });
    /* adding "UserCreated" Domain Event that will be published
    eventually so an event handler somewhere may receive it and do an
    appropriate action. Multiple events can be added if needed. */
    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id,
        email: props.email.unpack().value,
        firstName: props.firstName,
        lastName: props.lastName,
        lastJoinedAt: props.joinedAt,
      }),
    );
    return user;
  }

  /* You can create getters only for the properties that you need to
  access and leave the rest of the properties private to keep entity
  encapsulated. To get all entity properties (for saving it to a
  database or mapping a response) use .getPropsCopy() method
  defined in a EntityBase parent class */
  get role(): UserRoles {
    return this.props.role;
  }

  private changeRole(newRole: UserRoles): void {
    // this.addEvent(
    //   new UserRoleChangedDomainEvent({
    //     aggregateId: this.id,
    //     oldRole: this.props.role,
    //     newRole,
    //   }),
    // );

    this.props.role = newRole;
  }

  makeAdmin(): void {
    this.changeRole(UserRoles.admin);
  }

  delete(): void {
    this.addEvent(
      new UserDeletedDomainEvent({
        aggregateId: this.id,
      }),
    );
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
