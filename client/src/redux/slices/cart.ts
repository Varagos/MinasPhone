import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
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

const lineItemFromProduct = (productId: string, quantity: number) => {
  const lineItem = { id: productId, productId: productId, quantity: quantity } as any;
  return lineItem;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addedToCart: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      // TODO Update cart & line_item money
      console.log('addedToCart', action.payload);
      const { productId, quantity } = action.payload;

      const lineItem = { id: productId, quantity: quantity } as any;
      if (!state.data)
        state.data = {
          id: 'temp-id',
          line_items: [],
          created: Date.now(),
          updated: Date.now(),
          expires: Date.now() + 20000,
        } as unknown as Cart;
      if (!state.data?.line_items) state.data!.line_items = [];
      state.data.line_items.push(lineItem);
      state.data!.total_items++;
      if (!state.data.line_items.some((item) => item.product_id === productId)) {
        state.data!.total_unique_items++;
      }
    },
    cartUpdated: (state, action: PayloadAction<{ lineItemId: string; quantity: number }>) => {
      // TODO Update cart & line_item money
      if (!state.data) return;
      const { lineItemId, quantity } = action.payload;
      console.log('lineItemId', lineItemId);
      const lineItemIndex = state.data.line_items.findIndex((item) => item.id === lineItemId);
      if (lineItemIndex < 0) throw new Error('Line item not found');
      const lineItem = state.data.line_items[lineItemIndex];

      const previousLineItemQuantity = lineItem?.quantity;

      const dif = quantity - previousLineItemQuantity!;
      state.data.total_items += dif;
      if (quantity === 0) {
        state.data.line_items.splice(lineItemIndex, 1);
        state.data.total_unique_items--;
      } else {
        state.data.line_items[lineItemIndex].quantity = quantity;
      }
    },
    cartItemRemoved: (state, action: PayloadAction<{ lineItemId: string }>) => {
      // TODO Update cart & line_item money
      if (!state.data) return;
      const { lineItemId } = action.payload;
      const lineItemIndex = state.data.line_items.findIndex((item) => item.id === lineItemId);

      const lineItem = state.data.line_items[lineItemIndex];
      const quantity = lineItem.quantity;
      state.data.total_items -= quantity;
      state.data.line_items.splice(lineItemIndex, 1);
      state.data.total_unique_items--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
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
      state.status = 'success';
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
      state.status = 'success';
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
      state.status = 'success';
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
      state.status = 'success';
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
      state.status = 'success';
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
export const { addedToCart, cartUpdated, cartItemRemoved } = cartSlice.actions;

export default cartSlice.reducer;
