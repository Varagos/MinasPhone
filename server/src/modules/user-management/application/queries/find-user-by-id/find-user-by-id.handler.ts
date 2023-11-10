import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AUTH_SERVICE_TOKEN } from '@modules/user-management/constants';
import { Inject } from '@nestjs/common';
import { IAuthService, UserInfo } from '../../ports/auth-service.port';
import { Err, Ok, Result } from 'oxide.ts';
import { FindUserByIdQuery } from './find-user-by-id.query';
import { NotFoundException } from '@libs/exceptions';

export type FindUserByIdQueryResponse = Result<UserInfo, Error>;

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler implements IQueryHandler {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {}

  async execute(query: FindUserByIdQuery) {
    const user = await this.authService.getUserById(query.id);
    if (user.isNone()) {
      return Err(new NotFoundException(`User with id ${query.id} not found`));
    }

    return Ok(user.unwrap());
  }
}
