export class CreateProductTypeCommand {
  public readonly name: string;
  public readonly attributes: Array<{
    attributeId: string;
    config: {
      isRequired: boolean;
      isFilterable: boolean;
      isSearchable: boolean;
      displayOrder: number | null;
    };
  }>;

  constructor(props: CreateProductTypeCommand) {
    Object.assign(this, props);
  }
}
