import { ApiProperty } from '@nestjs/swagger';

export interface ProductSlugResponseDtoProps {
  id: string;
  slug: string;
  updatedAt: Date;
}

export class ProductSlugResponseDto {
  constructor(props: ProductSlugResponseDtoProps) {
    this.id = props.id;
    this.slug = props.slug;
    this.updatedAt = new Date(props.updatedAt).toISOString();
  }

  @ApiProperty({
    description: "Product's unique identifier, typically a UUID",
  })
  id: string;

  @ApiProperty({
    example: 'cool-product',
    description: "Product's slug",
  })
  slug: string;

  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly updatedAt: string;
}
