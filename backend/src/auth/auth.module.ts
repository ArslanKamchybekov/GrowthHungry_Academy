import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { CacheModule } from '@nestjs/cache-manager';
import { RefreshJwtStrategy } from './refresh-token.strategy';

@Module({
  imports: [
    PassportModule,
    CacheModule.register({
      ttl: 60,
      max: 100,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET ,
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, RefreshJwtStrategy, JwtModule]
})
export class AuthModule {}
