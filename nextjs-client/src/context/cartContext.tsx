import { fetcher } from '@/api/server/common/fetcher';
import { CartItem } from '@/api/types/cart';
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from 'react';
import useSWR, { mutate } from 'swr';

type CartState = CartItem[];

export enum CartActions {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  SET_CART = 'SET_CART',
}

// Define the available actions
type CartAction =
  | { type: CartActions.ADD_ITEM; payload: CartItem }
  | { type: CartActions.REMOVE_ITEM; payload: string }
  | { type: CartActions.SET_CART; payload: any };

const CartContext = createContext<
  | {
      cart: CartState;
      addItemToCart: (item: CartItem) => void;
      removeItemFromCart: (id: string) => void;
    }
  | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case CartActions.ADD_ITEM:
      // Logic for adding item
      return state; // replace with new state
    case CartActions.REMOVE_ITEM:
      // Logic for removing item
      return state; // replace with new state
    default:
      return state;
  }
};

type CartProviderProps = {
  children: ReactNode;
};

// Cart provider component
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Fetch cart data using SWR
  const { data: cartData, error } = useSWR('/api/cart', fetcher);

  // Update cart state when cart data changes
  useEffect(() => {
    if (cartData) {
      dispatch({ type: CartActions.SET_CART, payload: cartData });
    }
  }, [cartData]);

  // Function to add an item to the cart
  const addItemToCart = (item: CartItem) => {
    dispatch({ type: CartActions.ADD_ITEM, payload: item });

    // Update cart data on the server using SWR mutation
    mutate('/api/cart', [...cart, item], false);
    fetch('/api/cart', {
      method: 'PUT',
      body: JSON.stringify([...cart, item]),
    }).then(() => mutate('/api/cart'));
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (itemId: string) => {
    dispatch({ type: CartActions.REMOVE_ITEM, payload: itemId });

    // Update cart data on the server using SWR mutation
    mutate(
      '/api/cart',
      cart.filter((item) => item.id !== itemId),
      false
    );
    fetch('/api/cart', {
      method: 'PUT',
      body: JSON.stringify(cart.filter((item) => item.id !== itemId)),
    }).then(() => mutate('/api/cart'));
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
