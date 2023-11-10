export class FindOrderBySlugQuery {
  public readonly slug: string;

  constructor(props: Partial<FindOrderBySlugQuery>) {
    Object.assign(this, props);
  }
}
