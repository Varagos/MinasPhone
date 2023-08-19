export class FindProductsByIdsQuery {
  public readonly ids: string[];

  constructor(props: Partial<FindProductsByIdsQuery>) {
    Object.assign(this, props);
  }
}
