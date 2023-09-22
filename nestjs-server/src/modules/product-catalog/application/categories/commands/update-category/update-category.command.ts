export class UpdateCategoryCommand {
  public readonly id: string;

  public readonly slug?: string;

  public readonly name?: string;

  public readonly parentId: string | null;

  constructor(props: Partial<UpdateCategoryCommand>) {
    Object.assign(this, props);
  }
}
