import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async findLiveSessions() {
    try {
      const sessions = await this.prisma.liveSession.findMany({
        include: { room: true, camera: true },
        orderBy: { startedAt: 'desc' },
      });
      return sessions;
    } catch {
      return this.getFallbackSessions();
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.liveSession.findUnique({
        where: { id },
        include: { room: true, camera: true },
      });
    } catch {
      return this.getFallbackSessions().find((s) => s.id === id) || null;
    }
  }

  async createSession(data: any) {
    try {
      return await this.prisma.liveSession.create({ data });
    } catch {
      return { id: `session-${Date.now()}`, ...data };
    }
  }

  private getFallbackSessions() {
    return [
      {
        id: 'live-203',
        cameraId: 'cam-02',
        roomNumber: '203',
        title: 'Anxiety bilan ishlash: Birlamchi kognitiv qayta baholash',
        activityType: 'Individual konsultatsiya',
        psychologicalMethod: 'KBT (Kognitiv-xulq-atvor terapiyasi)',
        professorName: 'Prof. Dilorom Karimova',
        professorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        professorTitle: 'Klinik psixologiya kafedrasi professori',
        patientCode: 'PT-9012',
        startedAt: '10:32',
        viewerCount: 28,
        description: 'Mijozdagi surunkali xavotir va tana tarangligini pasaytirish bo‘yicha kognitiv qayta baholash va sokratik muloqot seansi.',
        sessionObjectives: [
          'Mijoz bilan ishonchli terapevtik kontakt ("rapport") o‘rnatish',
          'Avtomatik salbiy fikrlarni aniqlash va yozib borish',
          'Xavotir darajasini baholash (1-10 shkalasi)',
          'Keyingi mashg‘ulot uchun uy vazifasini shakllantirish',
        ],
        cameraState: 'Live',
      },
    ];
  }
}
