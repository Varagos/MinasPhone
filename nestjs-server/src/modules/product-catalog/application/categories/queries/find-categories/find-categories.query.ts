import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';

export class FindCategoriesQuery extends PaginatedQueryBase {
  public readonly slug?: string;

  public readonly name?: string;

  public readonly parentId?: string;

  constructor(props: PaginatedParams<FindCategoriesQuery>) {
    super(props);
    this.slug = props.slug;
    this.name = props.name;
    this.parentId = props.parentId;
  }
}
