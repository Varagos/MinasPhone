import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class FindSearchEngineImagesRequestDto {
  @ApiProperty({
    description: 'Search text for finding images',
    example: 'Samsung-galaxy',
  })
  @IsString()
  @IsNotEmpty()
  searchText: string;
}
