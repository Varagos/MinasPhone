import { GetListRequestDTO } from '../../../../../../shared/infra/http/models/GetListParams.js';

/**
 * If stock is provided, it will be used to filter products with stock equal to the provided value.
 * Otherwise, stock_lt and stock_gt will be used to filter products with stock less than or greater than the provided values.
 */
type StockFilter = {
  stock_lt: number;
  stock_gt: number;
  stock: number;
};

type SalesFilter = {
  sales_lte: number;
  sales_gt: number;
  sales: number;
};
export type GetProductListRequestDTO = GetListRequestDTO;
