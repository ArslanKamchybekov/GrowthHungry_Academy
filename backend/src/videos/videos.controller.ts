import { Controller, Get } from '@nestjs/common';

@Controller('videos')
export class VideosController {
  @Get()
  getVideos() {
    const videos = [
      {
        id: '1',
        title: 'Sample Video 1',
        url: 'http://localhost:4000/assets/sample1.mp4',
      },
      {
        id: '2',
        title: 'Sample Video 2',
        url: 'http://localhost:4000/assets/sample2.mp4',
      },
      {
        id: '3',
        title: 'Sample Video 3',
        url: 'http://localhost:4000/assets/sample3.mp4',
      },
    ];

    return videos;
  }
}
