import { Controller, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { RolesGuard } from '@modules/user-management/infra/services/super-tokens/guards/roles.guard';
import { SyncAllProductsToGoogleMerchantCommand } from '@modules/marketing/application/google-merchant/commands/sync-all-products/sync-all-products.command';
import { routesV1 } from '@config/app.routes';

class SyncAllProductsResponseDto {
  total: number;
  succeeded: number;
  failed: number;
}

@ApiTags('google-merchant')
@Controller(routesV1.version)
export class GoogleMerchantHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    summary: 'Sync all products to Google Merchant Center',
    description: 'Admin-only endpoint to sync all products to Google Merchant',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products synced successfully',
    type: SyncAllProductsResponseDto,
  })
  @Post(routesV1.googleMerchant.syncAll)
  @UseGuards(new RolesGuard())
  async syncAll(): Promise<SyncAllProductsResponseDto> {
    const command = new SyncAllProductsToGoogleMerchantCommand();
    const result = await this.commandBus.execute(command);

    return result.unwrap();
  }
}
