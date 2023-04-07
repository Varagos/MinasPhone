export class CreateCategoryCommand {
  constructor(
    public readonly slug: string,
    public readonly name: string,
    public readonly parentId?: string,
  ) {}
}
