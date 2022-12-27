import { OrderStatusType } from '../../../../../shared/infra/database/typeorm/models/Order.js';

export interface UpdateOrderStatusDTO {
  id: string;
  status: OrderStatusType;
}
