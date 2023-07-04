import { Api } from '..';
import { CategoriesApi } from './categories';

const categoriesApi = new CategoriesApi();
const serverApi: Api = {
  useCategories: categoriesApi.useCategories.bind(categoriesApi),
  useCategory: categoriesApi.useCategory.bind(categoriesApi),
};
export default serverApi;
