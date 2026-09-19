import { Controller, Get, Param, Patch, Post, Body, Query, Res, Req, HttpStatus } from '@nestjs/common';
import { VideosService } from './videos.service';
import type { Response, Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async findAll(@Query('status') status?: string) {
    return this.videosService.findAll(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch(':id/view')
  async incrementViews(@Param('id') id: string) {
    return this.videosService.incrementViews(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.videosService.create(body);
  }

  @Get(':id/stream')
  async streamVideo(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    const video = await this.videosService.findOne(id);
    const storageDir = process.env.STORAGE_DIR || path.join(process.cwd(), 'storage', 'videos');
    const localVideoFile = path.join(storageDir, `${id}.mp4`);

    // If actual file exists on university server storage, stream it using HTTP 206
    if (fs.existsSync(localVideoFile)) {
      const stat = fs.statSync(localVideoFile);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(localVideoFile, { start, end });

        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };

        res.writeHead(HttpStatus.PARTIAL_CONTENT, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(HttpStatus.OK, head);
        fs.createReadStream(localVideoFile).pipe(res);
      }
    } else {
      // Demo streaming placeholder redirect or standard high quality mock stream
      return res.redirect('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    }
  }
}
