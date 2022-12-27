import { Maybe } from '../../../../shared/core/Maybe.js';
import { GetListRequestDTO } from '../../../../shared/infra/http/models/GetListParams.js';
import { Order } from '../domain/Order.js';
import { OrderDetails } from '../domain/OrderDetails.js';

export interface IOrderRepo {
  getAll(params: GetListRequestDTO): Promise<OrderDetails[]>;
  getById(id: string): Promise<Maybe<Order>>;
  getOneById(id: string): Promise<Maybe<OrderDetails>>;
  save(order: Order): Promise<void>;
  updateStatus(order: Order): Promise<void>;
  delete(id: string): Promise<void>;
}
