import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ProductModel } from '@modules/product-catalog/infra/database/product.repository';
import { GoogleMerchantProduct } from '@modules/marketing/domain/value-objects/google-merchant-product.value-object';
import { googleMerchantConfig } from '@config/google-merchant.config';
import { FindAttributeQuery } from '@modules/product-catalog/application/attributes/queries/find-attribute/find-attribute.query';

@Injectable()
export class ProductToGoogleMerchantMapper {
  constructor(private readonly queryBus: QueryBus) {}

  async mapToGoogleMerchant(
    product: ProductModel,
  ): Promise<GoogleMerchantProduct> {
    // Extract attribute values by name/slug
    const brand = await this.getAttributeValue(product, 'brand');
    const gtin = await this.getAttributeValue(product, 'gtin');
    const mpn = await this.getAttributeValue(product, 'mpn');
    const condition = await this.getAttributeValue(product, 'condition');

    return new GoogleMerchantProduct({
      offerId: product.id,
      contentLanguage: googleMerchantConfig.contentLanguage,
      targetCountry: googleMerchantConfig.targetCountry,
      channel: 'online',
      title: product.name,
      description: product.description,
      link: `${googleMerchantConfig.storeUrl}/products/${product.id}`,
      imageLink: product.image_uri,
      price: {
        value: product.price.toString(),
        currency: 'EUR',
      },
      availability: product.quantity > 0 ? 'in_stock' : 'out_of_stock',
      brand: brand || undefined,
      gtin: gtin || undefined,
      mpn: mpn || undefined,
      condition: (condition as any) || 'new',
    });
  }

  private async getAttributeValue(
    product: ProductModel,
    attributeSlug: string,
  ): Promise<string | null> {
    if (!product.attribute_values) return null;

    // Find attribute by fetching attributes and matching by name
    for (const [attributeId, values] of Object.entries(
      product.attribute_values,
    )) {
      const query = new FindAttributeQuery({ attributeId });
      const attributeResult = await this.queryBus.execute(query);

      if (attributeResult.isErr()) continue;

      const attribute = attributeResult.unwrap();
      if (attribute.name.toLowerCase() === attributeSlug.toLowerCase()) {
        // Return the first value (could be text, numeric, or boolean)
        const firstValue = values[0];
        if (!firstValue) return null;

        return (
          firstValue.text_value ||
          firstValue.numeric_value?.toString() ||
          firstValue.boolean_value?.toString() ||
          null
        );
      }
    }

    return null;
  }
}
