import { Controller, Get, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '@modules/customers/application/queries/get-all-users/get-all-users.query';
import { DeleteUserCommand } from '@modules/customers/application/commands/delete-user/delete-user.command';
import { GetUserByIdQuery } from '@modules/customers/application/queries/get-user-by-id/get-user-by-id.query';
import { routesV1 } from 'configs/app.routes';

@Controller(routesV1.version)
export class CustomersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // @Post()
  // create(@Body() createCustomerDto: CreateCustomerDto) {
  //   // return this.q.create(createCustomerDto);
  // }

  @Get(routesV1.user.root)
  findAll() {
    const query = new GetAllUsersQuery();
    return this.queryBus.execute(query);
  }

  @Get(routesV1.user.getOne)
  findOne(@Param('id') id: string) {
    const query = new GetUserByIdQuery(id);
    return this.queryBus.execute(query);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCustomerDto: UpdateCustomerDto,
  // ) {
  //   return this.customersService.update(+id, updateCustomerDto);
  // }

  @Delete(routesV1.user.delete)
  remove(@Param('id') id: string) {
    const command = new DeleteUserCommand(id);
    return this.commandBus.execute(command);
  }
}
