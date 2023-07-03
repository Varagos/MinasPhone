import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from './category.response.dto';
import { PaginatedResponseDto } from '@libs/api/paginated.response.base';

export class CategoryPaginatedResponseDto extends PaginatedResponseDto<CategoryResponseDto> {
  @ApiProperty({ type: CategoryResponseDto, isArray: true })
  readonly data: readonly CategoryResponseDto[];
}
