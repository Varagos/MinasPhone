import { Injectable } from '@nestjs/common';
import {
  ProductEntity,
  ProductAttributeValuesMap,
} from '@modules/product-catalog/domain/product.entity';
import { ProductModel, productSchema } from '../database/product.repository';
import { ProductResponseDto } from '@modules/product-catalog/application/categories/dtos/product.response.dto';
import { Money } from '@modules/product-catalog/domain/value-objects/money.value-object';
import { ProductAttributeValue } from '@modules/product-catalog/domain/value-objects/product-attribute-value.value-object';
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
      imageUri,
      sku,
      categoryId,
      productTypeId,
    } = product;

    return productSchema.parse({
      id,
      created_at: createdAt,
      updated_at: updatedAt,
      name,
      description,
      slug,
      price: price.amount.toNumber(),
      quantity,
      active,
      image_uri: imageUri,
      sku,
      category_id: categoryId,
      product_type_id: productTypeId,
    });
  }
  toDomain(productModel: ProductModel): ProductEntity {
    // Get mimetype from image
    // const buffer = Buffer.from(productModel.image, 'base64');
    // const mimeType = fileType(buffer);

    // Convert attribute_values from JSON to ProductAttributeValuesMap
    const productAttributes: ProductAttributeValuesMap = new Map();

    if (productModel.attribute_values) {
      for (const [attributeId, values] of Object.entries(
        productModel.attribute_values,
      )) {
        const attributeValues = values.map((v) =>
          ProductAttributeValue.create({
            valueId: v.value_id ?? null,
            textValue: v.text_value ?? null,
            numericValue: v.numeric_value ?? null,
            booleanValue: v.boolean_value ?? null,
          }),
        );
        productAttributes.set(attributeId, attributeValues);
      }
    }

    return new ProductEntity({
      id: productModel.id,
      createdAt: productModel.created_at,
      updatedAt: productModel.updated_at,
      props: {
        name: productModel.name,
        description: productModel.description,
        slug: productModel.slug,
        price: Money.create(productModel.price),
        quantity: productModel.quantity,
        active: productModel.active,
        imageUri: productModel.image_uri,
        sku: productModel.sku ? productModel.sku : null,
        categoryId: productModel.category_id,
        productTypeId: productModel.product_type_id ?? undefined,
        productAttributes:
          productAttributes.size > 0 ? productAttributes : undefined,
      },
    });
  }
  toResponse(entity: ProductEntity): ProductResponseDto {
    const props = entity.getPropsCopy();
    const response = new ProductResponseDto(entity);
    response.name = props.name;
    response.slug = props.slug;
    response.description = props.description;
    response.price = props.price.amount.toNumber();
    response.quantity = props.quantity;
    response.active = props.active;
    response.imageUrl = props.imageUri;
    // response.sku = props.sku;
    response.categoryId = props.categoryId;
    response.productTypeId = props.productTypeId;

    // Add attribute values to response
    const productAttributes = entity.productAttributes;
    if (productAttributes) {
      const attributeValuesResponse: Record<string, any[]> = {};
      for (const [attributeId, values] of productAttributes.entries()) {
        attributeValuesResponse[attributeId] = values.map((v) => ({
          valueId: v.valueId,
          textValue: v.textValue,
          numericValue: v.numericValue,
          booleanValue: v.booleanValue,
        }));
      }
      response.attributeValues = attributeValuesResponse;
    }

    return response;
  }
}
