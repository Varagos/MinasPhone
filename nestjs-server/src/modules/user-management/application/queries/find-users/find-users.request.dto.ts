import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class FindUsersDto {
  @ApiProperty({
    required: false,
    example: 'johndoe@example.com',
    description: 'The email of the user to filter by',
  })
  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;
}
