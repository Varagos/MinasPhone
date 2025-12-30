import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './controllers/users.controller';
import { CategoriesHttpController } from './controllers/categories.http.controller';
import { ProductsHttpController } from './controllers/products.http.controller';
import { HealthController } from './health.controller';
import { CartHttpController } from './controllers/cart.http.controller';
import { OrdersHttpController } from './controllers/orders.http.controller';
import { AppHttpRequestLoggerMiddleware } from '@libs/api/middleware/request-logger.middleware';
import { ProductImagesHttpController } from './controllers/product-images.http.controller';
import { ProductTypesHttpController } from './controllers/product-types.http.controller';
import { AttributesHttpController } from './controllers/attributes.http.controller';

@Module({
  imports: [CqrsModule],
  controllers: [
    HealthController,
    UsersController,
    CategoriesHttpController,
    ProductsHttpController,
    CartHttpController,
    OrdersHttpController,
    ProductImagesHttpController,
    ProductTypesHttpController,
    AttributesHttpController,
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppHttpRequestLoggerMiddleware).forRoutes('/');
  }
}
