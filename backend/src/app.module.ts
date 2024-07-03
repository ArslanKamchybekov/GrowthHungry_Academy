import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './users/user.module';
import { VideosModule } from './videos/videos.module';
import { VideosController } from './videos/controllers/videos/videos.controller';
import { UserController } from './users/controllers/users/user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AppModule,
    VideosModule,
  ],
  controllers: [VideosController, UserController],
  providers: [],
})
export class AppModule {}
