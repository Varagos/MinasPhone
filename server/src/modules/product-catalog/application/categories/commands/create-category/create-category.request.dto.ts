import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryRequestDto {
  @ApiProperty({
    required: true,
    example: 'electronics',
    description: 'The slug of the category to filter by',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    required: true,
    example: 'Electronics',
    description: 'The name of the category to filter by',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
    example: 'c7b58d20-92a7-4e72-8da7-82971a1a9f4f',
    description: 'The UUID of the parent category to filter by',
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
