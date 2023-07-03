import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../services/products';
import actions from '../actions';
import { AsyncThunkConfig } from '../store';

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

// const fetchProducts = async (slug = null) => {
//   // console.log('fetching products with slug:', slug);

//   setProductsLoading(true);
//   let data: Product[];
//   if (!slug) {
//     ({ data } = await commerce.products.list());
//   } else {
//     ({ data } = await commerce.products.list({
//       category_slug: [slug],
//     }));
//   }

//   data = data || [];
//   setProducts(data);
//   setProductsLoading(false);
//   dispatch(productsFetched(JSON.parse(JSON.stringify(data))));
// };

export const fetchProducts = createAsyncThunk<Product[], void, AsyncThunkConfig>(
  actions.products.FETCH_ALL,
  async (_, thunkAPI) => {
    const { products } = thunkAPI.extra.services;
    const data = await products.fetchAll();
    return data;
  }
);

export const fetchProductsByCategorySlug = createAsyncThunk<Product[], string, AsyncThunkConfig>(
  actions.products.FETCH_ALL_BY_CAT_SLUG,
  async (categorySlug, thunkAPI) => {
    const { products } = thunkAPI.extra.services;
    const data = await products.fetchAllByCategorySlug(categorySlug);
    return data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsFetched: (state, action: PayloadAction<Product[]>) => {
      state.data = JSON.parse(JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = 'failed';
    });

    builder.addCase(fetchProductsByCategorySlug.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchProductsByCategorySlug.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProductsByCategorySlug.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

// Action creators are generated for each case reducer function
export const { productsFetched } = productsSlice.actions;

export default productsSlice.reducer;
