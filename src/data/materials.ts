import type { Material } from '../types';

export const mockMaterials: Material[] = [
  {
    id: 'mat-001',
    title: 'CBT asoslari va amaliy mashqlar qo‘llanmasi',
    description: 'Kognitiv-xulq-atvor terapiyasining nazariy poydevori, avtomatik fikrlar kundaligi, xatti-harakatlar tajribasi va sokratik savol berish usullari bo‘yicha to‘liq universitet uslubiy qo‘llanmasi.',
    fileType: 'pdf',
    fileSize: '4.8 MB',
    author: 'Prof. Dilorom Karimova',
    authorTitle: 'Psixologiya fanlari doktori, Professor',
    department: 'Klinik va amaliy psixologiya kafedrasi',
    category: 'Metodik qo‘llanma',
    pagesCount: 68,
    updatedAt: '12 Fevral, 2026',
    downloadCount: 420,
    relatedVideoIds: ['vid-101', 'vid-103', 'vid-105'],
    relatedCaseIds: ['case-024', 'case-031'],
    tableOfContents: [
      '1. CBTning asosiy tamoyillari va kognitiv model',
      '2. Birlamchi konsultatsiya va kontrakt tuzish',
      '3. Avtomatik fikrlarni aniqlash va tekshirish texnikalari',
      '4. Oraliq va tub e’tiqodlar (Intermediate and Core Beliefs)',
      '5. Xatti-harakatlar tajribalari va xavotir ierarxiyasi',
      '6. Amaliy ish daftari shablonlari'
    ],
    summary: 'Ushbu qo‘llanma talabalarga kognitiv-xulq-atvor terapiyasining amaliy vositalaridan to‘g‘ri va tizimli foydalanishni o‘rgatish uchun mo‘ljallangan. Har bir bobda amaliy misollar va dialog namunalari keltirilgan.'
  },
  {
    id: 'mat-002',
    title: 'Psixologik konsultatsiya metodikasi va etika kodeksi',
    description: 'Individual konsultatsiya o‘tkazish bosqichlari, faol tinglash, sir saqlash (konfidensiallik) majburiyatlari va mijoz bilan kasbiy chegaralarni belgilash qoidalari.',
    fileType: 'pdf',
    fileSize: '2.4 MB',
    author: 'Dots. Jamshid Aliyev',
    authorTitle: 'Psixologiya fanlari nomzodi, Dotsent',
    department: 'Ijtimoiy psixologiya kafedrasi',
    category: 'Metodik qo‘llanma',
    pagesCount: 44,
    updatedAt: '05 Fevral, 2026',
    downloadCount: 315,
    relatedVideoIds: ['vid-102', 'vid-104', 'vid-106'],
    relatedCaseIds: ['case-018'],
    tableOfContents: [
      '1. Psixologning kasbiy etikasi va qonuniy javobgarligi',
      '2. Konsultatsiya xonasini jihozlash va xavfsiz muhit',
      '3. Rapport o‘rnatish va verbal bo‘lmagan muloqot',
      '4. Transfer va kontrtransfer holatlari bilan ishlash',
      '5. Seansni yakunlash va kelgusi rejalar'
    ],
    summary: 'Talabalar amaliy mashg‘ulotlar va haqiqiy mijozlar bilan ishlashdan oldin o‘zlashtirishi shart bo‘lgan asosiy axloqiy va metodik qo‘llanma.'
  },
  {
    id: 'mat-003',
    title: 'Birlamchi psixodiagnostika va klinik anamnez yig‘ish shabloni',
    description: 'Mijozning shikoyatlari, oilaviy tarixi, somatik holati, ruhiy statusi va hayotiy qiyinchiliklarini tizimli qayd etish uchun rasmiy kafedra shabloni.',
    fileType: 'docx',
    fileSize: '840 KB',
    author: 'Prof. Dilorom Karimova',
    authorTitle: 'Psixologiya fanlari doktori, Professor',
    department: 'Klinik va amaliy psixologiya kafedrasi',
    category: 'Diagnostika shabloni',
    pagesCount: 8,
    updatedAt: '25 Yanvar, 2026',
    downloadCount: 580,
    relatedVideoIds: ['vid-103', 'vid-105'],
    relatedCaseIds: ['case-024', 'case-009'],
    tableOfContents: [
      '1. Umumiy demografik ma’lumotlar (Anonimlashtirilgan)',
      '2. Asosiy murojaat sababi va mijoz so‘zlari',
      '3. Muammoning dinamikasi va paydo bo‘lish davri',
      '4. Oila va ijtimoiy muhit tahlili',
      '5. Dastlabki psixologik gipoteza va rejalashtirilgan metodlar'
    ],
    summary: 'Amaliy mashg‘ulotlarda keyslarni tahlil qilish va ta’limiy hisobot tayyorlash uchun foydalaniladigan standart hujjat formati.'
  },
  {
    id: 'mat-004',
    title: 'Anxiety (Xavotir) darajasini baholash protokollari (GAD-7 va Bek shkalasi)',
    description: 'Xavotir va fobiya belgilarining og‘irlik darajasini miqdoriy baholash, ballarni hisoblash hamda interpretatsiya qilish protokoli.',
    fileType: 'pdf',
    fileSize: '1.6 MB',
    author: 'Prof. Dilorom Karimova',
    authorTitle: 'Psixologiya fanlari doktori, Professor',
    department: 'Klinik va amaliy psixologiya kafedrasi',
    category: 'Protokol',
    pagesCount: 16,
    updatedAt: '18 Yanvar, 2026',
    downloadCount: 490,
    relatedVideoIds: ['vid-101'],
    relatedCaseIds: ['case-024', 'case-009'],
    tableOfContents: [
      '1. GAD-7 shkalasi va to‘ldirish yo‘riqnomasi',
      '2. Bek xavotir so‘rovnomasi (BAI)',
      '3. Normativ ko‘rsatkichlar va chegara ballari',
      '4. Dinamikani qayta baholash grafigi'
    ],
    summary: 'Xavotir buzilishlarini tezkor va ishonchli skrining qilish bo‘yicha standartlashtirilgan psixologik o‘lchov vositasi.'
  },
  {
    id: 'mat-005',
    title: 'Emotsional holatni boshqarish va relaksatsiya texnikalari taqdimoti',
    description: 'Jekobson bo‘yicha progressiv mushak relaksatsiyasi, kognitiv e’tiborni chalg‘itish va vizualizatsiya mashqlari bo‘yicha ko‘rgazmali o‘quv taqdimoti.',
    fileType: 'pptx',
    fileSize: '12.2 MB',
    author: 'Dr. Nigora Toirova',
    authorTitle: 'PhD, Bolalar va o‘smirlar psixologi',
    department: 'Yosh davrlari psixologiyasi kafedrasi',
    category: 'Taqdimot',
    pagesCount: 32,
    updatedAt: '10 Yanvar, 2026',
    downloadCount: 260,
    relatedVideoIds: ['vid-104', 'vid-106'],
    relatedCaseIds: ['case-018', 'case-031'],
    tableOfContents: [
      '1. Stress va tana reaksiyalarining neyrobiologiyasi',
      '2. Diafragmal nafas mashqlari bosqichlari',
      '3. Jekobson progressiv relaksatsiyasi qo‘llanmasi',
      '4. «Xavfsiz joy» vizualizatsiya texnikasi'
    ],
    summary: 'Darslarda va individual mashg‘ulotlarda tushuntirish uchun qulay, yuqori sifatli infografika va sxemalarga ega taqdimot.'
  },
  {
    id: 'mat-006',
    title: 'Krizis holatlarida birlamchi psixologik yordam algoritmi',
    description: 'O‘tkir stress reaksiyalari, psixologik travma va vahima xuruji paytida zudlik bilan qo‘llaniladigan standart harakatlar algoritmi.',
    fileType: 'pdf',
    fileSize: '3.1 MB',
    author: 'Dots. Jamshid Aliyev',
    authorTitle: 'Psixologiya fanlari nomzodi, Dotsent',
    department: 'Ijtimoiy psixologiya kafedrasi',
    category: 'Protokol',
    pagesCount: 24,
    updatedAt: '02 Yanvar, 2026',
    downloadCount: 385,
    relatedVideoIds: ['vid-101'],
    relatedCaseIds: ['case-009'],
    tableOfContents: [
      '1. Krizis holatini tezkor baholash',
      '2. «Yer bilan bog‘lanish» (Grounding 5-4-3-2-1) texnikasi',
      '3. Emotsional dekompensatsiya paytidagi muloqot qoidalari',
      '4. Mutaxassisga yo‘naltirish mezonlari'
    ],
    summary: 'Shoshilinch vaziyatlarda talabalar va yosh mutaxassislar uchun ixcham hamda aniq harakatlar xaritasi.'
  }
];
