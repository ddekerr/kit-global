import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ReturnUserType, Token } from 'src/users/types';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<ReturnUserType> {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUserDto): Promise<ReturnUserType> {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('access-strategy'))
  @Post('logout')
  logout(@Req() request: Request): void {
    const email: string = request.user['payload']['email'];
    this.authService.logout(email);
  }

  @UseGuards(AuthGuard('refresh-strategy'))
  @Post('refresh')
  refresh(@Req() request: Request): Promise<Token> {
    const email: string = request.user['payload']['email'];
    const refreshToken: string = request.user['refreshToken'];
    const token = this.authService.refresh(email, refreshToken);
    return token;
  }
}
