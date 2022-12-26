export interface OrderDTO {
  id: string;
  items: {
    productId: string;
    unitPrice: number;
    quantity: number;
  }[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
