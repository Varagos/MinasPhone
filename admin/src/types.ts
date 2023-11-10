import { RaRecord, Identifier } from 'react-admin';

export type ThemeName = 'light' | 'dark';

export interface Category extends RaRecord {
  name: string;
}

export interface Product extends RaRecord {
  category_id: Identifier;
  description: string;
  height: number;
  image: string;
  price: number;
  reference: string;
  stock: number;
  thumbnail: string;
  width: number;
}

export interface Customer extends RaRecord {
  first_name: string;
  last_name: string;
  address: string;
  stateAbbr: string;
  city: string;
  zipcode: string;
  avatar: string;
  birthday: string;
  first_seen: string;
  last_seen: string;
  has_ordered: boolean;
  latest_purchase: string;
  has_newsletter: boolean;
  groups: string[];
  nb_commands: number;
  total_spent: number;
}

export type OrderStatus = 'pending' | 'Completed' | 'Cancelled';

export interface OrderItem {
  productId: string;
  unitPrice: number;
  quantity: number;
  productName: string;
}

export interface Order extends RaRecord {
  status: OrderStatus;
  //   basket: BasketItem[];
  //   date: Date;
  total: number;
  items: OrderItem[];

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface BasketItem {
  product_id: Identifier;
  quantity: number;
}

export interface Invoice extends RaRecord {}

export type ReviewStatus = 'accepted' | 'pending' | 'rejected';

export interface Review extends RaRecord {
  date: Date;
  status: ReviewStatus;
  customer_id: Identifier;
  product_id: Identifier;
}

declare global {
  interface Window {
    restServer: any;
  }
}
