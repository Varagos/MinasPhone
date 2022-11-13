import { CreateUserDTO } from './../../../auth/useCases/createUser/CreateUserDTO';
import { DomainEvents } from '../../../../shared/domain/events/DomainEvents';
import { IHandle } from '../../../../shared/domain/events/IHandle';
import { UserCreated } from '../../../auth/domain/events/UserCreated';
import { CreateUser } from '../useCases/createUser/CreateUser';

export class AfterUserCreated implements IHandle<UserCreated> {
  private createUser: CreateUser;

  constructor(createUser: CreateUser) {
    this.setupSubscriptions();
    this.createUser = createUser;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(this.onUserCreatedEvent.bind(this), UserCreated.name);
  }

  private async onUserCreatedEvent(event: UserCreated): Promise<void> {
    const { user } = event;
    /**
     * Do something with the domain event, like
     * invoke a use case
     */
    try {
      const dto: CreateUserDTO = {
        id: user.id.toString(),
        email: user.email.value,
        firstName: user.firstName,
        lastName: user.lastName,
        timeJoined: user.joinedAt,
      };
      console.log('dto', dto);
      await this.createUser.execute(dto);
      console.log(
        `[AfterUserCreated]: Successfully executed CreateUser use case AfterUserCreated`,
      );
    } catch (err) {
      console.log(
        `[AfterUserCreated]: Failed to execute CreateUser use case AfterUserCreated.`,
      );
      console.error(err);
      console.log(JSON.stringify(event));
    }
  }
}
