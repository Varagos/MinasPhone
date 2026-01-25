import {
  TransformJSON,
  CustomSortParam,
  CustomRangeParam,
  CustomFilterParam,
} from '@libs/api/query-params.request';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';

class ProductsFilterDto {
  @ApiProperty({
    description: 'Filter by category ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  categoryId?: string;

  @ApiProperty({
    description: 'Filter by category slug',
    example: 'smartphones',
    required: false,
  })
  categorySlug?: string;

  @ApiProperty({
    description: 'Filter by product name (partial match)',
    example: 'iPhone',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Minimum price filter',
    example: 100,
    required: false,
  })
  price_gte?: number;

  @ApiProperty({
    description: 'Maximum price filter',
    example: 1000,
    required: false,
  })
  price_lte?: number;

  @ApiProperty({
    description:
      'Filter by attribute values. Keys are attribute IDs, values are arrays of attribute value IDs. Multiple values per attribute = OR, multiple attributes = AND.',
    example: {
      'brand-attr-id': ['apple-value-id', 'samsung-value-id'],
      'ram-attr-id': ['8gb-value-id'],
    },
    required: false,
  })
  attributeFilters?: Record<string, string[]>;
}

@ApiExtraModels(ProductsFilterDto)
export class FindProductsQueryDto {
  @ApiProperty({
    description:
      'Sort by field and order. Available fields: slug, name, price, quantity, createdAt, updatedAt, id',
    example: '["price", "ASC"]',
    required: false,
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
    description:
      'Pagination range [start, end]. Example: [0, 9] returns first 10 items.',
    example: '[0, 9]',
    required: false,
  })
  @IsOptional()
  @TransformJSON()
  @Validate(CustomRangeParam)
  range?: [number, number];

  @ApiProperty({
    description: 'Filter products by various criteria',
    example:
      '{"categorySlug": "smartphones", "price_gte": 100, "price_lte": 1000, "attributeFilters": {"brand-attr-id": ["apple-value-id"]}}',
    required: false,
    type: () => ProductsFilterDto,
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
    'attributeFilters',
  ])
  filter?: ProductsFilterDto;
}
