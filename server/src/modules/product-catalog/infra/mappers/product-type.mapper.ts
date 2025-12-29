import { Mapper } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { ProductTypeEntity } from '@modules/product-catalog/domain/product-type.entity';
import {
  ProductTypeModel,
  productTypeSchema,
} from '../database/product-type.repository';
import { IdResponse } from '@libs/api/id.response.dto';
import { ProductTypeResponseDto } from '@modules/product-catalog/application/product-types/dtos/product-type.response.dto';
import { ProductTypeAttributeConfig } from '@modules/product-catalog/domain/value-objects/product-type-attribute-config.value-object';

@Injectable()
export class ProductTypeMapper
  implements Mapper<ProductTypeEntity, ProductTypeModel, IdResponse>
{
  toPersistence(entity: ProductTypeEntity): ProductTypeModel {
    const props = entity.getPropsCopy();
    const record: ProductTypeModel = {
      id: props.id,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
      name: props.name,
      attributes: props.attributes.map((attr) => ({
        attributeId: attr.attributeId,
        config: {
          isRequired: attr.isRequired,
          isFilterable: attr.isFilterable,
          isSearchable: attr.isSearchable,
          displayOrder: attr.displayOrder,
        },
      })),
    };
    return record;
  }

  toDomain(record: ProductTypeModel): ProductTypeEntity {
    // Map from persistence format to value objects
    const attributes = record.attributes.map((attr) =>
      ProductTypeAttributeConfig.create({
        attributeId: attr.attributeId,
        isRequired: attr.config.isRequired,
        isFilterable: attr.config.isFilterable,
        isSearchable: attr.config.isSearchable,
        displayOrder: attr.config.displayOrder,
      }),
    );

    return new ProductTypeEntity({
      id: record.id,
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      props: {
        name: record.name,
        attributes: attributes,
      },
    });
  }

  // We use IdResponse or a specific DTO for response.
  // For now using IdResponse as placeholder or creating a specific one if needed.
  // Actually the mapper usually maps to a full response DTO.
  // But for now I will leave this as generic as possible or just map to any.
  toResponse(entity: ProductTypeEntity): IdResponse {
    const props = entity.getPropsCopy();
    return new IdResponse(props.id);
  }
}
