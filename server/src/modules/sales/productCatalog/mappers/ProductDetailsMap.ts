import { ProductDetails } from '../domain/ProductDetails';
import { Mapper } from '../../../../shared/infra/Mapper';
import { ProductDTO } from '../dtos/productDTO';

export class ProductDetailsMap implements Mapper<ProductDetails> {
  public static toDomain(raw: any): ProductDetails {
    const productOrError = ProductDetails.create({
      id: raw.id,
      active: raw.active,
      slug: raw.slug,
      name: raw.name,
      description: raw.description,
      quantity: raw.quantity,
      mediaFileName: raw.media_filename,
      sku: raw.sku,
      price: raw.price,
      categoryId: raw.category_id,
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
      mediaFileName: 'http://localhost:8080/' + productDetails.mediaFileName,
      sku: productDetails.sku,
      price: productDetails.price,
      categoryId: productDetails.categoryId,
    };
  }
}
