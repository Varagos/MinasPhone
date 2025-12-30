import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginatedQueryRequestDto } from '@libs/api/paginated-query.request.dto';

export class FindAttributesRequestDto extends PaginatedQueryRequestDto {
  @ApiProperty({
    example: 'Color',
    description: 'Filter attributes by name',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly name?: string;
}
