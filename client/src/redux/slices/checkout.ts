import { CheckoutCapture } from './../../types/checkout-capture.d';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import actions from '../actions';
import { AsyncThunkConfig } from '../store';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';

export interface ICheckoutState {
  response?: CheckoutCaptureResponse;
  token: CheckoutToken | null;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

const initialState: ICheckoutState = {
  token: null,
  status: 'idle',
  error: '',
};

export const generateCheckoutToken = createAsyncThunk<CheckoutToken, { cartId: string }, AsyncThunkConfig>(
  actions.checkout.GENERATE_TOKEN,
  async (payload, thunkAPI) => {
    const { cartId } = payload;
    const { checkout } = thunkAPI.extra.services;
    const checkoutToken = await checkout.generateToken(cartId, { type: 'cart' });
    return checkoutToken;
  }
);

export const captureCheckoutOrder = createAsyncThunk<
  CheckoutCaptureResponse,
  { checkoutTokenId: string; newOrder: CheckoutCapture },
  AsyncThunkConfig
>(actions.checkout.CAPTURE_ORDER, async (payload, thunkAPI) => {
  const { checkoutTokenId, newOrder } = payload;
  const { checkout } = thunkAPI.extra.services;
  const checkoutCaptureResponse = await checkout.captureCheckout(checkoutTokenId, newOrder);

  return checkoutCaptureResponse;
});

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generateCheckoutToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(generateCheckoutToken.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(generateCheckoutToken.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });

    builder.addCase(captureCheckoutOrder.fulfilled, (state, action) => {
      state.response = action.payload;
    });
    builder.addCase(captureCheckoutOrder.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(captureCheckoutOrder.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  },
});

// Action creators are generated for each case reducer function
// export const { } = checkoutSlice.actions;

export default checkoutSlice.reducer;
