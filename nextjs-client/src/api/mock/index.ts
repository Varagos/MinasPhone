import { Api } from '..';
import { CategoriesApi } from './categories';
import { ProductsApi } from './products';

const categoriesApi = new CategoriesApi();
const productsApi = new ProductsApi();
const mockApi: Api = {
  useCategories: categoriesApi.useCategories.bind(categoriesApi),
  useCategory: categoriesApi.useCategory.bind(categoriesApi),
  useProducts: productsApi.useProducts.bind(productsApi),
  useProduct: productsApi.useProduct.bind(productsApi),
};
export default mockApi;
