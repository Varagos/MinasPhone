import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateCartLineItemRequestDto {
  @ApiProperty({
    required: true,
    example: '1',
    description: 'The new quantity of the line item',
  })
  @IsInt()
  @IsPositive()
  quantity: string;
}
