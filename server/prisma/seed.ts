import { PrismaClient, UserRole, UserStatus, CameraState, VideoState, CaseDifficulty } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting PsychoEdu database seed...');

  // 1. Clean existing data
  await prisma.notification.deleteMany();
  await prisma.reviewLog.deleteMany();
  await prisma.videoTimestamp.deleteMany();
  await prisma.video.deleteMany();
  await prisma.material.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.liveSession.deleteMany();
  await prisma.camera.deleteMany();
  await prisma.room.deleteMany();
  await prisma.department.deleteMany();
  await prisma.faculty.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 2. Seed Users
  const student = await prisma.user.create({
    data: {
      email: 'madina.usmonova@psychoedu.uz',
      passwordHash: hashedPassword,
      fullName: 'Madina Usmonova',
      role: UserRole.STUDENT,
      roleLabel: 'Talaba',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      faculty: 'Psixologiya fakulteti',
      department: 'Klinik psixologiya kafedrasi',
      academicYear: '4-kurs',
      groupNumber: '302-guruh',
      studentId: 'ST-2022-8941',
      status: UserStatus.ACTIVE,
    },
  });

  const professor = await prisma.user.create({
    data: {
      email: 'dilorom.karimova@psychoedu.uz',
      passwordHash: hashedPassword,
      fullName: 'Prof. Dilorom Karimova',
      role: UserRole.PROFESSOR,
      roleLabel: 'Professor / Psixolog',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      faculty: 'Psixologiya fakulteti',
      department: 'Klinik psixologiya kafedrasi',
      academicTitle: 'Psixologiya fanlari doktori (DSc), Professor',
      specialization: 'Kognitiv-xulq-atvor terapiyasi (KBT), Depressiya va xavotir sindromi',
      licenseNumber: 'PSY-UZ-2018-0419',
      capabilities: [
        'Akademik ma’ruzalar va seminarlar o‘tkazish',
        'Amaliy psixologik konsultatsiyalar o‘tkazish',
        'Konsultatsiya seanslarini yozib olish (REC)',
        'O‘quv video darslari va materiallarini yaratish',
        'Anonimlashtirilgan klinik keyslar bazasini to‘ldirish',
      ],
      status: UserStatus.ACTIVE,
    },
  });

  const supervisor = await prisma.user.create({
    data: {
      email: 'nigora.toirova@psychoedu.uz',
      passwordHash: hashedPassword,
      fullName: 'Dr. Nigora Toirova',
      role: UserRole.SUPERVISOR,
      roleLabel: 'Kafedra Bosh Supervizori',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      faculty: 'Psixologiya fakulteti',
      department: 'Klinik psixologiya kafedrasi',
      academicTitle: 'Psixologiya fanlari nomzodi, PhD, Dotsent',
      specialization: 'Psixologik superviziya va klinik etika',
      supervisionArea: 'Amaliy seanslar ekspertizasi va kontent moderatsiyasi',
      status: UserStatus.ACTIVE,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'azamat.admin@psychoedu.uz',
      passwordHash: hashedPassword,
      fullName: 'Azamat Shokirov',
      role: UserRole.ADMIN,
      roleLabel: 'Tizim Administratori',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      faculty: 'Universitet Rektorati',
      department: 'Raqamli ta’lim va IT departamenti',
      status: UserStatus.ACTIVE,
    },
  });

  console.log('✅ Users seeded successfully');

  // 3. Seed Faculties & Departments
  const facultyPsy = await prisma.faculty.create({
    data: {
      name: 'Psixologiya fakulteti',
      code: 'PSY-FAC',
      deanName: 'Prof. Rustam Shodiyev',
      departmentsCount: 2,
      studentsCount: 650,
    },
  });

  const deptClinical = await prisma.department.create({
    data: {
      facultyId: facultyPsy.id,
      name: 'Klinik psixologiya kafedrasi',
      code: 'CLIN-PSY',
      headName: 'Prof. Dilorom Karimova',
      professorsCount: 14,
      roomsCount: 4,
    },
  });

  const deptGeneral = await prisma.department.create({
    data: {
      facultyId: facultyPsy.id,
      name: 'Umumiy va amaliy psixologiya kafedrasi',
      code: 'GEN-PSY',
      headName: 'Dots. Jamshid Aliyev',
      professorsCount: 12,
      roomsCount: 3,
    },
  });

  console.log('✅ Faculties & Departments seeded');

  // 4. Seed Rooms
  const room201 = await prisma.room.create({
    data: {
      departmentId: deptClinical.id,
      roomNumber: '201',
      name: 'Individual konsultatsiya xonasi A',
      floor: 2,
      type: 'Individual konsultatsiya',
      capacity: 2,
      status: 'Bo‘sh',
    },
  });

  const room203 = await prisma.room.create({
    data: {
      departmentId: deptClinical.id,
      roomNumber: '203',
      name: 'Individual konsultatsiya xonasi B (Laboratoriya)',
      floor: 2,
      type: 'Individual konsultatsiya',
      capacity: 3,
      isOccupied: true,
      status: 'Mashg‘ulot faol',
    },
  });

  const room305 = await prisma.room.create({
    data: {
      departmentId: deptGeneral.id,
      roomNumber: '305',
      name: 'Guruh psixoterapiyasi zali',
      floor: 3,
      type: 'Guruh terapiyasi',
      capacity: 12,
      status: 'Tayyorlanmoqda',
    },
  });

  console.log('✅ Rooms seeded');

  // 5. Seed Cameras
  const cam01 = await prisma.camera.create({
    data: {
      roomId: room201.id,
      roomNumber: '201',
      name: '201-xona Kamera 1 (Umumiy ko‘rinish)',
      state: CameraState.ONLINE,
      resolution: '1080p (1920x1080)',
      fps: 30,
      cameraType: 'PTZ',
      floor: 2,
      lastActivity: 'Signal barqaror',
      thumbnailUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
    },
  });

  const cam02 = await prisma.camera.create({
    data: {
      roomId: room203.id,
      roomNumber: '203',
      name: '203-xona Kamera 1 (Laboratoriya faol)',
      state: CameraState.LIVE,
      resolution: '1080p (1920x1080)',
      fps: 30,
      cameraType: 'PTZ',
      floor: 2,
      currentActivity: 'KBT amaliy konsultatsiyasi (Xavotir tahlili)',
      currentProfessor: 'Prof. Dilorom Karimova',
      patientCode: 'PT-9012',
      startedAt: '10:32',
      lastActivity: 'Hozir efirda',
      thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    },
  });

  const cam03 = await prisma.camera.create({
    data: {
      roomId: room305.id,
      roomNumber: '305',
      name: '305-xona Kamera (Guruh zali)',
      state: CameraState.PREPARING,
      resolution: '1080p (1920x1080)',
      fps: 30,
      cameraType: 'Panorama',
      floor: 3,
      currentActivity: 'Guruh psixoterapiyasi tayyorgarligi',
      currentProfessor: 'Dots. Jamshid Aliyev',
      startedAt: '15:00 da',
      lastActivity: 'Kutilmoqda',
      thumbnailUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    },
  });

  console.log('✅ Cameras seeded');

  // 6. Seed Live Session
  await prisma.liveSession.create({
    data: {
      cameraId: cam02.id,
      roomId: room203.id,
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
      cameraState: CameraState.LIVE,
    },
  });

  console.log('✅ Live Session seeded');

  // 7. Seed Videos with Timestamps
  const vid1 = await prisma.video.create({
    data: {
      userId: professor.id,
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
      status: VideoState.PUBLISHED,
      patientCode: 'PT-9012',
      educationalObjective: 'Talabalarga avtomatik salbiy fikrlarni aniqlash va sokratik savol berish taktikasini ko‘rsatish.',
      appliedMethods: {
        create: [
          { title: 'Terapevtik kontakt va kontrakt', description: 'Mijoz bilan ishonchli muhit yaratish va seans maqsadini belgilash', timestamp: '02:15', seconds: 135 },
          { title: 'Sokratik muloqot va savollar', description: 'Xavotir uyg‘otuvchi fikrlarni oydinlashtirish', timestamp: '12:40', seconds: 760 },
          { title: 'Kognitiv qayta baholash', description: 'Fikrlarning haqiqatga mosligini tekshirish', timestamp: '24:10', seconds: 1450 },
          { title: 'Nafas va relaksatsiya mashqi', description: 'Tana tarangligini yengillashtirish uchun diafragmal nafas', timestamp: '35:20', seconds: 2120 },
        ],
      },
    },
  });

  const vid2 = await prisma.video.create({
    data: {
      userId: professor.id,
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
      status: VideoState.PUBLISHED,
      patientCode: 'PT-4251',
      appliedMethods: {
        create: [
          { title: 'Noverbal signallarni o‘qish', description: 'Tana holati va ko‘z kontaktini me’yorda tutish', timestamp: '04:10', seconds: 250 },
          { title: 'Parafraz va qayta ifodalash', description: 'Mijoz aytgan fikrni umumlashtirib qaytarish', timestamp: '15:20', seconds: 920 },
        ],
      },
    },
  });

  console.log('✅ Videos & Timestamps seeded');

  // 8. Seed Materials (PDFs)
  await prisma.material.create({
    data: {
      userId: professor.id,
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
  });

  await prisma.material.create({
    data: {
      userId: professor.id,
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
  });

  console.log('✅ Materials seeded');

  // 9. Seed Case Studies
  await prisma.caseStudy.create({
    data: {
      caseNumber: 'Case #024',
      patientCode: 'PT-9012',
      title: 'Surunkali generalizatsiyalangan xavotir buzilishi (GAD) tahlili',
      topic: 'Xavotir va tana tarangligi',
      ageGroup: 'Kattalar (26 yosh)',
      method: 'KBT (Kognitiv-xulq-atvor)',
      difficulty: CaseDifficulty.INTERMEDIATE,
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
  });

  await prisma.caseStudy.create({
    data: {
      caseNumber: 'Case #025',
      patientCode: 'PT-4251',
      title: 'O‘smirlik inqirozi va ota-ona bilan muloqot bloklari',
      topic: 'Emotsional beqarorlik va o‘ziga baho',
      ageGroup: 'O‘smirlar (16 yosh)',
      method: 'Gumanistik va Gestalt',
      difficulty: CaseDifficulty.BEGINNER,
      presentingProblem: 'Mijoz maktabdagi baholar pasayishi, ota-ona tanqidiga keskin hissiy munosabat va o‘zini yolg‘iz his qilishini bildirgan.',
      observedSymptoms: [
        'Tez asabiylashish',
        'Ijtimoiy izolyatsiya',
        'O‘z imkoniyatlariga ishonchsizlik',
      ],
      approachDescription: 'Empatik aks ettirish, bo‘sh stul texnikasi va ota-ona bilan birgalikdagi oilaviy muloqot seansi o‘tkazildi.',
      outcomeSummary: 'O‘smirning o‘z emotsiyalarini ifoda etish ko‘nikmasi oshdi, oiladagi ziddiyatlar kamaydi.',
    },
  });

  console.log('✅ Case studies seeded');

  // 10. Seed Notifications
  await prisma.notification.create({
    data: {
      userId: student.id,
      title: 'Jonli amaliy seans boshlandi',
      message: '203-xonada Prof. Dilorom Karimova KBT amaliyotini boshladi.',
      type: 'live',
      time: '10 daqiqa oldin',
      isRead: false,
      link: '/live',
    },
  });

  await prisma.notification.create({
    data: {
      userId: student.id,
      title: 'Yangi metodik qo‘llanma yuklandi',
      message: 'KBT klinik protokoli PDF shaklida kutubxonaga joylandi.',
      type: 'material',
      time: 'Bugun, 09:15',
      isRead: true,
      link: '/materials',
    },
  });

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
