import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException as HttpNotFoundException,
  ParseUUIDPipe,
  Param,
  Put,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { UpdateProductRequestDto } from './update-product.request.dto';
import { UpdateProductCommandResponse } from './update-product.handler';
import { UpdateProductCommand } from './update-product.command';
import { NotFoundException } from '@libs/exceptions';

@Controller(routesV1.version)
export class UpdateProductHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Update a Product' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Put(routesV1.product.update)
  async updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProductRequestDto,
  ): Promise<'OK'> {
    const command = new UpdateProductCommand({ ...body, id });

    const result: UpdateProductCommandResponse = await this.commandBus.execute(
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
