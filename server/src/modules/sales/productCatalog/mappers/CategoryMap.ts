import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID.js';
import { Mapper } from '../../../../shared/infra/Mapper.js';
import { Category } from '../domain/Category.js';

export class CategoryMap implements Mapper<Category> {
  public static toPersistence(category: Category): any {
    return {
      id: category.id.toString(),
      slug: category.slug,
      name: category.name,
      //   parent_id: comment.parentCommentId
      //     ? comment.parentCommentId.id.toString()
      //     : null,
      parent_id: null,
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
