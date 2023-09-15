import { Api } from '..';
import { CartApi } from './cart';
import { CategoriesApi } from './categories';
import { OrdersApi } from './orders';
import ProductsApi from './products';

const categoriesApi = new CategoriesApi();
const productsApi = new ProductsApi();
const cartApi = new CartApi();
const ordersApi = new OrdersApi();
const serverApi: Api = {
  categories: categoriesApi,
  products: productsApi,
  cart: cartApi,
  orders: ordersApi,
};
export default serverApi;
