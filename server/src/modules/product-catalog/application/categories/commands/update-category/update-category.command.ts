export class UpdateCategoryCommand {
  public readonly id: string;

  public readonly slug?: string;

  public readonly name?: string;

  public readonly parentId: string | null;

  public readonly sortOrder?: number;

  constructor(props: Partial<UpdateCategoryCommand>) {
    Object.assign(this, props);
  }
}
