export class ReduceProductsStockCommand {
  public readonly reduceBy: Array<{
    readonly productId: string;
    readonly quantity: number;
  }>;

  constructor(props: ReduceProductsStockCommand) {
    Object.assign(this, props);
  }
}
