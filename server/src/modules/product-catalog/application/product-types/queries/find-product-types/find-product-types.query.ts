import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';

export class FindProductTypesQuery extends PaginatedQueryBase {
  public readonly name?: string;

  constructor(props: PaginatedParams<FindProductTypesQuery>) {
    super(props);
    this.name = props.name;
  }
}
