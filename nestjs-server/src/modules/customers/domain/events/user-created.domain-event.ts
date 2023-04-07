import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class UserCreatedDomainEvent extends DomainEvent {
  readonly email: string;

  readonly firstName?: string;

  readonly lastName?: string;

  readonly lastJoinedAt: number;

  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.lastJoinedAt = props.lastJoinedAt;
  }
}
