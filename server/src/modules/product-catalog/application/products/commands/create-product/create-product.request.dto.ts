import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class ProductAttributeValue {
  @IsUUID()
  @IsOptional()
  valueId: string | null;

  @IsString()
  @IsOptional()
  textValue: string | null;

  @IsNumber()
  @IsOptional()
  numericValue: number | null;

  @IsBoolean()
  @IsOptional()
  booleanValue: boolean | null;
}

export class ProductAttributeValues {
  [key: string]: ProductAttributeValue[];
}

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
    description: `The base64-encoded image of the product to create. The output format must be data:content_type;base64,encoded_string.
    You can use https://base64.guru/converter/encode/image to encode an image to base64, select the output format as Data URI`,
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...<truncated for brevity>',
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
  @IsOptional()
  sku: string;

  @ApiProperty({
    example: 'c7b58d20-92a7-4e72-8da7-82971a1a9f4f',
    description: 'The UUID of the category the product belongs to',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    required: false,
    example: 'c7b58d20-92a7-4e72-8da7-82971a1a9f4f',
    description: 'The UUID of the product type the product belongs to',
  })
  @IsUUID()
  @IsOptional()
  productTypeId?: string;

  @ApiProperty({
    required: false,
    example: {
      'e96e96df-e34c-4530-92d8-92e0c5c289b0': [
        {
          valueId: 'd8837292-366c-4ef9-bd96-cb9f515daf8c',
          textValue: null,
          numericValue: null,
          booleanValue: null,
        },
      ],
      '4f1be95d-f37e-4d65-a3a4-ac571dc6c3fa': [
        {
          valueId: null,
          textValue: '256GB',
          numericValue: null,
          booleanValue: null,
        },
      ],
    },
    description:
      'Product attribute values grouped by attribute ID. Each key is an attribute UUID, and the value is an array of attribute values.',
  })
  @IsObject()
  @IsOptional()
  attributeValues?: ProductAttributeValues;
}
