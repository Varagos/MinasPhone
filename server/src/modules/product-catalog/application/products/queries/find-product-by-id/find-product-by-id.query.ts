export class FindProductByIdQuery {
  public readonly id: string;

  constructor(props: Partial<FindProductByIdQuery>) {
    Object.assign(this, props);
  }
}
