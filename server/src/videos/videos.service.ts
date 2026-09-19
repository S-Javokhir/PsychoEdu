import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VideoState } from '@prisma/client';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: string) {
    try {
      const where = status ? { status: status.toUpperCase() as VideoState } : {};
      return await this.prisma.video.findMany({
        where,
        include: { appliedMethods: { orderBy: { seconds: 'asc' } } },
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      return this.getFallbackVideos();
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.video.findUnique({
        where: { id },
        include: { appliedMethods: { orderBy: { seconds: 'asc' } }, reviewLogs: true },
      });
    } catch {
      return this.getFallbackVideos().find((v) => v.id === id) || null;
    }
  }

  async incrementViews(id: string) {
    try {
      return await this.prisma.video.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });
    } catch {
      return { id, incremented: true };
    }
  }

  async create(data: any) {
    try {
      const { appliedMethods, ...videoData } = data;
      return await this.prisma.video.create({
        data: {
          ...videoData,
          appliedMethods: appliedMethods ? { create: appliedMethods } : undefined,
        },
        include: { appliedMethods: true },
      });
    } catch {
      return { id: `vid-${Date.now()}`, ...data };
    }
  }

  private getFallbackVideos() {
    return [
      {
        id: 'vid-001',
        title: 'Anxiety bilan ishlash: Birlamchi kognitiv qayta baholash',
        description: 'Kognitiv-xulq-atvor terapiyasi (CBT) asosida surunkali xavotir va vahima holatidagi mijoz bilan amaliy ishlash metodikasi.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
        duration: '42:18',
        activityType: 'Individual konsultatsiya',
        method: 'KBT (CBT)',
        professor: 'Prof. Dilorom Karimova',
        professorTitle: 'Fan doktori, professor',
        professorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        department: 'Klinik psixologiya kafedrasi',
        recordedDate: '2026-03-02',
        viewCount: 142,
        status: 'Published',
        patientCode: 'PT-9012',
        appliedMethods: [
          { title: 'Terapevtik kontakt va kontrakt', description: 'Mijoz bilan ishonchli muhit yaratish va seans maqsadini belgilash', timestamp: '02:15', seconds: 135 },
          { title: 'Sokratik muloqot va savollar', description: 'Xavotir uyg‘otuvchi fikrlarni oydinlashtirish', timestamp: '12:40', seconds: 760 },
          { title: 'Kognitiv qayta baholash', description: 'Fikrlarning haqiqatga mosligini tekshirish', timestamp: '24:10', seconds: 1450 },
          { title: 'Nafas va relaksatsiya mashqi', description: 'Tana tarangligini yengillashtirish uchun diafragmal nafas', timestamp: '35:20', seconds: 2120 },
        ],
      },
      {
        id: 'vid-002',
        title: 'Faol tinglash va empatiya bildirish texnikalari',
        description: 'Gumanistik yondashuv doirasida psixologik diagnostik suhbatni olib borish va mijoz emotsiyasini aks ettirish.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
        duration: '38:40',
        activityType: 'Birlamchi diagnostika',
        method: 'Faol tinglash & Empatiya',
        professor: 'Dots. Jamshid Aliyev',
        professorTitle: 'PhD, Dotsent',
        professorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
        department: 'Umumiy psixologiya kafedrasi',
        recordedDate: '2026-02-24',
        viewCount: 205,
        status: 'Published',
        patientCode: 'PT-4251',
        appliedMethods: [
          { title: 'Noverbal signallarni o‘qish', description: 'Tana holati va ko‘z kontaktini me’yorda tutish', timestamp: '04:10', seconds: 250 },
          { title: 'Parafraz va qayta ifodalash', description: 'Mijoz aytgan fikrni umumlashtirib qaytarish', timestamp: '15:20', seconds: 920 },
        ],
      },
    ];
  }
}
