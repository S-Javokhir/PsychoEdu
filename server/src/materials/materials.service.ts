import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaterialsService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string) {
    try {
      const where = category && category !== 'Barchasi' ? { category } : {};
      return await this.prisma.material.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
      });
    } catch {
      return this.getFallbackMaterials();
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.material.findUnique({ where: { id } });
    } catch {
      return this.getFallbackMaterials().find((m) => m.id === id) || null;
    }
  }

  async incrementDownloads(id: string) {
    try {
      return await this.prisma.material.update({
        where: { id },
        data: { downloadCount: { increment: 1 } },
      });
    } catch {
      return { id, downloaded: true };
    }
  }

  async create(data: any) {
    try {
      return await this.prisma.material.create({ data });
    } catch {
      return { id: `mat-${Date.now()}`, ...data };
    }
  }

  private getFallbackMaterials() {
    return [
      {
        id: 'mat-001',
        title: 'CBT asosida konsultatsiya o‘tkazish bo‘yicha klinik protokol',
        description: 'Kognitiv-xulq-atvor terapiyasi bo‘yicha bosqichma-bosqich qo‘llanma, birlamchi anketalar va seans tuzilishi.',
        fileType: 'pdf',
        fileSize: '2.4 MB',
        author: 'Prof. Dilorom Karimova',
        authorTitle: 'Fan doktori, professor',
        department: 'Klinik psixologiya kafedrasi',
        category: 'Metodik qo‘llanma',
        pagesCount: 32,
        downloadCount: 88,
        status: 'Published',
        summary: 'KBT seanslarining strukturasi, fikrlar kundaligini to‘ldirish qoidalari va xavotir shkalalari jamlangan.',
        tags: ['KBT', 'Xavotir', 'Protokol', 'Diagnostika'],
      },
      {
        id: 'mat-002',
        title: 'Psixologik diagnostika va birlamchi suhbat shabloni',
        description: 'Mijozning ruhiy holatini baholash uchun maxsus anamnestic so‘rovnoma va qaydlar daftari.',
        fileType: 'pdf',
        fileSize: '1.2 MB',
        author: 'Dots. Jamshid Aliyev',
        authorTitle: 'PhD, Dotsent',
        department: 'Umumiy psixologiya kafedrasi',
        category: 'Diagnostika shabloni',
        pagesCount: 16,
        downloadCount: 124,
        status: 'Published',
        tags: ['Diagnostika', 'Anamnez', 'Birlamchi suhbat'],
      },
    ];
  }
}
