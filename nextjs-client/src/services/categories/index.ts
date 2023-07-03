import { commerce } from '../../lib/commerce';
import { PaginationMeta } from '..';
import CommerceJSCategoriesService from './commercejs';
import MockCategoriesService from './mock';
import CategoriesService from './server';

export interface Category {
  id: string;
  parent_id?: string | null;
  slug: string;
  name: string;
  description: string | null;
  products: number;
  created: number;
  updated?: number;
  assets?: any[];
  children?: any[];
  meta: any;
}

export interface CategoryCollection {
  data: Category[];
  meta: PaginationMeta;
}

export interface ICategoriesService {
  fetchAll: () => Promise<CategoryCollection>;
}

const services: { [env: string]: () => any } = {
  mock: () => new MockCategoriesService(),
  commercejs: () => new CommerceJSCategoriesService(commerce),
  server: () => new CategoriesService(),
};

const categoriesService: ICategoriesService = process.env.NEXT_PUBLIC_ENVIRONMENT
  ? services[process.env.NEXT_PUBLIC_ENVIRONMENT]()
  : new MockCategoriesService();

export { categoriesService };
