import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenPayload, TokenType, Tokens } from './types';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateTokens(payload: TokenPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.getToken(payload, 'access'),
      this.getToken(payload, 'refresh'),
    ]);
    return { accessToken, refreshToken };
  }

  getToken(payload: TokenPayload, type: TokenType): string {
    const secret =
      type === 'access'
        ? process.env.JWT_ACCESS_SECRET
        : process.env.JWT_REFRESH_SECRET;
    const expiresIn = type === 'access' ? 60 * 15 : 60 * 60 * 24 * 7;

    const token = this.jwtService.sign({ payload }, { secret, expiresIn });

    return token;
  }
}
