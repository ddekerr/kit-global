import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
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
