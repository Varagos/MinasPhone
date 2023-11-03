import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CheckoutOrderRequestDto {
  @ApiProperty({
    required: true,
    example: 'John',
    description: "The buyer's first name",
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    example: 'Doe',
    description: "The buyer's last name",
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    required: true,
    example: 'example@email.org',
    description: "The buyer's email",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    examples: ['+3069xxxxxxxx', '+30210xxxxxxx'],
    description:
      'The buyer phone number, must be prefixed with country code, e.g. +30 for Greece',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
