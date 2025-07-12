import { Price } from './price';

export interface CheckoutInfo {
  cart_id: string | null;

  line_items: CheckoutTokenLineItem[];
  total: Price;
}

export interface CheckoutTokenLineItem {
  id: string;
  product_id: string;
  name: string;
  image: string | null;
  description: string | null;
  quantity: number;
  price: Price;
  subtotal: Price;
}
