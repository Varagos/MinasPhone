import {
  Body,
  ConflictException as ConflictHttpException,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { CategoryAlreadyExistsError } from '@modules/product-catalog/domain/category.errors';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { CreateCategoryRequestDto } from './create-category.request.dto';
import { CreateCategoryCommand } from './create-category.command';
import { CreateCategoryCommandResponse } from './create-category.handler';

@Controller(routesV1.version)
export class CreateCategoryHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a Category' })
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
  @Post(routesV1.category.root)
  async create(@Body() body: CreateCategoryRequestDto): Promise<IdResponse> {
    console.log('body', body);
    const { slug, name, parentId = null } = body;
    const command = new CreateCategoryCommand(slug, name, parentId);

    const result: CreateCategoryCommandResponse = await this.commandBus.execute(
      command,
    );

    // Deciding what to do with a Result (similar to Rust matching)
    // if Ok we return a response with an id
    // if Error decide what to do with it depending on its type
    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof CategoryAlreadyExistsError)
          throw new ConflictHttpException(error.message);
        throw error;
      },
    });
  }
}
