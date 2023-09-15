import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

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
  lineItems: any[];

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
