export interface OrderDTO {
  id: string;
  items: {
    productId: string;
    unitPrice: number;
    quantity: number;
  }[];
}
