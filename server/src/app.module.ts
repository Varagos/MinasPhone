import { Discount } from './discounts/entities/discount.entity';
import { Inventory } from './products/entities/inventory.entity';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { UserPayment } from './users/entities/payment.entity';
import { UserAddress } from './users/entities/address.entity';
import { User } from './users/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { DiscountsModule } from './discounts/discounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'db',
      entities: [
        User,
        UserAddress,
        UserPayment,
        Product,
        Inventory,
        Category,
        Discount,
      ],
      synchronize: true, // false for production
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    DiscountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private connection: Connection) {}
}
