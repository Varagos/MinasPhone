import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';
import { CartReadModel } from '../queries/fetch-cart/fetch-cart.handler';

class CartLineItemDto {
  id: string;
  productId: string;
  quantity: number;
  productName: string;
  productSlug: string;
  productPrice: number;
  productImage: string;
}

export class CartResponseDto extends ResponseBase {
  // @ApiProperty({
  //   description: 'Cart line items',
  // })
  lineItems: CartLineItemDto[];

  @ApiProperty({
    description: 'Cart total items',
  })
  totalItems: number;

  @ApiProperty({
    description: 'Cart subtotal',
  })
  subtotal: CartReadModel['subtotal'];
}
