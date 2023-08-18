import mockApi from './mock';
import serverApi from './server';
import { ICategoriesApi, IProductsApi } from './types/types';

export interface Api {
  categories: ICategoriesApi;
  products: IProductsApi;
}
let api: Api;

if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'mock') {
  console.log('using mock api...');
  api = mockApi;
} else {
  console.log('using server api...');
  api = serverApi;
}

export { api };
