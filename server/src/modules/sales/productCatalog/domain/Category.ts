import { Result } from '@shared/core/Result';
import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

interface CategoryProps {
  slug: string;
  name: string;
  parentId?: string;
}

export class Category extends AggregateRoot<CategoryProps> {
  private constructor(props: CategoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get categoryId(): any {
    return this._id;
  }

  get slug(): string {
    return this.props.slug;
  }
  get name(): string {
    return this.props.name;
  }

  public static create(
    props: CategoryProps,
    id?: UniqueEntityID,
  ): Result<Category> {
    // TODO validations

    const isNewCategory = !!id === false;
    const defaultProps = {
      slug: props.slug,
      name: props.name,
      parentId: props.parentId,
    };
    const category = new Category(defaultProps, id);

    if (isNewCategory) {
      // domain event
    }
    return Result.ok<Category>(category);
  }
}
