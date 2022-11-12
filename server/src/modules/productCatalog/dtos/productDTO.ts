export interface ProductDTO {
  id: string;
  active: boolean;
  slug: string;
  name: string;
  description: string;
  quantity: number;
  mediaFileName: string;
  sku: string;
  price: number;
  categoryId: string;
}
