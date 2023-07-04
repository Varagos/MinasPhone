import { ICartApi, CartItem } from '../types/cart';

export class CartApi implements ICartApi {
  private data: CartItem[] = [];

  useCart() {
    return {
      cart: this.data,
      isLoading: false, // Set to true if you have async logic to fetch cart data
      isError: false, // Set to true if there's an error while fetching cart data
    };
  }

  addItemToCart(item: CartItem) {
    this.data.push(item);
  }

  removeItemFromCart(id: string) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }
}
