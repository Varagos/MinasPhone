import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';
import { CartReadModel } from '../queries/fetch-cart/fetch-cart.handler';

export class CartResponseDto extends ResponseBase {
  @ApiProperty({
    description: 'Cart line items',
  })
  lineItems: CartReadModel['lineItems'];

  @ApiProperty({
    description: 'Cart total items',
  })
  totalItems: CartReadModel['totalItems'];

  @ApiProperty({
    description: 'Cart subtotal',
  })
  subtotal: CartReadModel['subtotal'];
}
