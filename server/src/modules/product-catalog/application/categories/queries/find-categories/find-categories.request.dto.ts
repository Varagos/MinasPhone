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
  isNumber,
  IsOptional,
  isString,
  IsString,
  IsUUID,
  Max,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class FilterDto {
  @IsOptional()
  @Type(() => String)
  @ValidateIf(
    (o) =>
      isString(o) || (Array.isArray(o) && o.every((item) => isString(item))),
  )
  id?: string | string[];

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
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
  @ValidateNested()
  @Type(() => FilterDto)
  filter?: FilterDto;
}
