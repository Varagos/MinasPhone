import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { SyncProductToGoogleMerchantCommand } from './sync-product.command';
import { GOOGLE_MERCHANT_SERVICE } from '@modules/marketing/constants';
import { GoogleMerchantServicePort } from '@modules/marketing/domain/ports/google-merchant.port';
import { ProductToGoogleMerchantMapper } from '../../../services/product-to-google-merchant.mapper';
import { Result, Ok, Err } from 'oxide.ts';
import { FindProductByIdQuery } from '@modules/product-catalog/application/products/queries/find-product-by-id/find-product-by-id.query';

@CommandHandler(SyncProductToGoogleMerchantCommand)
export class SyncProductToGoogleMerchantCommandHandler
  implements ICommandHandler<SyncProductToGoogleMerchantCommand>
{
  private readonly logger = new Logger(
    SyncProductToGoogleMerchantCommandHandler.name,
  );

  constructor(
    private readonly queryBus: QueryBus,
    @Inject(GOOGLE_MERCHANT_SERVICE)
    private readonly googleMerchantService: GoogleMerchantServicePort,
    private readonly mapper: ProductToGoogleMerchantMapper,
  ) {}

  async execute(
    command: SyncProductToGoogleMerchantCommand,
  ): Promise<Result<void, Error>> {
    try {
      // Fetch product using QueryBus
      const query = new FindProductByIdQuery({ id: command.productId });
      const productResult = await this.queryBus.execute(query);

      if (productResult.isErr()) {
        this.logger.warn(
          `Product ${command.productId} not found for ${command.operation} sync`,
        );
        return Ok(undefined);
      }

      const product = productResult.unwrap();

      if (command.operation === 'delete') {
        await this.googleMerchantService.deleteProduct(product.slug);
      } else {
        const merchantProduct = await this.mapper.mapToGoogleMerchant(product);

        if (command.operation === 'insert') {
          await this.googleMerchantService.insertProduct(merchantProduct);
        } else {
          await this.googleMerchantService.updateProduct(merchantProduct);
        }
      }

      return Ok(undefined);
    } catch (error) {
      this.logger.error(`Failed to sync product ${command.productId}`, error);
      return Err(error instanceof Error ? error : new Error(String(error)));
    }
  }
}
