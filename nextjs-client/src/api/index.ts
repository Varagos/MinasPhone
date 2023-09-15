import mockApi from './mock';
import serverApi from './server';
import { ICartApi } from './types/cart';
import { ICategoriesApi, IOrdersApi, IProductsApi } from './types/types';

export interface Api {
  categories: ICategoriesApi;
  products: IProductsApi;
  cart: ICartApi;
  orders: IOrdersApi;
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
