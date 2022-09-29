import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commerce } from '../../components/lib/commerce';
import { Cart } from '../../types/cart';
import actions from '../actions';
import { AsyncThunkConfig } from '../store';

export interface ICheckoutState {
  data?: Cart;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

const initialState: ICheckoutState = {
  status: 'idle',
  error: '',
};

export const fetchCart = createAsyncThunk<Cart, void, AsyncThunkConfig>(actions.cart.FETCH, async (_, thunkAPI) => {
  const { cart: cartService } = thunkAPI.extra.services;
  const cart = await cartService.fetch();
  return cart;
});

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {},
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
  },
});

// Action creators are generated for each case reducer function
// export const { } = checkoutSlice.actions;

export default checkoutSlice.reducer;
