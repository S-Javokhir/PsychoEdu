import type { Video } from '../types';

export const mockVideos: Video[] = [
  {
    id: 'vid-101',
    title: 'Anxiety bilan ishlash (Xavotir buzilishida KBT yondashuvi)',
    description: 'Birlamchi xavotir sindromi bo‘lgan bemor bilan kognitiv-xulq-atvor terapiyasi usullarining amaliy qo‘llanilishi. Sokratik savollar va xatti-harakat tajribalari batafsil ko‘rsatilgan.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    duration: '48:15',
    activityType: 'Individual konsultatsiya',
    method: 'KBT (Kognitiv-xulq-atvor)',
    professor: 'Prof. Dilorom Karimova',
    professorTitle: 'Psixologiya fanlari doktori, Professor',
    professorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Klinik va amaliy psixologiya kafedrasi',
    recordedDate: '18 Fevral, 2026',
    viewCount: 342,
    status: 'Published',
    appliedMethods: [
      {
        title: 'Psixoedukatsiya va xavotir fiziologiyasini tushuntirish',
        description: 'Mijozga xavotir paytidagi adrenergik reaksiyalar va tana belgilari haqida ilmiy tushuncha berish.',
        timestamp: '04:12'
      },
      {
        title: 'Avtomatik salbiy fikrlarni ajratib olish (ANF)',
        description: '«Agar men imtihondan o‘ta olmasam, hayotim tugaydi» degan fikrni tahlil qilish.',
        timestamp: '18:40'
      },
      {
        title: 'Kognitiv qayta tuzish (Re-framing)',
        description: 'Ehtimollik xatoligi va katastrofizatsiyani tuzatish orqali ratsional muqobil taklif etish.',
        timestamp: '32:15'
      },
      {
        title: 'Diafragmal nafas olish mashqi',
        description: 'Parasimpatik asab tizimini faollashtiruvchi tana mashg‘uloti.',
        timestamp: '41:50'
      }
    ],
    relatedMaterialIds: ['mat-001', 'mat-004'],
    relatedCaseId: 'case-024',
  },
  {
    id: 'vid-102',
    title: 'Psixologik konsultatsiyada faol tinglash va empatiya texnikasi',
    description: 'Konsultatsiyaning dastlabki 15 daqiqasida mijoz bilan ishonchli munosabat (rapport) o‘rnatish, parafrazlash va his-tuyg‘ularni aks ettirish usullari namoyishi.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
    duration: '35:40',
    activityType: 'Individual konsultatsiya',
    method: 'Faol tinglash va Gumanistik',
    professor: 'Dots. Jamshid Aliyev',
    professorTitle: 'Psixologiya fanlari nomzodi, Dotsent',
    professorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    department: 'Ijtimoiy psixologiya kafedrasi',
    recordedDate: '12 Fevral, 2026',
    viewCount: 512,
    status: 'Published',
    appliedMethods: [
      {
        title: 'Verbal bo‘lmagan muloqot va ochiq poza',
        description: 'Ko‘z kontakti, bosh tebratish va masofa saqlash etiketini qo‘llash.',
        timestamp: '02:30'
      },
      {
        title: 'Parafrazlash (So‘zlarni o‘zgartirib takrorlash)',
        description: 'Mijoz aytgan asosiy g‘oyani aniqlashtirish uchun takrorlash.',
        timestamp: '14:20'
      },
      {
        title: 'Tuyg‘ularni nomlash (Affect Labeling)',
        description: 'Mijozning so‘zlar ortidagi norozilik va xafa bo‘lish hissini tan olish.',
        timestamp: '25:10'
      }
    ],
    relatedMaterialIds: ['mat-002'],
    relatedCaseId: 'case-018',
  },
  {
    id: 'vid-103',
    title: 'CBT asosida birlamchi konsultatsiya va terapevtik kontrakt tuzish',
    description: 'Birinchi uchrashuv tuzilmasi: muammoni aniqlashtirish, maqsadlarni shakllantirish, muddat va majburiyatlarni kelishib olish (kontrakt).',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80',
    duration: '52:10',
    activityType: 'Birlamchi diagnostika',
    method: 'KBT (Kognitiv-xulq-atvor)',
    professor: 'Prof. Dilorom Karimova',
    professorTitle: 'Psixologiya fanlari doktori, Professor',
    professorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Klinik va amaliy psixologiya kafedrasi',
    recordedDate: '04 Fevral, 2026',
    viewCount: 428,
    status: 'Published',
    appliedMethods: [
      {
        title: 'Anamnez va birlamchi so‘rovnoma to‘ldirish',
        description: 'Shikoyatlarning davomiyligi va chuqurligini aniqlash.',
        timestamp: '06:15'
      },
      {
        title: 'SMART tamoyili bo‘yicha maqsad belgilash',
        description: 'Mijoz bilan birgalikda o‘lchanadigan terapevtik maqsadlarni yozish.',
        timestamp: '28:40'
      }
    ],
    relatedMaterialIds: ['mat-001', 'mat-003'],
    relatedCaseId: 'case-024',
  },
  {
    id: 'vid-104',
    title: 'Bolalarda agressiv xulq-atvor korreksiyasi (Art-terapiya metodikasi)',
    description: '9 yoshli bolada maktabdagi agressiv reaksiyalarni kamaytirish uchun loyihaviy rasm chizish va loy bilan ishlash texnikalari.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
    duration: '42:00',
    activityType: 'Bolalar psixoterapiyasi',
    method: 'Art-terapiya',
    professor: 'Dr. Nigora Toirova',
    professorTitle: 'PhD, Bolalar va o‘smirlar psixologi',
    professorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    department: 'Yosh davrlari psixologiyasi kafedrasi',
    recordedDate: '28 Yanvar, 2026',
    viewCount: 289,
    status: 'Published',
    appliedMethods: [
      {
        title: '«Mening jahlim qanday ko‘rinishda» mavzusida rasm chizish',
        description: 'Ichki g‘azabni proyeksiyalash va xavfsiz ifoda etish.',
        timestamp: '08:10'
      },
      {
        title: 'Plastilin bilan his-tuyg‘uni o‘zgartirish',
        description: 'Agressiv shaklni tinch va xavfsiz shaklga qayta modellashtirish.',
        timestamp: '24:30'
      }
    ],
    relatedMaterialIds: ['mat-002', 'mat-005'],
    relatedCaseId: 'case-018',
  },
  {
    id: 'vid-105',
    title: 'Depressiv holatlarda sokratik savol-javob texnikasi',
    description: 'Umidsizlik va o‘zini ayblash hissiyotlari bo‘lgan mijoz bilan dalillarni tekshirish hamda kognitiv triadaga (O‘zlik, Dunyo, Kelajak) ta’sir o‘tkazish.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    duration: '50:30',
    activityType: 'Individual konsultatsiya',
    method: 'KBT (Kognitiv-xulq-atvor)',
    professor: 'Prof. Dilorom Karimova',
    professorTitle: 'Psixologiya fanlari doktori, Professor',
    professorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Klinik va amaliy psixologiya kafedrasi',
    recordedDate: '15 Yanvar, 2026',
    viewCount: 460,
    status: 'Published',
    appliedMethods: [
      {
        title: 'Boshlang‘ich kayfiyat monitoringi',
        description: 'Bek depressiya shkalasi natijalarini sharhlash.',
        timestamp: '05:00'
      },
      {
        title: 'Sokratik savollar zanjiri',
        description: '«Barcha ishlarim barbod bo‘ldi» degan xulosaga qarshi faktlarni taqqoslash.',
        timestamp: '22:15'
      }
    ],
    relatedMaterialIds: ['mat-001', 'mat-003'],
    relatedCaseId: 'case-031',
  },
  {
    id: 'vid-106',
    title: 'Guruh psixoterapiyasida fasilitatsiya va o‘zaro hamkorlik san’ati',
    description: 'Talabalar guruhida emotsional intellektni rivojlantirish va interpersonal munosabatlardagi to‘siqlarni bartaraf etish bo‘yicha amaliy mashg‘ulot.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
    duration: '56:00',
    activityType: 'Guruh psixoterapiyasi',
    method: 'Guruh terapiyasi va Gestalt',
    professor: 'Dots. Jamshid Aliyev',
    professorTitle: 'Psixologiya fanlari nomzodi, Dotsent',
    professorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    department: 'Ijtimoiy psixologiya kafedrasi',
    recordedDate: '10 Yanvar, 2026',
    viewCount: 315,
    status: 'Published',
    appliedMethods: [
      {
        title: '«Bo‘sh stul» texnikasining guruhdagi modifikatsiyasi',
        description: 'Hal etilmagan munosabatlarni ramziy yakunlash.',
        timestamp: '19:40'
      }
    ],
    relatedMaterialIds: ['mat-002', 'mat-005'],
    relatedCaseId: 'case-031',
  }
];
