import {
  Controller,
  HttpStatus,
  ConflictException as ConflictHttpException,
  Body,
  Post,
  UseGuards,
  BadRequestException,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
  NotFoundException as HttpNotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { RolesGuard } from '@modules/user-management/user-management.module';
import { CreateAttributeRequestDto } from '@modules/product-catalog/application/attributes/commands/create-attribute/create-attribute.request.dto';
import { CreateAttributeCommand } from '@modules/product-catalog/application/attributes/commands/create-attribute/create-attribute.command';
import { CreateAttributeCommandResponse } from '@modules/product-catalog/application/attributes/commands/create-attribute/create-attribute.handler';
import { UpdateAttributeRequestDto } from '@modules/product-catalog/application/attributes/commands/update-attribute/update-attribute.request.dto';
import { UpdateAttributeCommand } from '@modules/product-catalog/application/attributes/commands/update-attribute/update-attribute.command';
import { UpdateProductCommandResponse } from '@modules/product-catalog/application/attributes/commands/update-attribute/update-attribute.handler';
import { DeleteAttributeCommand } from '@modules/product-catalog/application/attributes/commands/delete-attribute/delete-attribute.command';
import { DeleteAttributeCommandResponse } from '@modules/product-catalog/application/attributes/commands/delete-attribute/delete-attribute.handler';
import * as AttributeErrors from '@modules/product-catalog/domain/attribute.errors';
import { FindAttributesRequestDto } from '@modules/product-catalog/application/attributes/queries/find-attributes/find-attributes.request.dto';
import { AttributePaginatedResponseDto } from '@modules/product-catalog/application/attributes/dtos/attribute.paginated.response.dto';
import { FindAttributesQuery } from '@modules/product-catalog/application/attributes/queries/find-attributes/find-attributes.query';
import { Paginated } from '@libs/ddd';
import { AttributeModel } from '@modules/product-catalog/application/attributes/queries/find-attribute/find-attribute.handler';
import { FindAttributeQuery } from '@modules/product-catalog/application/attributes/queries/find-attribute/find-attribute.query';
import { AttributeResponseDto } from '@modules/product-catalog/application/attributes/dtos/attribute.response.dto';
import { ResponseBase } from '@libs/api/response.base';
import { NotFoundException } from '@libs/exceptions';

@ApiTags('attributes')
@Controller(routesV1.version)
export class AttributesHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    summary: 'Create an Attribute',
    description:
      'This route can only be accessed by admins. It is used to create a new Attribute.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AttributeErrors.AttributeAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.attribute.root)
  @UseGuards(new RolesGuard())
  async create(@Body() body: CreateAttributeRequestDto): Promise<IdResponse> {
    const command = new CreateAttributeCommand(body);

    const result: CreateAttributeCommandResponse =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof AttributeErrors.AttributeAlreadyExistsError)
          throw new ConflictHttpException(error.message);

        // Handle all validation errors as BadRequest
        if (
          error instanceof AttributeErrors.AttributeNameEmptyError ||
          error instanceof AttributeErrors.AttributeNameTooLongError ||
          error instanceof AttributeErrors.InvalidValueTypeError ||
          error instanceof AttributeErrors.InvalidInputTypeError ||
          error instanceof AttributeErrors.EnumAttributeWithoutValuesError ||
          error instanceof AttributeErrors.NonEnumAttributeWithValuesError ||
          error instanceof AttributeErrors.AttributeValueEmptyError ||
          error instanceof AttributeErrors.DuplicateAttributeValueError ||
          error instanceof
            AttributeErrors.DuplicateAttributeValueCaseInsensitiveError ||
          error instanceof AttributeErrors.NegativeDisplayOrderError
        ) {
          throw new BadRequestException(error.message);
        }

        throw error;
      },
    });
  }

  @ApiOperation({
    summary: 'Update an Attribute',
    description:
      'This route can only be accessed by admins. It is used to update an attribute.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Put(routesV1.attribute.update)
  @UseGuards(new RolesGuard())
  async updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAttributeRequestDto,
  ): Promise<'OK'> {
    const command = new UpdateAttributeCommand({ ...body, id });

    const result: UpdateProductCommandResponse = await this.commandBus.execute(
      command,
    );

    return match(result, {
      Ok: () => 'OK',
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new HttpNotFoundException(error.message);

        // Handle all validation errors as BadRequest
        if (
          error instanceof AttributeErrors.AttributeNameEmptyError ||
          error instanceof AttributeErrors.AttributeNameTooLongError ||
          error instanceof AttributeErrors.InvalidValueTypeError ||
          error instanceof AttributeErrors.InvalidInputTypeError ||
          error instanceof AttributeErrors.EnumAttributeWithoutValuesError ||
          error instanceof AttributeErrors.NonEnumAttributeWithValuesError ||
          error instanceof AttributeErrors.AttributeValueEmptyError ||
          error instanceof AttributeErrors.DuplicateAttributeValueError ||
          error instanceof
            AttributeErrors.DuplicateAttributeValueCaseInsensitiveError ||
          error instanceof AttributeErrors.NegativeDisplayOrderError
        ) {
          throw new BadRequestException(error.message);
        }

        throw error;
      },
    });
  }

  @Get(routesV1.attribute.root)
  @ApiOperation({ summary: 'Find attributes' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AttributePaginatedResponseDto,
  })
  async findAttributes(
    @Query() queryParams: FindAttributesRequestDto,
  ): Promise<AttributePaginatedResponseDto> {
    const query = new FindAttributesQuery({
      limit: queryParams.limit,
      page: queryParams.page,
      name: queryParams.name,
    });

    const result: Result<
      Paginated<AttributeModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    return new AttributePaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((attr) => ({
        ...new ResponseBase({
          id: attr.id,
          createdAt: attr.created_at,
          updatedAt: attr.updated_at,
        }),
        name: attr.name,
        valueType: attr.valueType as any,
        inputType: attr.inputType as any,
        unit: attr.unit,
        attributeValues: attr.values.map((v) => ({
          id: v.id,
          value: v.value,
          displayOrder: v.displayOrder,
        })),
      })),
    });
  }

  @Get(routesV1.attribute.getOne)
  @ApiOperation({ summary: 'Find attribute by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AttributeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiErrorResponse,
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AttributeResponseDto> {
    const query = new FindAttributeQuery({ attributeId: id });
    const result: Result<AttributeModel, Error> = await this.queryBus.execute(
      query,
    );

    return match(result, {
      Ok: (attr) => ({
        ...new ResponseBase({
          id: attr.id,
          createdAt: attr.created_at,
          updatedAt: attr.updated_at,
        }),
        name: attr.name,
        valueType: attr.valueType as any,
        inputType: attr.inputType as any,
        unit: attr.unit,
        attributeValues: attr.values.map((v) => ({
          id: v.id,
          value: v.value,
          displayOrder: v.displayOrder,
        })),
      }),
      Err: (error: Error) => {
        if (error instanceof NotFoundException) {
          throw new HttpNotFoundException();
        }
        throw error;
      },
    });
  }

  @ApiOperation({
    summary: 'Delete an Attribute',
    description:
      'This route can only be accessed by admins. It is used to delete an attribute.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiErrorResponse,
  })
  @Delete(routesV1.attribute.delete)
  @UseGuards(new RolesGuard())
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<'OK'> {
    const command = new DeleteAttributeCommand({ attributeId: id });

    const result: DeleteAttributeCommandResponse =
      await this.commandBus.execute(command);

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
