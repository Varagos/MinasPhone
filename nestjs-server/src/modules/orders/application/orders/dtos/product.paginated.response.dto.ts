import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@libs/api/paginated.response.base';
import { ProductResponseDto } from './product.response.dto';

export class ProductPaginatedResponseDto extends PaginatedResponseDto<ProductResponseDto> {
  @ApiProperty({ type: ProductResponseDto, isArray: true })
  readonly data: readonly ProductResponseDto[];
}
