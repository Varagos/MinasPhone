import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductRequestDto {
  @ApiProperty({
    required: true,
    example: 'Apple MacBook Pro',
    description: 'The name of the product to create',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: 'This is a great laptop for professionals',
    description: 'The description of the product to create',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
    example: 1999.99,
    description: 'The price of the product to create',
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    required: true,
    example: 10,
    description: 'The quantity of the product',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    required: true,
    example: true,
    description: 'Indicates whether the product is active or not',
  })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @ApiProperty({
    required: true,
    description: 'The base64-encoded image of the product to create',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    required: true,
    example: 'prod_g7F54H',
    description: 'The SKU of the product',
  })
  @IsString()
  // @IsNotEmpty()
  sku: string;

  @ApiProperty({
    required: false,
    example: 'c7b58d20-92a7-4e72-8da7-82971a1a9f4f',
    description: 'The UUID of the category the product belongs to',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
