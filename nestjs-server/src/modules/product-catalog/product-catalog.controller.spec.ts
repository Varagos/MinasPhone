import { Test, TestingModule } from '@nestjs/testing';
import { ProductCatalogController } from './product-catalog.controller';
import { ProductCatalogService } from './product-catalog.service';

describe('ProductCatalogController', () => {
  let controller: ProductCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCatalogController],
      providers: [ProductCatalogService],
    }).compile();

    controller = module.get<ProductCatalogController>(ProductCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
