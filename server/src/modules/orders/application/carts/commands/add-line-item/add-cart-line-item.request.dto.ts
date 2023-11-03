import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class AddCartItemRequestDto {
  @ApiProperty({
    required: true,
    example: 'c7b58d20-92a7-4e72-8da7-82971a1a9f4f',
    description: 'The product id to add',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    required: true,
    example: '1',
    description: 'The quantity of the line item',
  })
  @IsInt()
  @IsPositive()
  quantity: string;
}
