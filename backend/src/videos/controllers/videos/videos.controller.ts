import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('videos')
export class VideosController {
    @Get()
    getVideo(@Res() res: Response) {
        const filePath = path.join(__dirname, '..', '..', '..', 'assets', 'sample.mp4');
        const stat = fs.statSync(filePath);
        res.writeHead(200, {
          'Content-Type': 'video/mp4',
          'Content-Length': stat.size,
        });
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }
}
