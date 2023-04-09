import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

export class ProductResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'Cool Product',
    description: "Product's name",
  })
  name: string;

  @ApiProperty({
    example: 'A very cool product',
    description: "Product's description",
  })
  description: string;

  @ApiProperty({
    example: 'cool-product',
    description: "Product's slug",
  })
  slug: string;

  @ApiProperty({
    example: 9.99,
    description: "Product's price",
  })
  price: number;

  @ApiProperty({
    example: 10,
    description: "Product's quantity",
  })
  quantity: number;

  @ApiProperty({
    example: true,
    description: 'Whether the product is active or not',
  })
  active: boolean;

  // @ApiProperty({
  //   example: 'http://example.com/image.jpg',
  //   description: "URL for the product's image",
  // })
  // imageUrl: string;

  // @ApiProperty({
  //   example: 'image/jpeg',
  //   description: "MIME type for the product's image",
  // })
  // imageMimeType: string;

  @ApiProperty({
    example: '1d239fa7-5102-4c0d-b99d-bfc9fa1d867f',
    description: "Category's id",
  })
  categoryId: string;
}
