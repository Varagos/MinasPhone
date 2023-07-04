export type PaginatedRequest<T> = {
  limit: number;
  page: number;
} & T;

export type PaginatedResponse<T> = {
  count: number;
  limit: number;
  page: number;
  data: T[];
};
