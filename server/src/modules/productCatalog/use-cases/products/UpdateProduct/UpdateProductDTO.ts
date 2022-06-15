export interface UpdateProductDTO {
  id: string;
  active: boolean;
  permalink: string;
  name: string;
  description: string;
  quantity: number;
  media: string;
  sku: string;
  price: number;
}
