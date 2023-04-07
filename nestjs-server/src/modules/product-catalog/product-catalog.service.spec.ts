import { Test, TestingModule } from '@nestjs/testing';
import { ProductCatalogService } from './product-catalog.service';

describe('ProductCatalogService', () => {
  let service: ProductCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCatalogService],
    }).compile();

    service = module.get<ProductCatalogService>(ProductCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
