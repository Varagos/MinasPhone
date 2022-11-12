export interface CartDTO {
  id: string;
  items: {
    productId: string;
    title: string;
    unitPrice: number;
    quantity: number;
  }[];
}
