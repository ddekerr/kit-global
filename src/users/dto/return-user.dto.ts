import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class ReturnUserDto {
  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'User name',
    required: true,
  })
  @IsString({ message: 'User name must be a string' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: String,
    example: 'john@gmail.com',
    description: 'User e-mail',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty({ message: 'User name must not be empty' })
  readonly email: string;

  @ApiProperty({
    type: String,
    example: 'Token',
    description: 'Access token',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;

  @ApiProperty({
    type: String,
    example: 'Token',
    description: 'Refresh token',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;
}
