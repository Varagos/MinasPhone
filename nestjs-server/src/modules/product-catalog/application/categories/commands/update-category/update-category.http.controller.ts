import {
  Body,
  ConflictException as ConflictHttpException,
  Controller,
  HttpStatus,
  Post,
  NotFoundException as HttpNotFoundException,
  ParseUUIDPipe,
  Param,
  Put,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { CategoryAlreadyExistsError } from '@modules/product-catalog/domain/category.errors';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { UpdateCategoryRequestDto } from './update-category.request.dto';
import { UpdateCategoryCommandResponse } from './update-category.handler';
import { UpdateCategoryCommand } from './update-category.command';
import { NotFoundException } from '@libs/exceptions';

@Controller(routesV1.version)
export class UpdateCategoryHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Update a Category' })
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
  @Put(routesV1.category.update)
  async updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCategoryRequestDto,
  ): Promise<'OK'> {
    const { parentId = null, ...rest } = body;
    const command = new UpdateCategoryCommand({ ...rest, parentId, id });

    const result: UpdateCategoryCommandResponse = await this.commandBus.execute(
      command,
    );

    // Deciding what to do with a Result (similar to Rust matching)
    // if Ok we return a response with an id
    // if Error decide what to do with it depending on its type
    return match(result, {
      Ok: () => 'OK',
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new HttpNotFoundException(error.message);
        throw error;
      },
    });
  }
}
