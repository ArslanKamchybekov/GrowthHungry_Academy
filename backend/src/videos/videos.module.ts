import { Module } from '@nestjs/common';
import { VideosController } from './controllers/videos/videos.controller';

@Module({
  controllers: [VideosController],
})
export class VideosModule {}
