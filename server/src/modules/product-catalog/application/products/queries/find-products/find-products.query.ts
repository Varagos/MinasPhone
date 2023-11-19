import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';

export class FindProductsQuery extends PaginatedQueryBase {
  public readonly slug?: string;

  public readonly categoryId?: string;

  public readonly name?: string;

  public readonly categorySlug?: string;

  public readonly price_gte?: number;

  public readonly price_lte?: number;

  constructor(props: PaginatedParams<FindProductsQuery>) {
    super(props);
    this.slug = props.slug;
    this.categoryId = props.categoryId;
    this.name = props.name;
    this.categorySlug = props.categorySlug;
    this.price_gte = props.price_gte;
    this.price_lte = props.price_lte;
  }
}
