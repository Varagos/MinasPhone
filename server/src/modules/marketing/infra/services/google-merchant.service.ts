import { Injectable, Logger } from '@nestjs/common';
import {
  ProductInputsServiceClient,
  ProductsServiceClient,
  protos,
} from '@google-shopping/products';
import { google } from 'googleapis';
import { googleMerchantConfig } from '@config/google-merchant.config';
import { GoogleMerchantServicePort } from '@modules/marketing/domain/ports/google-merchant.port';
import { GoogleMerchantProduct } from '@modules/marketing/domain/value-objects/google-merchant-product.value-object';

@Injectable()
export class GoogleMerchantService implements GoogleMerchantServicePort {
  private readonly logger = new Logger(GoogleMerchantService.name);
  private productInputsClient: ProductInputsServiceClient;
  private productsClient: ProductsServiceClient;
  private readonly parent: string;
  private readonly dataSource: string;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: googleMerchantConfig.serviceAccount as any,
      scopes: ['https://www.googleapis.com/auth/content'],
    });

    this.productInputsClient = new ProductInputsServiceClient({
      authClient: auth as any,
    });
    this.productsClient = new ProductsServiceClient({
      authClient: auth as any,
    });

    this.parent = `accounts/${googleMerchantConfig.merchantId}`;
    this.dataSource = `accounts/${googleMerchantConfig.merchantId}/dataSources/${googleMerchantConfig.dataSourceId}`;
  }

  async insertProduct(product: GoogleMerchantProduct): Promise<void> {
    try {
      // const productAttributes: protos.google.shopping.merchant.products.v1.IProductAttributes =
      //   {};
      const request: protos.google.shopping.merchant.products.v1.IInsertProductInputRequest =
        {
          parent: this.parent,
          dataSource: this.dataSource,
          productInput: {
            contentLanguage: googleMerchantConfig.contentLanguage,
            feedLabel: 'GR', // googleMerchantConfig.feedLabel,
            offerId: product.props.offerId,
            // productAttributes,
            ...product.toGoogleFormat(),
          },
        };

      await this.productInputsClient.insertProductInput(request);
      this.logger.log(
        `Product ${product.props.offerId} inserted to Google Merchant`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : '';
      this.logger.error(
        `Failed to insert product ${product.props.offerId}: ${errorMessage}`,
        errorStack,
      );
      throw error; // Re-throw so caller knows it failed
    }
  }

  async updateProduct(product: GoogleMerchantProduct): Promise<void> {
    // Google Merchant uses insert for both create and update
    await this.insertProduct(product);
  }

  async deleteProduct(offerId: string): Promise<void> {
    try {
      // Product ID format: contentLanguage~feedLabel~offerId
      const productId = `${googleMerchantConfig.contentLanguage}~${googleMerchantConfig.feedLabel}~${offerId}`;
      const name = `${this.parent}/productInputs/${productId}`;

      const request = {
        name,
        dataSource: this.dataSource,
      };

      await this.productInputsClient.deleteProductInput(request);
      this.logger.log(`Product ${offerId} deleted from Google Merchant`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : '';
      this.logger.error(
        `Failed to delete product ${offerId}: ${errorMessage}`,
        errorStack,
      );
      throw error; // Re-throw so caller knows it failed
    }
  }

  async listAllProducts(): Promise<GoogleMerchantProduct[]> {
    const products: GoogleMerchantProduct[] = [];
    const request = {
      parent: this.parent,
      dataSource: this.dataSource,
      pageSize: 1000,
    };

    const iterable = this.productsClient.listProductsAsync(request);
    for await (const response of iterable) {
      console.log(response);
      const productAttributes =
        response.productAttributes as protos.google.shopping.merchant.products.v1.IProductAttributes;

      // Map Google product attributes back to our GoogleMerchantProductProps
      const googleMerchantProduct = new GoogleMerchantProduct({
        offerId: response.offerId || '',
        contentLanguage: response.contentLanguage || '',
        targetCountry: '', // Not directly available here
        channel: 'online', // Not directly available here
        title: productAttributes.title || '',
        description: productAttributes.description || '',
        link: productAttributes.link || '',
        imageLink: productAttributes.imageLink || '',
        price: {
          value: '100',
          currency: 'EUR',
        },
        availability: 'in_stock',
        brand: productAttributes.brand || undefined,
        mpn: productAttributes.mpn || undefined,
        condition: 'new',
      }) as any;
      products.push(googleMerchantProduct);
    }
    return products;
  }
}
