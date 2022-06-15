import { Category } from '@chec/commerce.js/types/category';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICategoriesState {
  data: Category[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

const initialState: ICategoriesState = {
  data: [],
  status: 'idle',
  error: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesFetched: (state, action: PayloadAction<Category[]>) => {
      state.data = JSON.parse(JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { categoriesFetched } = categoriesSlice.actions;

export default categoriesSlice.reducer;
