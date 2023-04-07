import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';

@Module({
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
