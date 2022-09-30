import { ProductDetails } from './../domain/ProductDetails';
import { Mapper } from '../../../shared/infra/Mapper';
import { ProductDTO } from '../dtos/productDTO';

export class ProductDetailsMap implements Mapper<ProductDetails> {
  public static toDomain(raw: any): ProductDetails {
    const productOrError = ProductDetails.create({
      id: raw.id,
      active: raw.active,
      permalink: raw.permalink,
      name: raw.name,
      description: raw.description,
      quantity: raw.quantity,
      media: raw.media,
      sku: raw.sku,
      price: raw.price,
    });

    productOrError.isFailure && // console.log(productOrError.getErrorValue());

    return productOrError.getValue();
  }

  public static toDTO(productDetails: ProductDetails): ProductDTO {
    return {
      id: productDetails.id,
      active: productDetails.active,
      permalink: productDetails.permalink,
      name: productDetails.name,
      description: productDetails.description,
      quantity: productDetails.quantity,
      media: productDetails.media,
      sku: productDetails.sku,
      price: productDetails.price,
    };
  }
}
