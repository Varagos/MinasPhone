import {
  Controller,
  HttpStatus,
  Param,
  NotFoundException as HttpNotFoundException,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { CategoryAlreadyExistsError } from '@modules/product-catalog/domain/category.errors';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { DeleteCategoryCommand } from './delete-category.command';
import { DeleteCategoryCommandResponse } from './delete-category.handler';
import { NotFoundException } from '@libs/exceptions';

@Controller(routesV1.version)
export class DeleteCategoryHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CategoryAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Delete(routesV1.category.delete)
  async create(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const command = new DeleteCategoryCommand(id);

    const result: DeleteCategoryCommandResponse = await this.commandBus.execute(
      command,
    );

    // Deciding what to do with a Result (similar to Rust matching)
    // if Ok we return a response with an id
    // if Error decide what to do with it depending on its type
    return match(result, {
      Ok: (deleted: boolean) => deleted,
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new HttpNotFoundException(error.message);
        throw error;
      },
    });
  }
}
