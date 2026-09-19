import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get('live')
  async getLiveSessions() {
    return this.sessionsService.findLiveSessions();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Post()
  async createSession(@Body() body: any) {
    return this.sessionsService.createSession(body);
  }
}
