import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Mapper } from '../../../shared/infra/Mapper';
import { Category } from './../domain/Category';

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
    const commentOrError = Category.create(
      {
        slug: raw.slug,
        name: raw.name,
        parentId: raw.parent_id,
      },
      new UniqueEntityID(raw.id),
    );

    commentOrError.isFailure && console.log(commentOrError.getErrorValue());

    return commentOrError.getValue();
  }
}
