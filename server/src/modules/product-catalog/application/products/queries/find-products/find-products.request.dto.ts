import {
  TransformJSON,
  CustomSortParam,
  CustomRangeParam,
  CustomFilterParam,
} from '@libs/api/query-params.request';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Validate } from 'class-validator';

export class FindProductsRequestDto {
  @ApiProperty({
    required: false,
    example: 'iphone-12',
    description: 'The slug of the product 1to filter by',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    required: false,
    example: 'c7b58d20-92a7-4e72-8da7-82971a1a9f4f',
    description: 'The UUID of the category to filter by',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}

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
  ])
  filter?: Record<string, string | number>;
}
