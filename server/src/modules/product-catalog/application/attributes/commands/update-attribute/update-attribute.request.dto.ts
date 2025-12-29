import {
  InputType,
  InputTypes,
  ValueType,
  ValueTypes,
} from '@modules/product-catalog/domain/attribute.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AttributeValueDto } from '../create-attribute/create-attribute.request.dto';

export class UpdateAttributeRequestDto {
  @ApiProperty({
    required: true,
    example: 'Brand',
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    required: true,
    example: 'enum',
    description: 'Type of values for the attribute',
    enum: ValueTypes,
  })
  @IsEnum(ValueTypes)
  @IsOptional()
  readonly valueType?: ValueType;

  @ApiProperty({
    required: true,
    example: 'select',
    description:
      'The input type for the attribute, used in the UI for filtering',
    enum: InputTypes,
  })
  @IsEnum(InputTypes)
  @IsOptional()
  readonly inputType?: InputType;

  @ApiProperty({
    required: false,
    example: 'mAh',
  })
  @IsOptional()
  @IsString()
  readonly unit?: string | null;

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
