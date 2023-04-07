/**
 * @desc Read model for Product
 */

export class ProductDetails {
  public id: string;

  public active: boolean;

  public slug: string;

  public name: string;

  public description: string;

  public quantity: number;

  public mediaFileName: string;

  public sku: string;

  public price: number;

  public categoryId: string;

  constructor(props: Partial<ProductDetails>) {
    Object.assign(this, props);
  }
}
