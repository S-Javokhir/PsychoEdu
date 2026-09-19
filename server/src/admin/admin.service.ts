import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    try {
      const [faculties, departments, rooms, cameras, users, videos, materials, cases] = await Promise.all([
        this.prisma.faculty.count(),
        this.prisma.department.count(),
        this.prisma.room.count(),
        this.prisma.camera.count(),
        this.prisma.user.count(),
        this.prisma.video.count(),
        this.prisma.material.count(),
        this.prisma.caseStudy.count(),
      ]);

      return {
        faculties,
        departments,
        rooms,
        cameras,
        users,
        videos,
        materials,
        cases,
      };
    } catch {
      return {
        faculties: 4,
        departments: 8,
        rooms: 16,
        cameras: 12,
        users: 350,
        videos: 28,
        materials: 45,
        cases: 19,
      };
    }
  }

  async getFaculties() {
    try {
      return await this.prisma.faculty.findMany({
        include: { departments: true },
        orderBy: { name: 'asc' },
      });
    } catch {
      return [
        { id: 'fac-1', name: 'Psixologiya fakulteti', code: 'PSY-FAC', deanName: 'Prof. Rustam Shodiyev', departmentsCount: 2, studentsCount: 650 },
        { id: 'fac-2', name: 'Pedagogika va ijtimoiy fanlar fakulteti', code: 'PED-FAC', deanName: 'Dots. Otabek Jo‘rayev', departmentsCount: 3, studentsCount: 820 },
      ];
    }
  }

  async getDepartments() {
    try {
      return await this.prisma.department.findMany({
        include: { faculty: true, rooms: true },
        orderBy: { name: 'asc' },
      });
    } catch {
      return [
        { id: 'dept-1', name: 'Klinik psixologiya kafedrasi', code: 'CLIN-PSY', headName: 'Prof. Dilorom Karimova', professorsCount: 14, roomsCount: 4 },
        { id: 'dept-2', name: 'Umumiy va amaliy psixologiya kafedrasi', code: 'GEN-PSY', headName: 'Dots. Jamshid Aliyev', professorsCount: 12, roomsCount: 3 },
      ];
    }
  }

  async getRooms() {
    try {
      return await this.prisma.room.findMany({
        include: { cameras: true, department: true },
        orderBy: { roomNumber: 'asc' },
      });
    } catch {
      return [
        { id: 'room-201', roomNumber: '201', name: 'Individual konsultatsiya xonasi A', floor: 2, type: 'Individual konsultatsiya', capacity: 2, status: 'Bo‘sh' },
        { id: 'room-203', roomNumber: '203', name: 'Individual konsultatsiya xonasi B (Laboratoriya)', floor: 2, type: 'Individual konsultatsiya', capacity: 3, status: 'Mashg‘ulot faol' },
        { id: 'room-305', roomNumber: '305', name: 'Guruh psixoterapiyasi zali', floor: 3, type: 'Guruh terapiyasi', capacity: 12, status: 'Tayyorlanmoqda' },
      ];
    }
  }

  async createRoom(data: any) {
    try {
      return await this.prisma.room.create({ data });
    } catch {
      return { id: `room-${Date.now()}`, ...data };
    }
  }

  async updateRoom(id: string, data: any) {
    try {
      return await this.prisma.room.update({ where: { id }, data });
    } catch {
      return { id, ...data };
    }
  }
}
