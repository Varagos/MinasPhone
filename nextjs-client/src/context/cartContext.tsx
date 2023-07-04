import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of the cart item object
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = CartItem[];

export enum CartActions {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

// Define the available actions
type CartAction =
  | { type: CartActions.ADD_ITEM; payload: CartItem }
  | { type: CartActions.REMOVE_ITEM; payload: string };

const CartContext = createContext<
  { cart: CartState; dispatch: React.Dispatch<CartAction> } | undefined
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

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
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
