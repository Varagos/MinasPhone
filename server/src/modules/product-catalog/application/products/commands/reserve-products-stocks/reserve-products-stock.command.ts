export class ReserveProductsStockCommand {
  public readonly value: Array<{
    readonly productId: string;
    readonly quantity: number;
  }>;

  public readonly causationOrderId: string;

  constructor(props: ReserveProductsStockCommand) {
    Object.assign(this, props);
  }
}
