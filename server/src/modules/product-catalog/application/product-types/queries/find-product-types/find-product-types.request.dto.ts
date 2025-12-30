import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginatedQueryRequestDto } from '@libs/api/paginated-query.request.dto';

export class FindProductTypesRequestDto extends PaginatedQueryRequestDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter by name',
  })
  readonly name?: string;
}
