'use client';
import { api } from '@/api';
import { Cart } from '@/api/types/cart';
import React, { createContext, useContext, useEffect, useState } from 'react';

type CartContextType = {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
};

export const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => null,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  async function fetchCart() {
    const cart = await api.cart.retrieveCart();
    console.log(`Fetching cart: `, cart);
    setCart(cart);
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
