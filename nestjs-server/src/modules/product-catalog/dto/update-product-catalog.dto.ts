import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCatalogDto } from './create-product-catalog.dto';

export class UpdateProductCatalogDto extends PartialType(CreateProductCatalogDto) {}
