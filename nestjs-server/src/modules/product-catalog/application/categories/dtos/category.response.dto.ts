import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

export class CategoryResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'products',
    description: "Category's slug",
  })
  slug: string;

  @ApiProperty({
    example: 'Products',
    description: "Category's name",
  })
  name: string;

  @ApiProperty({
    description: 'Optional parent category id',
  })
  parentId?: string;
}
