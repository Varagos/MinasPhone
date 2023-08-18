import { Api } from '..';
import { CategoriesApi } from './categories';
import ProductsApi from './products';

const categoriesApi = new CategoriesApi();
const productsApi = new ProductsApi();
const serverApi: Api = {
  products: productsApi,
  categories: categoriesApi,
};
export default serverApi;
