import { DataSource } from 'typeorm';
import {
  Cart,
  CartItem,
  Category,
  Order,
  OrderItem,
  Product,
  User,
} from './models/index.js';
import { OrderContactInfo } from './models/OrderContactInfo.js';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  // path.join(process.cwd(), 'database.sqlite'),
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [
    User,
    Product,
    Category,
    OrderItem,
    Order,
    OrderContactInfo,
    CartItem,
    Cart,
  ],
  migrations: [],
  subscribers: [],
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    console.log('Connection to TypeORM has been established successfully.');
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
