import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VideosModule } from './videos/videos.module';
import { VideosController } from './videos/controllers/videos/videos.controller';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    CacheModule.register({
      store: require('cache-manager-redis-store'),
      url: process.env.REDIS_URL,
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    AppModule,
    AuthModule,
    UserModule,
    VideosModule,
  ],
  controllers: [VideosController, AuthController, UserController],
  providers: [],
})
export class AppModule {}
