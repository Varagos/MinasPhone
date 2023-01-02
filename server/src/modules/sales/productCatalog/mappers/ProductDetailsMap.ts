import { ProductDetails } from '../domain/ProductDetails.js';
import { Mapper } from '../../../../shared/infra/Mapper.js';
import { ProductDTO } from '../dtos/productDTO.js';
import { Product as PersistenceProduct } from '../../../../shared/infra/database/typeorm/models/index.js';
import { SERVER_URL } from '../../../../shared/config/index.js';

export class ProductDetailsMap implements Mapper<ProductDetails> {
  public static toDomain(raw: PersistenceProduct): ProductDetails {
    const productOrError = ProductDetails.create({
      id: raw.id,
      active: raw.active,
      slug: raw.slug,
      name: raw.name,
      description: raw.description,
      quantity: raw.quantity,
      mediaFileName: raw.mediaFilename,
      sku: raw.sku,
      price: raw.price,
      categoryId: raw.category?.id,
    });

    productOrError.isFailure && console.log(productOrError.getErrorValue());

    return productOrError.getValue();
  }

  public static toDTO(productDetails: ProductDetails): ProductDTO {
    return {
      id: productDetails.id,
      active: productDetails.active,
      slug: productDetails.slug,
      name: productDetails.name,
      description: productDetails.description,
      quantity: productDetails.quantity,
      mediaFileName: SERVER_URL + productDetails.mediaFileName,
      sku: productDetails.sku,
      price: productDetails.price,
      categoryId: productDetails.categoryId,
    };
  }
}
