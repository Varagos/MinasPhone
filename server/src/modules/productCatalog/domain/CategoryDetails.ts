import { Result } from '../../../shared/core/Result';

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

  public static create(props: CategoryDetailsProps): Result<CategoryDetails> {
    return Result.ok<CategoryDetails>(new CategoryDetails(props));
  }
}
