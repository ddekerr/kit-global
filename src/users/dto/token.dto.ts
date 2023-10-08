import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    type: String,
    example: 'Token',
    description: 'Access token',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;
}
