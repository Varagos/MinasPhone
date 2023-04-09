import {
  Body,
  ConflictException as ConflictHttpException,
  NotFoundException as HttpNotFoundException,
  Controller,
  HttpStatus,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { CreateProductRequestDto } from './create-product.request.dto';
import { CreateProductCommand } from './create-product.command';
import { CreateProductCommandResponse } from './create-product.handler';
import { ProductAlreadyExistsError } from '@modules/product-catalog/domain/product.errors';
import { ArgumentInvalidException, NotFoundException } from '@libs/exceptions';

@Controller(routesV1.version)
export class CreateProductHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a Product' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ProductAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.product.root)
  async create(@Body() body: CreateProductRequestDto): Promise<IdResponse> {
    console.log('body', body);
    const command = new CreateProductCommand(body);

    const result: CreateProductCommandResponse = await this.commandBus.execute(
      command,
    );

    // Deciding what to do with a Result (similar to Rust matching)
    // if Ok we return a response with an id
    // if Error decide what to do with it depending on its type
    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof ProductAlreadyExistsError)
          throw new ConflictHttpException(error.message);
        if (error instanceof ArgumentInvalidException)
          throw new BadRequestException(error.message);
        if (error instanceof NotFoundException)
          throw new HttpNotFoundException(error.message);
        throw error;
      },
    });
  }
}
