import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  timeJoined: number;
}

export const USER_REGISTER_EVENT_NAME = 'super-tokens.user.registered';
/**
 * This get called by the supertokens service after a user signs up
 */
@Injectable()
export class UserRegisteredListener {
  constructor(private readonly commandBus: CommandBus) {}
  @OnEvent('order.created')
  async handle(user: UserDTO) {
    console.log('AfterSignUpHandler', user);
  }
}
