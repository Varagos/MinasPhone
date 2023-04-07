import { Test, TestingModule } from '@nestjs/testing';
import { MarketingController } from './marketing.controller';
import { MarketingService } from './marketing.service';

describe('MarketingController', () => {
  let controller: MarketingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketingController],
      providers: [MarketingService],
    }).compile();

    controller = module.get<MarketingController>(MarketingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
