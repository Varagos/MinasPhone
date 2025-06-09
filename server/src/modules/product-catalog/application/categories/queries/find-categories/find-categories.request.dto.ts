import {
  CustomFilterParam,
  CustomRangeParam,
  CustomSortParam,
  TransformJSON,
} from '@libs/api/query-params.request';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  Validate,
} from 'class-validator';

export class FindCategoriesDto {
  @ApiProperty({
    required: false,
    example: 'electronics',
    description: 'The slug of the category to filter by',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    required: false,
    example: 'Electronics',
    description: 'The name of the category to filter by',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
    example: 'c7b58d20-92a7-4e72-8da7-82971a1a9f4f',
    description: 'The UUID of the parent category to filter by',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}

export class FindCategoriesQueryDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  @Type(() => Number)
  @ApiProperty({
    example: 10,
    description: 'Specifies a limit of returned records',
    required: false,
  })
  readonly limit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  @Type(() => Number)
  @ApiProperty({ example: 0, description: 'Page number', required: false })
  readonly page?: number;

  @ApiProperty({
    description: 'Filter results',
    example: '{"slug": "electronics"}',
  })
  @IsOptional()
  @TransformJSON()
  @Validate(CustomFilterParam, ['name', 'slug', 'parentId'])
  filter?: Record<string, string | number>;
}
