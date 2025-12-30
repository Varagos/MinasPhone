export class CreateProductCommand {
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly quantity: number;
  public readonly active: boolean;
  public readonly imageUri: string;
  public readonly sku: string;
  public readonly categoryId: string;
  public readonly attributeValues: Record<
    string,
    {
      valueId: string | null;
      textValue: string | null;
      numericValue: number | null;
      booleanValue: boolean | null;
    }[]
  >;

  public readonly productTypeId: string | undefined;
  constructor(props: CreateProductCommand) {
    Object.assign(this, props);
  }
}
