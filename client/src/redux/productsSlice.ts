import { Product } from '@chec/commerce.js/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IProductsState {
  data: Product[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

const initialState: IProductsState = {
  data: [],
  status: 'idle',
  error: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsFetched: (state, action: PayloadAction<Product[]>) => {
      state.data = JSON.parse(JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { productsFetched } = productsSlice.actions;

export default productsSlice.reducer;
