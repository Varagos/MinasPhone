import { Injectable } from '@nestjs/common';
import { CreateProductCatalogDto } from './dto/create-product-catalog.dto';
import { UpdateProductCatalogDto } from './dto/update-product-catalog.dto';

@Injectable()
export class ProductCatalogService {
  create(createProductCatalogDto: CreateProductCatalogDto) {
    return 'This action adds a new productCatalog';
  }

  findAll() {
    return `This action returns all productCatalog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productCatalog`;
  }

  update(id: number, updateProductCatalogDto: UpdateProductCatalogDto) {
    return `This action updates a #${id} productCatalog`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCatalog`;
  }
}
