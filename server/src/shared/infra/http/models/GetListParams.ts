type Field = string;
export type GetListSort = [Field, 'ASC' | 'DESC'];

// 0 indexed, 0 means first page
type Page = number;
// 0 indexed, 4 means 5 items per page
type PerPage = number;
export type GetListRange = [Page, PerPage];

export type GetListFilter = {
  [key: string]: string | number | boolean;
};

export interface GetListRequestDTO {
  sort?: GetListSort;

  range?: GetListRange;

  filter?: GetListFilter;
}
