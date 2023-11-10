import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';

export class FindProductsQuery extends PaginatedQueryBase {
  public readonly slug?: string;

  public readonly categoryId?: string;

  public readonly name?: string;

  constructor(props: PaginatedParams<FindProductsQuery>) {
    super(props);
    this.slug = props.slug;
    this.categoryId = props.categoryId;
    this.name = props.name;
  }
}
