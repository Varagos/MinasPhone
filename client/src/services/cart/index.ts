import { commerce } from '../../components/lib/commerce';
import { Cart as CartType } from '../../types/cart';
import { Asset, Price, productsService } from '../products';
import CommerceJSCartService from './commercejs';
import MockCartService from './mock';
import CartService from './server';

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

export interface ICartService {
  fetch(): Promise<CartType>;
  addItemToCart(productId: string, quantity: number): Promise<CartType>;
  empty(): Promise<CartType>;
  removeFromCart(productId: string): Promise<CartType>;
  updateItem(lineItemId: string, quantity: number): Promise<CartType>;
  refresh(): Promise<CartType>;
}

const services: { [env: string]: () => any } = {
  mock: () => new MockCartService(productsService),
  commercejs: () => new CommerceJSCartService(commerce),
  server: () => new CartService(),
};

const cartService: ICartService = process.env.REACT_APP_ENVIRONMENT
  ? services[process.env.REACT_APP_ENVIRONMENT]()
  : new MockCartService(productsService);

export { cartService };
