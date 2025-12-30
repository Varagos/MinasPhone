import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';
import {
  InputType,
  InputTypes,
  ValueType,
  ValueTypes,
} from '@modules/product-catalog/domain/attribute.entity';

export class AttributeValueDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  value: string;

  @ApiProperty({ required: false, nullable: true })
  displayOrder?: number | null;
}

export class AttributeResponseDto extends ResponseBase {
  @ApiProperty()
  name: string;

  @ApiProperty({ enum: ValueTypes })
  valueType: ValueType;

  @ApiProperty({ enum: InputTypes })
  inputType: InputType;

  @ApiProperty({ required: false, nullable: true })
  unit: string | null;

  @ApiProperty({ type: [AttributeValueDto], required: false, nullable: true })
  attributeValues: AttributeValueDto[] | null;
}
