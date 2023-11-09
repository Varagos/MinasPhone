import { IsOptional, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import {
  CustomFilterParam,
  CustomRangeParam,
  CustomSortParam,
  TransformJSON,
} from '@libs/api/query-params.request';

export class FindOrdersQueryDto {
  @ApiProperty({
    description: 'Order by field and order',
    example: '["email", "ASC"]',
  })
  @IsOptional()
  @TransformJSON()
  @Validate(CustomSortParam, [
    'email',
    'phoneNumber',
    'firstName',
    'lastName',
    'status',
    'createdAt',
    'updatedAt',
    'id',
  ])
  sort?: [string, 'ASC' | 'DESC'];

  @ApiProperty({
    description: 'Range of results to return',
    example: '[0, 10]',
  })
  @IsOptional()
  @TransformJSON()
  @Validate(CustomRangeParam)
  range?: [number, number];

  @ApiProperty({
    description: 'Filter results',
    example: '{"email": "john@doe.com"}',
  })
  @IsOptional()
  @TransformJSON()
  @Validate(CustomFilterParam, [
    'email',
    'phoneNumber',
    'firstName',
    'lastName',
    'status',
  ])
  filter?: Record<string, string | number>;
}
