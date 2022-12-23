import { DeepPartial } from 'typeorm';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID.js';
import { Category as PersistenceCategory } from '../../../../shared/infra/database/typeorm/models/index.js';
import { Mapper } from '../../../../shared/infra/Mapper.js';
import { Category } from '../domain/Category.js';

export class CategoryMap implements Mapper<Category> {
  public static toPersistence(
    category: Category,
  ): DeepPartial<PersistenceCategory> {
    return {
      id: category.id.toString(),
      slug: category.slug,
      name: category.name,
    };
  }

  public static toDomain(raw: any): Category {
    const categoryOrError = Category.create(
      {
        slug: raw.slug,
        name: raw.name,
        parentId: raw.parent_id,
      },
      new UniqueEntityID(raw.id),
    );

    categoryOrError.isFailure && console.log(categoryOrError.getErrorValue());

    return categoryOrError.getValue();
  }
}
