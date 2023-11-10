import { PaginatedRequest, PaginatedResponse } from './common';

// Define the shape of the cart item object
export type CartLineItem = {
  id: string;
  quantity: number;
  productId: string;
  productName: string;
  productPrice: number;
  productSlug: string;
  productImage: string;
};
export type Cart = {
  id: string;
  lineItems: CartLineItem[];
  createdAt: string;
  updatedAt: string;
  totalItems: number;
  subtotal: number;
};

export interface ICartApi {
  retrieveCart(): Promise<Cart>;
  clearCart(): Promise<Cart>;
  addToCart(productId: string, quantity: number): Promise<Cart>;
  removeFromCart(lineItemId: string): Promise<Cart>;
  updateLineItem(lineItemId: string, quantity: number): Promise<Cart>;
}
