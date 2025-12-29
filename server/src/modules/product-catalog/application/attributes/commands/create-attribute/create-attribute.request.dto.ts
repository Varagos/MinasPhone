import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  ValueTypes,
  ValueType,
  InputTypes,
  InputType,
} from '@modules/product-catalog/domain/attribute.entity';

export class AttributeValueDto {
  @ApiProperty({ description: 'Value' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ description: 'Display order' })
  @IsInt()
  @Min(0)
  displayOrder: number;
}

export class CreateAttributeRequestDto {
  @ApiProperty({
    required: true,
    example: 'Brand',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    required: true,
    example: 'enum',
    description: 'Type of values for the attribute',
    enum: ValueTypes,
  })
  @IsEnum(ValueTypes)
  readonly valueType: ValueType;

  @ApiProperty({
    required: true,
    example: 'select',
    description:
      'The input type for the attribute, used in the UI for filtering',
    enum: InputTypes,
  })
  @IsEnum(InputTypes)
  readonly inputType: InputType;

  @ApiProperty({
    required: false,
    example: 'mAh',
  })
  @IsOptional()
  @IsString()
  readonly unit: string | null;

  @ApiProperty({
    description: 'Attribute values (for enum/multiselect)',
    type: [AttributeValueDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeValueDto)
  readonly attributeValues?: AttributeValueDto[];
}
