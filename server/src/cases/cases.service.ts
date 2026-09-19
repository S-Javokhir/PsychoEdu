import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CasesService {
  constructor(private prisma: PrismaService) {}

  async findAll(method?: string) {
    try {
      const where = method && method !== 'Barchasi' ? { method: { contains: method, mode: 'insensitive' as any } } : {};
      return await this.prisma.caseStudy.findMany({
        where,
        orderBy: { caseNumber: 'asc' },
      });
    } catch {
      return this.getFallbackCases();
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.caseStudy.findUnique({ where: { id } });
    } catch {
      return this.getFallbackCases().find((c) => c.id === id) || null;
    }
  }

  async create(data: any) {
    try {
      return await this.prisma.caseStudy.create({ data });
    } catch {
      return { id: `case-${Date.now()}`, ...data };
    }
  }

  private getFallbackCases() {
    return [
      {
        id: 'case-001',
        caseNumber: 'Case #024',
        patientCode: 'PT-9012',
        title: 'Surunkali generalizatsiyalangan xavotir buzilishi (GAD) tahlili',
        topic: 'Xavotir va tana tarangligi',
        ageGroup: 'Kattalar (26 yosh)',
        method: 'KBT (Kognitiv-xulq-atvor)',
        difficulty: 'O‘rta',
        presentingProblem: 'Mijoz 8 oydan beri har qanday mayda voqealardan qattiq bezovtalanish, uyqu buzilishi va mushak qotishidan shikoyat qilgan.',
        observedSymptoms: [
          'Doimiy hadiksirash hissi',
          'Ko‘krak qafasida og‘irlik',
          'Uyqusizlik (kechalari tez-tez uyg‘onish)',
          'Diqqatni bir joyga jamlash qiyinligi',
        ],
        approachDescription: 'Avtomatik katastrofik fikrlarni aniqlash, sokratik so‘roq qilish va nafas mashqlari orqali relaksatsiya o‘rgatildi.',
        outcomeSummary: '4 ta seansdan so‘ng xavotir darajasi 8 balldan 4 ballgacha pasaydi, uyqu maromi tiklandi.',
      },
      {
        id: 'case-002',
        caseNumber: 'Case #025',
        patientCode: 'PT-4251',
        title: 'O‘smirlik inqirozi va ota-ona bilan muloqot bloklari',
        topic: 'Emotsional beqarorlik va o‘ziga baho',
        ageGroup: 'O‘smirlar (16 yosh)',
        method: 'Gumanistik va Gestalt',
        difficulty: 'Boshlang‘ich',
        presentingProblem: 'Mijoz maktabdagi baholar pasayishi, ota-ona tanqidiga keskin hissiy munosabat va o‘zini yolg‘iz his qilishini bildirgan.',
        observedSymptoms: [
          'Tez asabiylashish',
          'Ijtimoiy izolyatsiya',
          'O‘z imkoniyatlariga ishonchsizlik',
        ],
        approachDescription: 'Empatik aks ettirish, bo‘sh stul texnikasi va ota-ona bilan birgalikdagi oilaviy muloqot seansi o‘tkazildi.',
        outcomeSummary: 'O‘smirning o‘z emotsiyalarini ifoda etish ko‘nikmasi oshdi, oiladagi ziddiyatlar kamaydi.',
      },
    ];
  }
}
