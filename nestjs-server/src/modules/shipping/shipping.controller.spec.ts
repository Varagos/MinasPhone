import { Test, TestingModule } from '@nestjs/testing';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';

describe('ShippingController', () => {
  let controller: ShippingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingController],
      providers: [ShippingService],
    }).compile();

    controller = module.get<ShippingController>(ShippingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
