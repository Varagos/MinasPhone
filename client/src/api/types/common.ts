export type PaginatedRequest<T, F extends Record<string, string>> = {
  range: [number, number];
  order?: [string, 'ASC' | 'DESC'];
  filter?: F; // Record<string, string>;
} & T;

export type PaginatedResponse<T> = {
  // Total number of items
  count: number;
  // Number of items per page
  limit: number;
  // Current page
  page: number;
  data: T[];
};
