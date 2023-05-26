import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CustomersController } from './controllers/customers.controller';
import { CategoriesHttpController } from './controllers/categories.http.controller';
import { ProductsHttpController } from './controllers/products.http.controller';

@Module({
  imports: [CqrsModule],
  controllers: [
    CustomersController,
    CategoriesHttpController,
    ProductsHttpController,
  ],
})
export class ApiModule {}
