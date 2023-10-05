import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { ATStrategy, RTStrategy } from './strategies';

@Module({
  providers: [AuthService, ATStrategy, RTStrategy],
  imports: [UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}
