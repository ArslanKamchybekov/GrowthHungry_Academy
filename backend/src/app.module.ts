import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
import { VideosController } from './videos/controllers/videos/videos.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/assets',
    }),
    UsersModule,
    AppModule,
    VideosModule,
  ],
  controllers: [VideosController],
  providers: [],
})
export class AppModule {}
