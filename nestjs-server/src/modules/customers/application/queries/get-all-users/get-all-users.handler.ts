import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './get-all-users.query';
import { AUTH_SERVICE_TOKEN } from '@modules/customers/constants';
import { Inject } from '@nestjs/common';
import { IAuthService } from '../../ports/auth-service.port';
import { Ok } from 'oxide.ts';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersQueryHandler implements IQueryHandler {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {}

  async execute(query: GetAllUsersQuery) {
    const users = await this.authService.getUsers();
    return Ok(users);
  }
}
