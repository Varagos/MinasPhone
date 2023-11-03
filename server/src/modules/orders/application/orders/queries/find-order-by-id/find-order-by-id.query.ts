export class FindOrderByIdQuery {
  public readonly id: string;

  constructor(props: Partial<FindOrderByIdQuery>) {
    Object.assign(this, props);
  }
}
