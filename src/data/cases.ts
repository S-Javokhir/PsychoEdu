import type { CaseStudy } from '../types';

export const mockCases: CaseStudy[] = [
  {
    id: 'case-024',
    caseNumber: 'Case #024',
    patientCode: 'PT-9012',
    title: 'Anxiety bilan murojaat — KBT asosida xavotirni kamaytirish',
    topic: 'Umumiy xavotir sindromi (GAD) va ijtimoiy xavotir',
    ageGroup: 'Kattalar (26 yosh)',
    method: 'Kognitiv-xulq-atvor terapiyasi (CBT)',
    difficulty: 'O‘rta',
    presentingProblem: 'Mijoz so‘nggi 6 oy davomida doimiy asabiylik, kelajakdan qo‘rquv, yurak urishining tezlashishi va uyqusizlikdan shikoyat qilgan. Ish joyida taqdimot qilishdan oldin kuchli sarosima hissi paydo bo‘lishi sababli amaliy psixologik xizmatga murojaat qilgan.',
    observedSymptoms: [
      'Doimiy hadiksirash va mushak tarangligi',
      'Katastrofik fikrlash («Agar xato qilsam, meni ishdan haydashadi»)',
      'Uyquga ketishdagi qiyinchiliklar va tez-tez uyg‘onish',
      'Ijtimoiy vaziyatlardan va mas’uliyatli topshiriqlardan qochish xulq-atvori (avoidance)'
    ],
    approachDescription: 'Terapevt 8 seansdan iborat KBT rejasini ishlab chiqdi. Dastlabki bosqichda xavotir mexanizmi haqida psixoedukatsiya berildi. Sokratik so‘rov vositasida avtomatik salbiy fikrlar aniqlandi va ularning haqiqiyligi tekshirildi. Xavotir ierarxiyasi tuzilib, bosqichma-bosqich ekspozitsiya mashqlari va diafragmal nafas texnikalari o‘rgatildi.',
    outcomeSummary: '8 ta amaliy seansdan so‘ng GAD-7 shkalasi bo‘yicha ko‘rsatkich 16 balldan (yuqori xavotir) 5 ballga (me’yor) tushdi. Mijoz jamoat oldida taqdimot qilishni muvaffaqiyatli amalga oshirdi va o‘z-o‘zini tinchlantirish ko‘nikmalariga ega bo‘ldi.',
    relatedVideoId: 'vid-101',
    relatedMaterialIds: ['mat-001', 'mat-004']
  },
  {
    id: 'case-018',
    caseNumber: 'Case #018',
    patientCode: 'PT-4051',
    title: 'O‘smirlik davridagi moslashuv qiyinchiliklari va agressiv xulq-atvor',
    topic: 'Xulq-atvor buzilishlari va emotsional boshqaruv',
    ageGroup: 'O‘smirlar (15 yosh)',
    method: 'Art-terapiya va Ratsional-emotiv terapiya (REBT)',
    difficulty: 'Murakkab',
    presentingProblem: 'Maktabda tengdoshlari bilan tez-tez ziddiyatlarga kirishish, o‘qituvchilarning tanbehlariga o‘ta agressiv javob qaytarish va dars qoldirish holatlari. Ota-onasi va maktab psixologi tavsiyasi bilan olib kelingan.',
    observedSymptoms: [
      'Impulsiv reaksiyalar va affektiv portlashlar',
      'Hissiyotlarni so‘z bilan ifodalashda qiyinchilik (Aleksitimiya elementlari)',
      'Tashqi olamga nisbatan dushmanlik va ishonchsizlik pozitsiyasi',
      'O‘z-o‘zini past baholash va himoyaviy agressiya'
    ],
    approachDescription: 'Art-terapevtik loyihaviy metodlar (gil bilan ishlash, loyihaviy rasmlar) orqali ichki bostirilgan g‘azab va xavfsizlik ehtiyoji yuzaga chiqarildi. So‘ngra REBT usullari yordamida «Hamma menga dushman» degan irratsional fikrlar tahlil qilindi va empatiya mashqlari kiritildi.',
    outcomeSummary: '10 haftalik integrativ mashg‘ulot natijasida maktabdagi ziddiyatli holatlar soni keskin kamaydi. O‘smir his-tuyg‘ularini jismoniy agressiyasiz, konstruktiv muloqot orqali yetkazishni o‘rgandi.',
    relatedVideoId: 'vid-104',
    relatedMaterialIds: ['mat-002', 'mat-005']
  },
  {
    id: 'case-031',
    caseNumber: 'Case #031',
    patientCode: 'PT-7721',
    title: 'Emotsional so‘nish (Burnout) va motivatsiya yo‘qolishi',
    topic: 'Kasbiy stress va depressiv holat',
    ageGroup: 'Kattalar (32 yosh)',
    method: 'Gestalt yondashuv va KBT kognitiv qayta tuzish',
    difficulty: 'O‘rta',
    presentingProblem: 'Mijoz 5 yillik faol ish faoliyatidan so‘ng surunkali charchoq, sevimli mashg‘ulotlariga qiziqish yo‘qolishi, apatiya va o‘z kasbiy qadr-qimmatiga shubha bilan murojaat qilgan.',
    observedSymptoms: [
      'Surunkali jismoniy va aqliy toliqish',
      'Emotsional befarqlik va depersonalizatsiya belgilari',
      '«Men yetarlicha yaxshi mutaxassis emasman» degan o‘z-o‘zini tanqid',
      'Ish va shaxsiy hayot chegaralarining buzilishi'
    ],
    approachDescription: 'Gestalt terapiyasining «Tana hislarini anglash» va «Hozir va shu yerda» texnikalari orqali charchoq belgilari tan olindi. Shaxsiy chegaralarni o‘rnatish, «Yo‘q» deyish san’ati va dam olish rejimini qayta tiklash bo‘yicha xulq-atvor rejalari tatbiq etildi.',
    outcomeSummary: 'Mijoz o‘z ehtiyojlarini o‘z vaqtida payqashni va ish yuklamasini me’yorlashtirishni yo‘lga qo‘ydi. Emotsional energiya va ishga bo‘lgan qiziqish tiklandi.',
    relatedVideoId: 'vid-105',
    relatedMaterialIds: ['mat-001', 'mat-005']
  },
  {
    id: 'case-009',
    caseNumber: 'Case #009',
    patientCode: 'PT-1190',
    title: 'Vahima xuruji (Panic Attack) bilan birlamchi murojaat',
    topic: 'Vahima buzilishi va agorafobiya',
    ageGroup: 'Yoshlar (21 yosh)',
    method: 'KBT va Krizis intervensiyasi',
    difficulty: 'Boshlang‘ich',
    presentingProblem: 'Jamoat transportida birdaniga havo yetishmasligi, yurakning qattiq urishi, bosh aylanishi va o‘lim qo‘rquvi xuruj qilgan. Shifokorlar somatik kasallik topmagach, psixologik xizmatga yo‘naltirilgan.',
    observedSymptoms: [
      'To‘satdan boshlanuvchi kuchli vahima xurujlari (10-15 daqiqa davom etadi)',
      'Tana belgilarini noto‘g‘ri katastrofik talqin qilish («Yuragim to‘xtab qoladi»)',
      'Jamoat transporti va gavjum joylardan qochish (agorafobiya)',
      'Kutilma xavotiri (Anticipatory anxiety)'
    ],
    approachDescription: 'Mijozga vahima xuruji fiziologik jihatdan zararsiz ekanligi («Ur yoki qoch» reaksiyasi) ilmiy tushuntirildi. Giperventilatsiyani to‘xtatuvchi 4-7-8 nafas olish va tana bilan yerga bog‘lanish (Grounding 5-4-3-2-1) texnikalari mashq qilindi.',
    outcomeSummary: 'Mijoz xuruj paytida o‘zini boshqarishni o‘rgandi. Kutilma xavotiri yo‘qoldi va jamoat transportidan bemalol foydalanishni qayta boshladi.',
    relatedVideoId: 'vid-101',
    relatedMaterialIds: ['mat-004', 'mat-006']
  }
];
