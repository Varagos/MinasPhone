export class UpdateProductCommand {
  public readonly id: string;

  public readonly name?: string;

  public readonly description?: string;

  public readonly quantity?: number;

  public readonly price?: number;

  public readonly active?: boolean;

  public readonly sku?: string;

  public readonly categoryId?: string;

  public readonly imageUri: string;

  public readonly productTypeId?: string;

  public readonly attributeValues?: Record<
    string,
    {
      valueId: string | null;
      textValue: string | null;
      numericValue: number | null;
      booleanValue: boolean | null;
    }[]
  >;

  constructor(props: Partial<UpdateProductCommand>) {
    Object.assign(this, props);
  }
}
