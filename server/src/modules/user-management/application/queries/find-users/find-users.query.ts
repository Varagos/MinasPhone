import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';

export class FindUsersQuery extends PaginatedQueryBase {
  public readonly email?: string;

  constructor(props: PaginatedParams<FindUsersQuery>) {
    super(props);
    this.email = props.email;
  }
}
