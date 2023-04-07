import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductCatalogService } from './product-catalog.service';
import { CreateProductCatalogDto } from './dto/create-product-catalog.dto';
import { UpdateProductCatalogDto } from './dto/update-product-catalog.dto';

@Controller('product-catalog')
export class ProductCatalogController {
  constructor(private readonly productCatalogService: ProductCatalogService) {}

  @Post()
  create(@Body() createProductCatalogDto: CreateProductCatalogDto) {
    return this.productCatalogService.create(createProductCatalogDto);
  }

  @Get()
  findAll() {
    return this.productCatalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCatalogService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCatalogDto: UpdateProductCatalogDto,
  ) {
    return this.productCatalogService.update(+id, updateProductCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCatalogService.remove(+id);
  }
}
