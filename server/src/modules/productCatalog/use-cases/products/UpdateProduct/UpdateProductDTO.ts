export interface UpdateProductDTO {
  id: string;
  active: boolean;
  slug: string;
  name: string;
  description: string;
  quantity: number;
  mediaFileName: string;
  sku: string;
  price: number;
  newImageUploaded: boolean;
}
