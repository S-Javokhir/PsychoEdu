import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { CamerasService } from './cameras.service';

@Controller('cameras')
export class CamerasController {
  constructor(private readonly camerasService: CamerasService) {}

  @Get()
  async findAll() {
    return this.camerasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.camerasService.findOne(id);
  }

  @Patch(':id/state')
  async updateState(@Param('id') id: string, @Body('state') state: string) {
    return this.camerasService.updateState(id, state);
  }
}
