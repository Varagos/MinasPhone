import { Api } from '..';
import { CategoriesApi } from './categories';

const categoriesApi = new CategoriesApi();
const mockApi: Api = {
  useCategories: categoriesApi.useCategories.bind(categoriesApi),
  useCategory: categoriesApi.useCategory.bind(categoriesApi),
};
export default mockApi;
