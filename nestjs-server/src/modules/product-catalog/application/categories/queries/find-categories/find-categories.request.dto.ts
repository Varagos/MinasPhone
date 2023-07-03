import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FindCategoriesDto {
  @ApiProperty({
    required: false,
    example: 'electronics',
    description: 'The slug of the category to filter by',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    required: false,
    example: 'Electronics',
    description: 'The name of the category to filter by',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
    example: 'c7b58d20-92a7-4e72-8da7-82971a1a9f4f',
    description: 'The UUID of the parent category to filter by',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
