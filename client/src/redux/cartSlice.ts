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

export const emptyCart = createAsyncThunk('cart/empty', async (payload: void, thunkAPI) => {
  const { cart } = await commerce.cart.empty();
  return JSON.parse(JSON.stringify(cart));
});

export const removeFromCart = createAsyncThunk('cart/remove', async (productId: string, thunkAPI) => {
  const { cart } = await commerce.cart.remove(productId);
  return JSON.parse(JSON.stringify(cart));
});

export const updateCart = createAsyncThunk(
  'cart/update',
  async (payload: { productId: string; quantity: number }, thunkAPI) => {
    const { productId, quantity } = payload;
    const { cart } = await commerce.cart.update(productId, { quantity });
    return JSON.parse(JSON.stringify(cart));
  }
);
export const refreshCart = createAsyncThunk('cart/refresh', async (payload: void, thunkAPI) => {
  const cart = await commerce.cart.refresh();
  return JSON.parse(JSON.stringify(cart));
});

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
      state.data = action.payload;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(emptyCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(refreshCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { productsFetched } = cartSlice.actions;

export default cartSlice.reducer;
