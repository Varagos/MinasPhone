import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AttributeConfigDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Attribute ID',
  })
  @IsString()
  readonly attributeId: string;

  @ApiProperty({
    example: true,
    description: 'Whether the attribute is required for this product type',
  })
  @IsBoolean()
  readonly isRequired: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the attribute can be used for filtering',
  })
  @IsBoolean()
  readonly isFilterable: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the attribute can be used for searching',
  })
  @IsBoolean()
  readonly isSearchable: boolean;

  @ApiProperty({
    example: 1,
    description: 'Display order of the attribute',
  })
  @IsOptional()
  readonly displayOrder: number | null;
}

export class CreateProductTypeRequestDto {
  @ApiProperty({
    example: 'Smartphone',
    description: 'The name of the product type',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly name: string;

  @ApiProperty({
    type: [AttributeConfigDto],
    description: 'List of attributes associated with this product type',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeConfigDto)
  readonly attributes?: AttributeConfigDto[];
}
