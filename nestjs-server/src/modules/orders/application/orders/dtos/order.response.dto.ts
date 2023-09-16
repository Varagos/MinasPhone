import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

export class OrderLineItemResponseDTO {
  @ApiProperty({
    description: 'Line item id',
  })
  id: string;

  @ApiProperty({
    example: 'prod_123456789',
    description: 'Product id',
  })
  productId: string;

  @ApiProperty({
    example: 'Product name',
    description: 'Product name',
  })
  productName: string;

  @ApiProperty({
    description: 'Product image',
  })
  productImage: string;

  @ApiProperty({
    example: 10,
    description: 'Item price',
  })
  itemPrice: number;

  @ApiProperty({
    example: 2,
    description: 'Product quantity',
  })
  quantity: number;

  @ApiProperty({
    example: 20,
    description: 'Total price',
  })
  totalPrice: number;
}

export class OrderResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'ord_123456789',
    description: 'Order id',
  })
  slug: string;

  @ApiProperty({
    example: 'pending',
    description: 'Order status',
  })
  status: string;

  @ApiProperty({
    description: 'Order line items',
  })
  lineItems: OrderLineItemResponseDTO[];

  @ApiProperty({
    description: 'Order contact info',
  })
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}
