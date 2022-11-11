export interface CreateProductDTO {
  active: boolean;
  slug: string;
  name: string;
  description: string;
  quantity: number;
  // media: string;
  mediaFileName: string;
  sku: string;
  price: number;
}
