import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@libs/api/paginated.response.base';
import { ProductTypeListResponseDto } from './product-type.response.dto';

export class ProductTypePaginatedResponseDto extends PaginatedResponseDto<ProductTypeListResponseDto> {
  @ApiProperty({ type: ProductTypeListResponseDto, isArray: true })
  readonly data: readonly ProductTypeListResponseDto[];
}
