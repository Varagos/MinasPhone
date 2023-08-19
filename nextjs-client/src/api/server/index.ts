import { Api } from '..';
import { CartApi } from './cart';
import { CategoriesApi } from './categories';
import ProductsApi from './products';

const categoriesApi = new CategoriesApi();
const productsApi = new ProductsApi();
const cartApi = new CartApi();
const serverApi: Api = {
  categories: categoriesApi,
  products: productsApi,
  cart: cartApi,
};
export default serverApi;
