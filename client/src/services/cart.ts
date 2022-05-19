import { Cart as CartType } from '../types/cart';
import { Asset, Price } from './products';
export interface SelectedVariant {
  group_id: string;
  group_name: string;
  option_id: string;
  option_name: string;
  price: Price;
}
export interface Variant {
  id: string;
  sku: string | null;
  description: string | null;
  inventory: number | null;
  price: Price | null;
  is_valid: boolean;
  invalid_reason_code: string | null;
  meta: any;
  created?: number | undefined;
  updated?: number | undefined;
  options: { [name: string]: string };
  assets: Asset[];
}

export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  product_id: string;
  product_name: string;
  product_meta: any;
  sku: string;
  permalink: string;
  media: any; // todo
  selected_options: SelectedVariant[];
  variant?: Variant;
  price: Price;
  line_total: Price;
  image: Asset | null;
}

export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface AddUpdateResponse {
  success: boolean;
  event: string;
  line_item_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  line_total: Price;
  cart: CartType;
  image: Asset | null;
}

export interface RemoveResponse {
  success: boolean;
  event: string;
  line_item_id: string;
  cart: CartType;
}

export interface DeleteResponse {
  success: boolean;
  event: string;
  cart_id: string;
}

export interface EmptyResponse {
  success: boolean;
  event: string;
  cart: CartType;
}

export class Cart {
  //   refresh(): Promise<CartType>;
  //   id(): string | null;
  //   request(endpoint?: string, method?: RequestMethod, data?: object, returnFullRequest?: boolean): Promise<any>;
  //   add(productId: string, quantity?: number, variantData?: object | string): Promise<AddUpdateResponse>;
  //   retrieve(cardId?: string): Promise<CartType>;
  //   checkQuantity(productId: string, quantity: number): Promise<boolean>;
  //   remove(lineId: string): Promise<RemoveResponse>;
  //   delete(): Promise<DeleteResponse>;
  //   update(lineId: string, data: object): Promise<AddUpdateResponse>;
  //   contents(): Promise<LineItem[]>;
  //   empty(): Promise<EmptyResponse>;
}
