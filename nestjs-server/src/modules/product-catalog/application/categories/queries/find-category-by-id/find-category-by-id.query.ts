export class FindCategoryByIdQuery {
  public readonly id: string;

  constructor(props: Partial<FindCategoryByIdQuery>) {
    Object.assign(this, props);
  }
}
