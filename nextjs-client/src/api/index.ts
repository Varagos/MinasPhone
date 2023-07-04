import mockApi from './mock';
import serverApi from './server';
import { ICategoriesApi } from './types';

export type Api = ICategoriesApi;
let api: Api;

if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'mock') {
  console.log('using mock api...');
  api = mockApi;
} else {
  console.log('using server api...');
  api = serverApi;
}

export { api };
