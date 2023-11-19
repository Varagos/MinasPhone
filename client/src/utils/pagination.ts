export const DEFAULT_ITEMS_PER_PAGE = 12;

type Result = {
  initialPage: number;
  totalPages: number;
  itemsPerPage: number;
};
export const parseUrlRange = (
  range: [number, number] | [] | undefined,
  total: number
): Result => {
  if (range === undefined || range === null || range.length === 0) {
    return {
      initialPage: 1,
      totalPages: Math.ceil(total / DEFAULT_ITEMS_PER_PAGE),
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    };
  }

  const ITEMS_PER_PAGE = range[1] - range[0] + 1;
  const start = range[0];

  const initialPage = Math.floor(start / ITEMS_PER_PAGE) + 1;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  return {
    initialPage,
    totalPages,
    itemsPerPage: ITEMS_PER_PAGE,
  };
};
