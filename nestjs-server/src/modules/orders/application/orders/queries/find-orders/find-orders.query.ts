import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';

export class FindOrdersQuery extends PaginatedQueryBase {
  public readonly email?: string;

  public readonly phoneNumber?: string;

  public readonly firstName?: string;

  public readonly lastName?: string;

  public readonly status?: string;

  constructor(props: PaginatedParams<FindOrdersQuery>) {
    super(props);
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.status = props.status;
  }
}
