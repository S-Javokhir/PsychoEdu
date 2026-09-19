import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('faculties')
  async getFaculties() {
    return this.adminService.getFaculties();
  }

  @Get('departments')
  async getDepartments() {
    return this.adminService.getDepartments();
  }

  @Get('rooms')
  async getRooms() {
    return this.adminService.getRooms();
  }

  @Post('rooms')
  async createRoom(@Body() body: any) {
    return this.adminService.createRoom(body);
  }

  @Patch('rooms/:id')
  async updateRoom(@Param('id') id: string, @Body() body: any) {
    return this.adminService.updateRoom(id, body);
  }
}
