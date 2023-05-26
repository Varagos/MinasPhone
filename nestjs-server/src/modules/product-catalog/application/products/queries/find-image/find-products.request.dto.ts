import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FindImageRequestDto {
  @ApiProperty({
    required: false,
    example: 'iphone-12',
    description: 'The slug of the product 1to filter by',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    required: false,
    example: 'c7b58d20-92a7-4e72-8da7-82971a1a9f4f',
    description: 'The UUID of the category to filter by',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
