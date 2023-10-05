import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConflictException, UnauthorizedException } from 'src/exceptions';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/users/token.service';
import { ReturnUserType, Token, Tokens } from 'src/users/types';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
  ) {}

  // ############ REGISTER ############
  async register(dto: CreateUserDto): Promise<ReturnUserType> {
    const { email } = dto;
    await this.checkEmailExisting(email);
    const tokens = await this.tokenService.generateTokens({ email });
    const user = await this.createUserWithCashPass(dto, tokens);
    return user;
  }

  // ############ LOGIN ############
  async login(dto: LoginUserDto): Promise<ReturnUserType> {
    const user = await this.userService.getUserByEMail(dto.email);
    if (!user) {
      throw new UnauthorizedException('E-mail aren`t valid');
    }

    const { name, email, password } = user;
    await this.comparePasswords(dto.password, password);
    const tokens = await this.tokenService.generateTokens({ email });
    await this.userService.addToken(email, tokens.refreshToken);
    return { name, email, ...tokens };
  }

  // ############ LOGOUT ############
  async logout(email: string): Promise<void> {
    await this.userService.removeToken(email);
  }

  // ############ REFRESH ############
  async refresh(email: string, refreshToken: string): Promise<Token> {
    const { token } = await this.userService.getUserByEMail(email);
    if (!token) {
      throw new UnauthorizedException('You have to sign in');
    }

    if (token !== refreshToken) {
      throw new UnauthorizedException('Token aren`t valid');
    }

    const accessToken = this.tokenService.getToken({ email }, 'access');
    return { accessToken };
  }

  // ############ PRIVATE METHODTS ############
  private async checkEmailExisting(email: string): Promise<void> {
    const candidat = await this.userService.getUserByEMail(email);
    if (candidat) {
      throw new ConflictException('E-mail already in use');
    }
  }

  private async createUserWithCashPass(dto: CreateUserDto, tokens: Tokens) {
    const hashPassword: string = await bcrypt.hash(dto.password, 10);

    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
      token: tokens.refreshToken,
    });

    return { name: user.name, email: user.email, ...tokens };
  }

  private async comparePasswords(
    password: string,
    hashPassword: string,
  ): Promise<void> {
    const isPasswordsEquals = await bcrypt.compare(password, hashPassword);
    if (!isPasswordsEquals) {
      throw new UnauthorizedException('Password aren`t valid');
    }
  }
}
