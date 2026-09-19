import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get()
  async findAll(@Query('method') method?: string) {
    return this.casesService.findAll(method);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.casesService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.casesService.create(body);
  }
}
