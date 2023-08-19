import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';
import { CartReadModel } from '../queries/fetch-cart/fetch-cart.handler';

export class CartResponseDto extends ResponseBase {
  @ApiProperty({
    description: 'Cart line items',
  })
  lineItems: CartReadModel['lineItems'];
}
