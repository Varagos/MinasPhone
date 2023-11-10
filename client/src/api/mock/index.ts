import { Api } from '..';
import { CategoriesApi } from './categories';
import { ProductsApi } from './products';

const categoriesApi = new CategoriesApi();
const productsApi = new ProductsApi();
const cart = undefined as any;
const orders = undefined as any;
const mockApi: Api = {
  categories: categoriesApi,
  products: productsApi,
  cart,
  orders,
};
export default mockApi;
