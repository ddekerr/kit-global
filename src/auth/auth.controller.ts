import { Request } from 'express';
import {
  ApiTags,
  ApiHeader,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiAcceptedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ReturnUserDto } from 'src/users/dto/return-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { TokenDto } from 'src/users/dto/token.dto';

import { ErrorType } from 'src/types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'User has been successfully created.',
    type: ReturnUserDto,
  })
  @ApiConflictResponse({
    description: 'E-mail already in use',
    type: ErrorType,
  })
  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<ReturnUserDto> {
    return this.authService.register(dto);
  }

  @ApiAcceptedResponse({
    description: 'User has been successfully login.',
    type: ReturnUserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'E-mail aren`t valid',
    type: ErrorType,
  })
  @Post('login')
  login(@Body() dto: LoginUserDto): Promise<ReturnUserDto> {
    return this.authService.login(dto);
  }

  @ApiOkResponse({ description: 'User has been successfully logout.' })
  @ApiHeader({
    name: 'Authorization',
    example: 'Bearer <token>',
    description: 'Access token types: Bearer Token',
  })
  @UseGuards(AuthGuard('access-strategy'))
  @Post('logout')
  logout(@Req() request: Request): void {
    const email: string = request.user['payload']['email'];
    this.authService.logout(email);
  }

  @ApiOkResponse({
    description: 'User has been successfully refresh.',
    type: TokenDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token are missing or invalid',
    type: ErrorType,
  })
  @ApiHeader({
    name: 'Authorization',
    example: 'Bearer <token>',
    description: 'Refresh token types: Bearer Token',
  })
  @UseGuards(AuthGuard('refresh-strategy'))
  @Post('refresh')
  refresh(@Req() request: Request): Promise<TokenDto> {
    const email: string = request.user['payload']['email'];
    const refreshToken: string = request.user['refreshToken'];
    const token = this.authService.refresh(email, refreshToken);
    return token;
  }
}
