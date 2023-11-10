import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveCartLineItemRequestDto {
  @ApiProperty({
    required: true,
    example: 'c7b58d20-92a7-4e72-8da7-82971a1a9f4f',
    description: 'The line item id to update',
  })
  @IsString()
  lineItemId: string;
}
