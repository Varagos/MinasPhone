import { PaginationMeta } from '.';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  products: number;
  created: number;
  meta: any;
}

export interface CategoryCollection {
  data: Category[];
  meta: PaginationMeta;
}

// export class Categories {
//   list(params?: any): Promise<CategoryCollection> {}
//   retrieve(id: string, params?: { type: string }): Promise<Category> {}
// }
