import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateProductRequestDto {
  @ApiProperty({
    required: false,
    example: 'Product Name',
    description: 'The name of the product',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    example: 'Product description',
    description: 'The description of the product',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
    example: 10,
    description: 'The quantity of the product',
  })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    required: false,
    example: 9.99,
    description: 'The price of the product',
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    required: false,
    example: true,
    description: 'The status of the product (active or inactive)',
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    required: false,
    example: '12345',
    description: 'The SKU (Stock Keeping Unit) of the product',
  })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({
    required: false,
    example: 'c7b58d20-92a7-4e72-8da7-82971a1a9f4f',
    description: 'The UUID of the category the product belongs to',
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    required: false,
    example: 'base64 encoded image data',
    description: 'The image of the product in base64-encoded format',
  })
  @IsString()
  @IsOptional()
  image?: string;
}
