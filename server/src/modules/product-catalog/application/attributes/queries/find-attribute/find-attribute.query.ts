import { IQuery } from '@nestjs/cqrs';

export class FindAttributeQuery implements IQuery {
  public readonly attributeId: string;
  constructor(props: { attributeId: string }) {
    this.attributeId = props.attributeId;
  }
}
