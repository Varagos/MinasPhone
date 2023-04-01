import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../services/products';

export interface IProductState {
  data?: Product;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

const initialState: IProductState = {
  status: 'idle',
  error: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productSelected: (state, action: PayloadAction<Product>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { productSelected } = productSlice.actions;

export default productSlice.reducer;
