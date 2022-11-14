import { Result } from '@shared/core/Result';

interface CategoryDetailsProps {
  id: string;
  slug: string;
  name: string;
  parent_id?: string;
}

/**
 * @desc Read model for Category
 */

export class CategoryDetails {
  props: CategoryDetailsProps;

  private constructor(props: CategoryDetailsProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get slug() {
    return this.props.slug;
  }

  get name() {
    return this.props.name;
  }

  get parentId() {
    return this.props.parent_id;
  }
  public static create(props: CategoryDetailsProps): Result<CategoryDetails> {
    return Result.ok<CategoryDetails>(new CategoryDetails(props));
  }
}
