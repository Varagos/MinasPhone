import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commerce } from '../../components/lib/commerce';
import { Cart } from '../../types/cart';
import actions from '../actions';
import { AsyncThunkConfig } from '../store';

export interface ICartState {
  data?: Cart;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

const initialState: ICartState = {
  status: 'idle',
  error: '',
};

export const fetchCart = createAsyncThunk<Cart, void, AsyncThunkConfig>(actions.cart.FETCH, async (_, thunkAPI) => {
  const { cart: cartService } = thunkAPI.extra.services;
  const cart = await cartService.fetch();
  return cart;
});

export const addToCart = createAsyncThunk<Cart, { productId: string; quantity: number }, AsyncThunkConfig>(
  actions.cart.ADD_ITEM,
  async (payload, thunkAPI) => {
    const { productId, quantity } = payload;

    const { cart: cartService } = thunkAPI.extra.services;
    const cart = await cartService.addItemToCart(productId, quantity);
    return cart;
  }
);

export const emptyCart = createAsyncThunk<Cart, void, AsyncThunkConfig>(actions.cart.EMPTY, async (_, thunkAPI) => {
  const { cart: cartService } = thunkAPI.extra.services;
  const cart = await cartService.empty();
  return cart;
});

export const removeFromCart = createAsyncThunk<Cart, string, AsyncThunkConfig>(
  actions.cart.REMOVE_ITEM,
  async (productId, thunkAPI) => {
    const { cart: cartService } = thunkAPI.extra.services;
    const cart = await cartService.removeFromCart(productId);
    return cart;
  }
);

export const updateCart = createAsyncThunk<Cart, { productId: string; quantity: number }, AsyncThunkConfig>(
  actions.cart.UPDATE_ITEM,
  async (payload, thunkAPI) => {
    const { productId, quantity } = payload;
    const { cart: cartService } = thunkAPI.extra.services;
    const cart = await cartService.updateItem(productId, quantity);
    return cart;
  }
);

export const refreshCart = createAsyncThunk<Cart, void, AsyncThunkConfig>(actions.cart.REFRESH, async (_, thunkAPI) => {
  const { cart: cartService } = thunkAPI.extra.services;
  const cart = await cartService.refresh();
  return cart;
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addedToCart: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      if (state.data?.total_items) state.data.total_items++;
      const { productId, quantity } = action.payload;
      const lineItem = { id: productId, quantity: quantity } as any;
      state.data?.line_items.push(lineItem);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchCart.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addToCart.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });

    builder.addCase(emptyCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(emptyCart.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(emptyCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(removeFromCart.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });

    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateCart.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });

    builder.addCase(refreshCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(refreshCart.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(refreshCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  },
});

// Action creators are generated for each case reducer function
export const { addedToCart } = cartSlice.actions;

export default cartSlice.reducer;
