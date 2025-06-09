import {
  TransformJSON,
  CustomSortParam,
  CustomRangeParam,
  CustomFilterParam,
} from '@libs/api/query-params.request';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Validate } from 'class-validator';

export class FindProductsQueryDto {
  @ApiProperty({
    description: 'Order by field and order',
    example: '["email", "ASC"]',
  })
  @IsOptional()
  @TransformJSON()
  @Validate(CustomSortParam, [
    'slug',
    'name',
    'price',
    'quantity',
    'createdAt',
    'updatedAt',
    'id',
    'reference',
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
    'categoryId',
    'category_id',
    'name',
    'categorySlug',
    'price_gte',
    'price_lte',
  ])
  filter?: Record<string, string | number>;
}
