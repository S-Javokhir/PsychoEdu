import { Controller, Get, Param, Patch, Post, Body, Query, Res, HttpStatus } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import type { Response } from 'express';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  async findAll(@Query('category') category?: string) {
    return this.materialsService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }

  @Patch(':id/download')
  async incrementDownloads(@Param('id') id: string) {
    return this.materialsService.incrementDownloads(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.materialsService.create(body);
  }

  @Get(':id/file')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    await this.materialsService.incrementDownloads(id);
    return res.status(HttpStatus.OK).json({
      message: 'Fayl yuklab olish uchun tayyorlandi',
      downloadUrl: `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`,
    });
  }
}
