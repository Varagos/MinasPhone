import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { SyncAllProductsToGoogleMerchantCommand } from './sync-all-products.command';
import { GOOGLE_MERCHANT_SERVICE } from '@modules/marketing/constants';
import { GoogleMerchantServicePort } from '@modules/marketing/domain/ports/google-merchant.port';
import { ProductToGoogleMerchantMapper } from '../../../services/product-to-google-merchant.mapper';
import { Result, Ok } from 'oxide.ts';
import { FindProductsQuery } from '@modules/product-catalog/application/products/queries/find-products/find-products.query';
import { FindProductsResponse } from '@modules/product-catalog/application/products/queries/find-products/find-products.handler';
import e from 'express';

export interface SyncAllProductsResult {
  total: number;
  succeeded: number;
  failed: number;
}

export type SyncAllProductsCommandResponse = Result<
  SyncAllProductsResult,
  Error
>;

@CommandHandler(SyncAllProductsToGoogleMerchantCommand)
export class SyncAllProductsToGoogleMerchantCommandHandler
  implements ICommandHandler<SyncAllProductsToGoogleMerchantCommand>
{
  private readonly logger = new Logger(
    SyncAllProductsToGoogleMerchantCommandHandler.name,
  );

  constructor(
    private readonly queryBus: QueryBus,
    @Inject(GOOGLE_MERCHANT_SERVICE)
    private readonly googleMerchantService: GoogleMerchantServicePort,
    private readonly mapper: ProductToGoogleMerchantMapper,
  ) {}

  async execute(
    _command: SyncAllProductsToGoogleMerchantCommand,
  ): Promise<SyncAllProductsCommandResponse> {
    // Fetch all products using QueryBus with a large limit
    const query = new FindProductsQuery({ limit: 10000, page: 0 });

    const productsResult: FindProductsResponse = await this.queryBus.execute(
      query,
    );

    if (productsResult.isErr()) {
      return Ok({ total: 0, succeeded: 0, failed: 0 });
    }

    const paginatedProducts = productsResult.unwrap();
    const products = paginatedProducts.data;

    let succeeded = 0;
    let failed = 0;

    // Lets first lsit all of the current products
    // const existingProducts = await this.googleMerchantService.listAllProducts();
    // for (const existingProduct of existingProducts) {
    //   // if offerid starts with prod_
    //   if (!existingProduct.props.offerId.startsWith('prod_')) continue;
    //   await this.googleMerchantService.deleteProduct(
    //     existingProduct.props.offerId,
    //   );
    // }

    for (const product of products) {
      try {
        const merchantProduct = await this.mapper.mapToGoogleMerchant(product);
        await this.googleMerchantService.insertProduct(merchantProduct);
        succeeded++;
      } catch (error) {
        this.logger.error(`Failed to sync product ${product.id}`, error);
        failed++;
      }
    }

    this.logger.log(
      `Sync complete: ${succeeded}/${products.length} products synced successfully`,
    );

    return Ok({
      total: products.length,
      succeeded,
      failed,
    });
  }
}
