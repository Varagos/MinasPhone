import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateOrderStatusRequestDto {
  @ApiProperty({
    required: false,
    example: 'completed',
  })
  @IsString()
  @IsEnum(['pending', 'delivered', 'cancelled'])
  status: string;
}
