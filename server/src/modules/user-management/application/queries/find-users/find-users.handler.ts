import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUsersQuery } from './find-users.query';
import { AUTH_SERVICE_TOKEN } from '@modules/user-management/constants';
import { Inject } from '@nestjs/common';
import { IAuthService, UserInfo } from '../../ports/auth-service.port';
import { Ok, Result } from 'oxide.ts';
import { Paginated } from '@libs/ddd';

export type FindUsersQueryResponse = Result<Paginated<UserInfo>, Error>;

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {}

  async execute(query: FindUsersQuery) {
    const users = await this.authService.getUsers();
    return Ok(
      new Paginated({
        count: users.length,
        limit: query.limit,
        page: query.page,
        // offset: query.offset,
        data: users,
      }),
    );
  }
}
