export class CreateProductCommand {
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly quantity: number;
  public readonly active: boolean;
  public readonly imageUri: string;
  public readonly sku: string;
  public readonly categoryId: string;
  constructor(props: CreateProductCommand) {
    Object.assign(this, props);
  }
}
