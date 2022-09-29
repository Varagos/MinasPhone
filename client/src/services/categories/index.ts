import { commerce } from './../../components/lib/commerce';
import { PaginationMeta } from '..';
import CommerceJSCategoriesService from './commercejs';
import MockCategoriesService from './mock';

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

const categoriesService: ICategoriesService =
  process.env.REACT_APP_ENVIRONMENT === 'mock'
    ? new MockCategoriesService()
    : new CommerceJSCategoriesService(commerce);

export { categoriesService };
