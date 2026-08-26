import React from 'react';
import { PlayCircle, FileText, CheckCircle2, Sparkles } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="qanday-ishlaydi" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#DDEAE5]/70 px-4 py-1.5 rounded-full border border-[#B8D3CA] text-xs font-semibold text-[#1E3A34]">
            <Sparkles className="w-3.5 h-3.5 text-[#2D5A50]" />
            <span>Pedagogik va Amaliy Jarayon</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#182321] tracking-tight">
            Amaliyotdan ta’limga qadar 3 bosqich
          </h2>

          <p className="text-base sm:text-lg text-[#66736F] font-sans font-light">
            Universitet laboratoriyalarida o‘tkazilgan seanslarni xavfsiz, sifatli va metodik jihatdan to‘liq o‘quv resursiga aylantiramiz.
          </p>
        </div>

        {/* Feature Story 1: One-Way Mirror Live Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#1E3A34] bg-[#EEF5F2] px-3.5 py-1.5 rounded-lg border border-[#D2E4DC]">
              01 • JONLI MONITORING
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#182321] leading-tight">
              Bir tomonlama ko‘zgu texnologiyasi bilan xalaqitsiz kuzatish
            </h3>

            <p className="text-base text-[#66736F] font-sans leading-relaxed">
              Talabalar konsultatsiya xonasiga kirmasdan va bemorga xalaqit bermasdan, maxsus laboratoriya kameralari orqali psixologning haqiqiy ish uslubini, savol berish taktikasini va noverbal reaksiyalarini jonli efirda kuzatadilar.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-[#182321]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A50] shrink-0 mt-0.5" />
                <span>Konsultatsiya etikasi va to‘liq maxfiylik kafolati</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#182321]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A50] shrink-0 mt-0.5" />
                <span>Bir vaqtning o‘zida bir nechta xonalarni parallel kuzatish imkoniyati</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#182321]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A50] shrink-0 mt-0.5" />
                <span>Talabalar uchun xavfsiz va sokin «Faqat kuzatish» rejimi</span>
              </div>
            </div>
          </div>

          {/* Photo Right (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[32px] overflow-hidden shadow-elevated border border-[#E4EAE7] bg-neutral-950 aspect-[16/11]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=80"
                alt="Jonli psixologik amaliyot monitoringi"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider inline-flex items-center gap-1.5 mb-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Jonli Amaliy Efir
                </span>
                <p className="text-lg font-serif">Kafedra konsultatsiya laboratoriyasi • 203-xona</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Story 2: Video Library & Methods Breakdown (Reversed) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Photo Left (6 cols) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-[32px] overflow-hidden shadow-elevated border border-[#E4EAE7] bg-neutral-950 aspect-[16/11]">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&auto=format&fit=crop&q=80"
                alt="Strukturalangan video kutubxona va psixologik metodik tahlillar"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-[#1E3A34] text-[#DDEAE5] text-[11px] font-bold px-2.5 py-1 rounded-md border border-white/20 uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                  <PlayCircle className="w-3.5 h-3.5 text-[#8FB9AC]" />
                  Metodik Daqiqalar (Timestamps)
                </span>
                <p className="text-lg font-serif">03:10 Sokratik savol-javob • 12:40 Kognitiv qayta tuzish</p>
              </div>
            </div>
          </div>

          {/* Text Right (6 cols) */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#1E3A34] bg-[#EEF5F2] px-3.5 py-1.5 rounded-lg border border-[#D2E4DC]">
              02 • STRUKTURALANGAN KUTUBXONA
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#182321] leading-tight">
              Metodik bosqichlarga ajratilgan video-tahlillar
            </h3>

            <p className="text-base text-[#66736F] font-sans leading-relaxed">
              Har bir amaliy video shunchaki yozuv emas, balki supervizor tomonidan ekspertizadan o‘tkazilgan ta’limiy qo‘llanmadir. Seansda qo‘llanilgan barcha texnikalar daqiqama-daqiqa ajratilgan bo‘lib, bir bosishda kerakli usulni qayta ko‘rish mumkin.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-[#182321]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A50] shrink-0 mt-0.5" />
                <span>Interaktiv vaqt belgilari (Timestamps) orqali to‘g‘ridan-to‘g‘ri metodga o‘tish</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#182321]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A50] shrink-0 mt-0.5" />
                <span>Darsga biriktirilgan amaliy protokollar, anketalar va test materiallari</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#182321]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A50] shrink-0 mt-0.5" />
                <span>Kognitiv, gumanistik, psixoanalitik va oilaviy terapiya usullari filtrlari</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Story 3: Clinical Cases & Ethical Anonymity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#1E3A34] bg-[#EEF5F2] px-3.5 py-1.5 rounded-lg border border-[#D2E4DC]">
              03 • ANONIMLASHTIRILGAN KEYSLAR
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#182321] leading-tight">
              Klinik anamnez va murakkablik darajasidagi keyslar
            </h3>

            <p className="text-base text-[#66736F] font-sans leading-relaxed">
              Mijozlarning shaxsiy daxlsizligini 100% himoya qilgan holda, haqiqiy klinik murojaatlar anonimlashtirilgan o‘quv keyslariga aylantiriladi. Talabalar tashxis qo‘yish, gipoteza tuzish va davolash rejasini tahlil qilishni o‘rganadilar.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-[#182321]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A50] shrink-0 mt-0.5" />
                <span>Anonim bemor kodlari (PT-9012) va shaxsiy ma’lumotlarni to‘liq himoyalash</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#182321]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A50] shrink-0 mt-0.5" />
                <span>Boshlang‘ich, o‘rta va murakkab klinik bosqichlar bo‘yicha toifalar</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#182321]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A50] shrink-0 mt-0.5" />
                <span>Metodik xulosalar, tavsiyalar va supervizor bahosi</span>
              </div>
            </div>
          </div>

          {/* Photo Right (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[32px] overflow-hidden shadow-elevated border border-[#E4EAE7] bg-neutral-950 aspect-[16/11]">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop&q=80"
                alt="Psixologik ta’lim va amaliy keyslar bazasi"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider inline-flex items-center gap-1.5 mb-2 shadow-sm">
                  <FileText className="w-3.5 h-3.5 text-white" />
                  Anonim Ta’limiy Keys
                </span>
                <p className="text-lg font-serif">Anamnez tahlili, gipoteza va terapevtik xulosalar</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
