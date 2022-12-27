import { OrderStatusType } from '../../../../shared/infra/database/typeorm/models/Order.js';

export interface OrderDTO {
  id: string;
  items: {
    productId: string;
    unitPrice: number;
    quantity: number;
    productName: string;
  }[];
  status: OrderStatusType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  total: number;
  date: Date;
}
