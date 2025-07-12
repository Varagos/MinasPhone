import { RaRecord } from 'react-admin';
import { ResponseBase } from './base';

export interface OrderLineItemResponseDTO {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  itemPrice: number;
  quantity: number;
  totalPrice: number;
}

export enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  // Paid = 'paid',
  // Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}

export interface OrderResponseDto extends ResponseBase {
  slug: string;
  status: OrderStatus;
  lineItems: OrderLineItemResponseDTO[];
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  total: number;
}
