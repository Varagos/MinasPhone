import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';

export class FindProductsByCategorySlugQuery extends PaginatedQueryBase {
  public readonly slug: string;

  constructor(props: PaginatedParams<FindProductsByCategorySlugQuery>) {
    super(props);
    this.slug = props.slug;
  }
}
