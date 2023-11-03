import { ApiProperty } from '@nestjs/swagger';
import { OrderResponseDto } from './order.response.dto';
import { PaginatedResponseDto } from '@libs/api/paginated.response.base';

export class OrderPaginatedResponseDto extends PaginatedResponseDto<OrderResponseDto> {
  @ApiProperty({ type: OrderResponseDto, isArray: true })
  readonly data: readonly OrderResponseDto[];
}
