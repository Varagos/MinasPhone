import { Mapper } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '@modules/product-catalog/domain/category.entity';
import {
  CategoryModel,
  categorySchema,
} from '../database/category.repository.js';
import { CategoryResponseDto } from '@modules/product-catalog/application/categories/dtos/category.response.dto';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class CategoryMapper
  implements Mapper<CategoryEntity, CategoryModel, CategoryResponseDto>
{
  toPersistence(entity: CategoryEntity): CategoryModel {
    const copy = entity.getPropsCopy();
    const record: CategoryModel = {
      id: copy.id,
      created_at: copy.createdAt,
      updated_at: copy.updatedAt,
      slug: copy.slug,
      name: copy.name,
      parent_id: copy.parentId,
    };
    return categorySchema.parse(record);
  }

  toDomain(record: CategoryModel): CategoryEntity {
    const entity = new CategoryEntity({
      id: record.id,
      createdAt: new Date(record.created_at),
      updatedAt: new Date(record.updated_at),
      props: {
        name: record.name,
        slug: record.slug,
        parentId: record.parent_id ?? undefined,
      },
    });
    return entity;
  }

  toResponse(entity: CategoryEntity): CategoryResponseDto {
    const props = entity.getPropsCopy();
    const response = new CategoryResponseDto(entity);
    response.name = props.name;
    response.slug = props.slug;
    response.parentId = props.parentId;
    return response;
  }

  /* ^ Data returned to the user is whitelisted to avoid leaks.
     If a new property is added, like password or a
     credit card number, it won't be returned
     unless you specifically allow this.
     (avoid blacklisting, which will return everything
      but blacklisted items, which can lead to a data leak).
  */
}
