import { PaginatedRequest, PaginatedResponse } from './common';

// Define the shape of the cart item object
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export interface ICartApi {
  useCart: () => {
    cart: CartItem[] | null;
    isLoading: boolean;
    isError: any;
  };
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string) => void;
}
