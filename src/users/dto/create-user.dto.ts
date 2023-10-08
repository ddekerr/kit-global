import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
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
    example: 'jonpassword',
    description: 'User password',
    required: true,
  })
  @IsNotEmpty({ message: 'Password must not be empty' })
  @Length(4, 16, { message: 'Password must have between 4 and 16 characters' })
  readonly password: string;
}
