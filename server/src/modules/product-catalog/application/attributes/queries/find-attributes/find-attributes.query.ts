import { IQuery } from '@nestjs/cqrs';
import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';

export class FindAttributesQuery extends PaginatedQueryBase {
  readonly name?: string;

  constructor(props: PaginatedParams<FindAttributesQuery>) {
    super(props);
    this.name = props.name;
  }
}
