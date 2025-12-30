import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@libs/api/paginated.response.base';
import { AttributeResponseDto } from './attribute.response.dto';

export class AttributePaginatedResponseDto extends PaginatedResponseDto<AttributeResponseDto> {
  @ApiProperty({ type: AttributeResponseDto, isArray: true })
  readonly data: readonly AttributeResponseDto[];
}
