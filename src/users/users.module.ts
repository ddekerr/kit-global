import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  imports: [JwtModule.register({})],
})
export class UsersModule {}
