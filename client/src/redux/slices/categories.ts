import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../services/categories';
import actions from '../actions';
import { AsyncThunkConfig } from '../store';

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
// const fetchCategories = async () => {
//   const result = await commerce.categories.list();
//   // console.log('categories:', result);
//   dispatch(categoriesFetched(result.data));
// };
export const fetchCategories = createAsyncThunk<Category[], void, AsyncThunkConfig>(
  actions.categories.FETCH_ALL,
  async (_, thunkAPI) => {
    const { categories } = thunkAPI.extra.services;
    const data = await categories.fetchAll();
    return data.data;
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesFetched: (state, action: PayloadAction<Category[]>) => {
      state.data = JSON.parse(JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

// Action creators are generated for each case reducer function
export const { categoriesFetched } = categoriesSlice.actions;

export default categoriesSlice.reducer;
