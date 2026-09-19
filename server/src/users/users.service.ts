import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(role?: string) {
    try {
      const where = role ? { role: role.toUpperCase() as UserRole } : {};
      return await this.prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          roleLabel: true,
          avatarUrl: true,
          faculty: true,
          department: true,
          academicYear: true,
          groupNumber: true,
          studentId: true,
          academicTitle: true,
          specialization: true,
          licenseNumber: true,
          supervisionArea: true,
          status: true,
          createdAt: true,
        },
      });
    } catch {
      return [];
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch {
      return null;
    }
  }

  async updateProfile(id: string, data: any) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch {
      return null;
    }
  }
}
