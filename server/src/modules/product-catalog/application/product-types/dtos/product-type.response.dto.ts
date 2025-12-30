import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

// Lightweight DTO for list views
export class ProductTypeAttributeListDto {
  @ApiProperty({
    description: 'Attribute ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  attributeId: string;

  @ApiProperty({ description: 'Attribute name', example: 'Color' })
  attributeName: string;

  @ApiProperty({ description: 'Is required' })
  isRequired: boolean;

  @ApiProperty({ description: 'Is filterable' })
  isFilterable: boolean;

  @ApiProperty({ description: 'Is searchable' })
  isSearchable: boolean;

  @ApiProperty({
    description: 'Display order',
    required: false,
    nullable: true,
  })
  displayOrder: number | null;
}

export class ProductTypeListResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'Smartphone',
    description: "Product type's name",
  })
  name: string;

  @ApiProperty({
    type: () => ProductTypeAttributeListDto,
    isArray: true,
    description: 'Basic attributes configuration for this product type',
  })
  attributes: ProductTypeAttributeListDto[];
}

export class AttributeValueDto {
  @ApiProperty({
    description: 'Attribute value ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({ description: 'Value', example: 'Red' })
  value: string;

  @ApiProperty({ description: 'Display order', example: 1 })
  displayOrder: number;
}

export class ProductTypeAttributeConfigDto {
  @ApiProperty({
    description: 'Attribute ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  attributeId: string;

  @ApiProperty({ description: 'Attribute name', example: 'Color' })
  attributeName: string;

  @ApiProperty({
    description: 'Value type',
    enum: ['string', 'number', 'boolean', 'enum', 'multiselect'],
    example: 'enum',
  })
  valueType: string;

  @ApiProperty({
    description: 'Input type',
    enum: ['text', 'number', 'select', 'multiselect', 'checkbox', 'radio'],
    example: 'select',
  })
  inputType: string;

  @ApiProperty({
    description: 'Unit of measurement',
    required: false,
    nullable: true,
    example: 'GB',
  })
  unit: string | null;

  @ApiProperty({ description: 'Is required' })
  isRequired: boolean;

  @ApiProperty({ description: 'Is filterable' })
  isFilterable: boolean;

  @ApiProperty({ description: 'Is searchable' })
  isSearchable: boolean;

  @ApiProperty({
    description: 'Display order',
    required: false,
    nullable: true,
  })
  displayOrder: number | null;

  @ApiProperty({
    description: 'Available values for enum/multiselect attributes',
    type: [AttributeValueDto],
  })
  attributeValues: AttributeValueDto[];
}

export class ProductTypeResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'Smartphone',
    description: "Product type's name",
  })
  name: string;

  @ApiProperty({
    type: () => ProductTypeAttributeConfigDto,
    isArray: true,
    description: 'Attributes configuration for this product type',
  })
  attributes: ProductTypeAttributeConfigDto[];
}
