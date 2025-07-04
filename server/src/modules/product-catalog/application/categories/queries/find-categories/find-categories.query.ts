import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';

export class FindCategoriesQuery extends PaginatedQueryBase {
  public readonly id?: string | string[];

  public readonly slug?: string;

  public readonly name?: string;

  public readonly parentId?: string;

  constructor(props: PaginatedParams<FindCategoriesQuery>) {
    super(props);
    this.id = props.id;
    this.slug = props.slug;
    this.name = props.name;
    this.parentId = props.parentId;
  }
}
