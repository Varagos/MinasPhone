export interface CartDTO {
  id: string;
  items: {
    productId: string;
    title: string;
    unitPrice: number;
    quantity: number;
    media: {
      src: string;
    };
  }[];
  createdAt?: number;
  updatedAt?: number;
  subTotal: number;
}
