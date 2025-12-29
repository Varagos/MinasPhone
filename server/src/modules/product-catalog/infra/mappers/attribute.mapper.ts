import { Injectable } from '@nestjs/common';
import {
  AttributeModel,
  attributeSchema,
  AttributeValueModel,
  attributeValueSchema,
} from '../database/attribute.repository';
import { AttributeEntity } from '@modules/product-catalog/domain/attribute.entity';
import { AttributeValueEntity } from '@modules/product-catalog/domain/attribute-value.entity';
import { AttributeResponseDto } from '@modules/product-catalog/application/attributes/dtos/attribute.response.dto';

@Injectable()
export class AttributeMapper {
  toPersistence(attribute: AttributeEntity): AttributeModel {
    const {
      id,
      createdAt,
      updatedAt,
      name,
      valueType,
      inputType,
      unit,
      attributeValues,
    } = attribute;

    const attributeData = attributeSchema.parse({
      id,
      created_at: createdAt,
      updated_at: updatedAt,
      name,
      value_type: valueType,
      input_type: inputType,
      unit,
      attribute_values: attributeValues.map((attrValue) =>
        attributeValueSchema.parse({
          id: attrValue.id,
          attribute_id: id,
          value: attrValue.value,
          display_order: attrValue.displayOrder,
          created_at: attrValue.createdAt,
          updated_at: attrValue.updatedAt,
        }),
      ),
    });
    return attributeData;
  }

  toDomain(attributeModel: AttributeModel): AttributeEntity {
    // Get mimetype from image
    // const buffer = Buffer.from(productModel.image, 'base64');
    // const mimeType = fileType(buffer);
    return new AttributeEntity({
      id: attributeModel.id,
      createdAt: attributeModel.created_at,
      updatedAt: attributeModel.updated_at,
      props: {
        name: attributeModel.name,
        valueType: attributeModel.value_type,
        inputType: attributeModel.input_type,
        unit: attributeModel.unit,
        attributeValues: attributeModel.attribute_values.map(
          (attrValue) =>
            new AttributeValueEntity({
              id: attrValue.id,
              createdAt: attrValue.created_at,
              updatedAt: attrValue.updated_at,

              props: {
                value: attrValue.value,
                displayOrder: attrValue.display_order,
              },
            }),
        ),
      },
    });
  }

  toResponse(attribute: AttributeEntity): AttributeResponseDto {
    const props = attribute.getPropsCopy();
    const response = new AttributeResponseDto(attribute);
    response.name = props.name;
    response.valueType = props.valueType;
    response.inputType = props.inputType;
    response.unit = props.unit;
    //
    response.attributeValues = props.attributeValues
      ? props.attributeValues.map((av) => av.getPropsCopy())
      : null;
    return response;
  }
}
