import { Product } from '@chec/commerce.js/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IProductsState {
  data: any;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

const initialState: IProductsState = {
  data: 42,
  status: 'idle',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetched: (state, action: PayloadAction<Product[]>) => {
      state.data = 5;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userFetched } = userSlice.actions;

export default userSlice.reducer;
