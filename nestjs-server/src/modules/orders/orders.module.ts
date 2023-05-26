import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Module({
  controllers: [],
  providers: [OrdersService],
})
export class OrdersModule {}
