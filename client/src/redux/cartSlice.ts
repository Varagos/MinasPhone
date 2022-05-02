import { Cart } from '@chec/commerce.js/types/cart';
import { Product } from '@chec/commerce.js/types/product';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commerce } from '../components/lib/commerce';

export interface ICartState {
  data?: Cart;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

const initialState: ICartState = {
  status: 'idle',
  error: '',
};

export const fetchCart = createAsyncThunk('cart/fetch', async (payload: void, thunkAPI) => {
  const cart = await commerce.cart.retrieve();

  return JSON.parse(JSON.stringify(cart));
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (payload: { productId: string; quantity: number }, thunkAPI) => {
    const { productId, quantity } = payload;
    const { cart } = await commerce.cart.add(productId, quantity);
    return JSON.parse(JSON.stringify(cart));
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    productsFetched: (state, action: PayloadAction<Product[]>) => {
      state.data = JSON.parse(JSON.stringify(action.payload));
    },
    addedToCart: (state, action: any) => {
      // pass
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      // Add user to the state array
      state.data = action.payload;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      // Add user to the state array
      state.data = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { productsFetched } = cartSlice.actions;

export default cartSlice.reducer;
