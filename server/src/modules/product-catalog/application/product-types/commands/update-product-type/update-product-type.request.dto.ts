import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AttributeConfigDto {
  @ApiProperty({ description: 'Attribute ID' })
  @IsUUID()
  attributeId: string;

  @ApiProperty({ description: 'Is this attribute required?' })
  @IsBoolean()
  isRequired: boolean;

  @ApiProperty({ description: 'Is this attribute filterable?' })
  @IsBoolean()
  isFilterable: boolean;

  @ApiProperty({ description: 'Is this attribute searchable?' })
  @IsBoolean()
  isSearchable: boolean;

  @ApiProperty({ description: 'Display order', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder: number | null;
}

export class UpdateProductTypeRequestDto {
  @ApiProperty({
    required: true,
    example: 'Smartphone',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Attribute configurations for this product type',
    type: [AttributeConfigDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeConfigDto)
  readonly attributes?: AttributeConfigDto[];
}
