import { Injectable } from '@nestjs/common';
import { ProductEntity } from '@modules/product-catalog/domain/product.entity';
import { ProductModel, productSchema } from '../database/product.repository';
import { Image, MimeType } from '../../domain/value-objects/image.value-object';
import { ProductResponseDto } from '@modules/product-catalog/application/categories/dtos/product.response.dto';
import { routesV1 } from '@config/app.routes';
@Injectable()
export class ProductMapper {
  toPersistence(product: ProductEntity): ProductModel {
    const {
      id,
      createdAt,
      updatedAt,
      name,
      description,
      slug,
      price,
      quantity,
      active,
      image,
      sku,
      categoryId,
    } = product;

    return productSchema.parse({
      id,
      created_at: createdAt,
      updated_at: updatedAt,
      name,
      description,
      slug,
      price,
      quantity,
      active,
      image_data: image.data,
      image_mimetype: image.mimeType,
      sku,
      category_id: categoryId,
    });
  }
  toDomain(productModel: ProductModel): ProductEntity {
    const image = new Image({
      data: productModel.image_data,
      mimeType: productModel.image_mimetype,
    });
    // Get mimetype from image
    // const buffer = Buffer.from(productModel.image, 'base64');
    // const mimeType = fileType(buffer);
    return new ProductEntity({
      id: productModel.id,
      createdAt: productModel.created_at,
      updatedAt: productModel.updated_at,
      props: {
        name: productModel.name,
        description: productModel.description,
        slug: productModel.slug,
        price: productModel.price,
        quantity: productModel.quantity,
        active: productModel.active,
        image,
        sku: productModel.sku,
        categoryId: productModel.category_id,
      },
    });
  }
  toResponse(entity: ProductEntity): ProductResponseDto {
    const props = entity.getPropsCopy();
    const response = new ProductResponseDto(entity);
    response.name = props.name;
    response.slug = props.slug;
    response.description = props.description;
    response.price = props.price;
    response.quantity = props.quantity;
    response.active = props.active;
    // response.imageUrl = `/${routesV1.product.root}/${props.id}/image`;
    // response.sku = props.sku;
    response.categoryId = props.categoryId;
    return response;
  }
}
