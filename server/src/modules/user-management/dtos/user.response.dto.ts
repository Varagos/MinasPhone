import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

export class UserResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'example@email.com',
    description: "The user's email",
  })
  email: string;
}
