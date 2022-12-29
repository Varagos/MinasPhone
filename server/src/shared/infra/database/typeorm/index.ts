import 'reflect-metadata';
import { AppDataSource } from './config.js';
import {
  Cart,
  CartItem,
  Category,
  Order,
  OrderItem,
  Product,
  User,
} from './models/index.js';

export const REPOSITORIES = {
  PRODUCT: AppDataSource.getRepository(Product),
  USER: AppDataSource.getRepository(User),
  CATEGORY: AppDataSource.getRepository(Category),
  ORDER: AppDataSource.getRepository(Order),
  ORDER_ITEM: AppDataSource.getRepository(OrderItem),
  CART: AppDataSource.getRepository(Cart),
  CART_ITEM: AppDataSource.getRepository(CartItem),
  TRANSACTIONAL_ENTITY_MANAGER: AppDataSource.manager,
};
