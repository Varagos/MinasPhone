import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  Body,
  NotFoundException as HttpNotFoundException,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteUserCommand } from '@modules/user-management/application/commands/delete-user/delete-user.command';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedQueryRequestDto } from '@libs/api/paginated-query.request.dto';
import { FindUsersDto } from '@modules/user-management/application/queries/find-users/find-users.request.dto';
import { FindUsersQuery } from '@modules/user-management/application/queries/find-users/find-users.query';
import { UserPaginatedResponseDto } from '@modules/user-management/dtos/user.paginated.response.dto';
import { ResponseBase } from '@libs/api/response.base';
import { FindUsersQueryResponse } from '@modules/user-management/application/queries/find-users/find-users.handler';
import { match } from 'oxide.ts';
import { FindUserByIdQueryResponse } from '@modules/user-management/application/queries/find-user-by-id/find-user-by-id.handler';
import { NotFoundException } from '@libs/exceptions';
import { FindUserByIdQuery } from '@modules/user-management/application/queries/find-user-by-id/find-user-by-id.query';
import { UserResponseDto } from '@modules/user-management/dtos/user.response.dto';
import { RolesGuard } from '@modules/user-management/user-management.module';

@ApiTags('users')
@Controller(routesV1.version)
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(routesV1.user.root)
  @ApiOperation({
    summary: 'Find users',
    description: 'This route can only be accessed by admins.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserPaginatedResponseDto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(new RolesGuard())
  async findAll(
    @Body() request: FindUsersDto,
    @Query() queryParams: PaginatedQueryRequestDto,
  ): Promise<UserPaginatedResponseDto> {
    const query = new FindUsersQuery({
      ...request,
      ...queryParams,
    });
    const result: FindUsersQueryResponse = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    // Whitelisting returned properties
    return new UserPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((user) => ({
        ...new ResponseBase({
          id: user.id,
          createdAt: new Date(0),
          updatedAt: new Date(0),
        }),
        email: user.email,
      })),
    });
  }

  @Get(routesV1.user.getOne)
  @ApiOperation({ summary: 'Find one user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiResponse,
  })
  @UseGuards(new RolesGuard())
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const query = new FindUserByIdQuery(id);
    const result: FindUserByIdQueryResponse = await this.queryBus.execute(
      query,
    );

    return match(result, {
      Ok: (user) => {
        return {
          ...new ResponseBase({
            id: user.id,
            createdAt: new Date(0),
            updatedAt: new Date(0),
          }),
          email: user.email,
          roles: user.roles,
        };
      },
      Err: (error: Error) => {
        if (error instanceof NotFoundException) {
          throw new HttpNotFoundException();
        }
        throw error;
      },
    });
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCustomerDto: UpdateCustomerDto,
  // ) {
  //   return this.customersService.update(+id, updateCustomerDto);
  // }

  @ApiOperation({ summary: 'Delete one user' })
  @Delete(routesV1.user.delete)
  @UseGuards(new RolesGuard())
  remove(@Param('id') id: string) {
    const command = new DeleteUserCommand(id);
    return this.commandBus.execute(command);
  }
}
