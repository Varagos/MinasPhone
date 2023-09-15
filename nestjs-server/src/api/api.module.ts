import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './controllers/users.controller';
import { CategoriesHttpController } from './controllers/categories.http.controller';
import { ProductsHttpController } from './controllers/products.http.controller';
import { HealthController } from './health.controller';
import { CartHttpController } from './controllers/cart.http.controller';
import { OrdersHttpController } from './controllers/orders.http.controller';

@Module({
  imports: [CqrsModule],
  controllers: [
    HealthController,
    UsersController,
    CategoriesHttpController,
    ProductsHttpController,
    CartHttpController,
    OrdersHttpController,
  ],
})
export class ApiModule {}
