import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Disc, 
  BookOpen, 
  UserCheck, 
  Sparkles 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const ProfessorExperienceSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-[#E4EAE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#DDEAE5]/70 px-4 py-1.5 rounded-full border border-[#B8D3CA] text-xs font-semibold text-[#1E3A34]">
            <Sparkles className="w-3.5 h-3.5 text-[#2D5A50]" />
            <span>Professor & Amaliyotchi Psixolog</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#182321] tracking-tight">
            Ta’lim va klinik amaliyot — bitta platformada
          </h2>

          <p className="text-base sm:text-lg text-[#66736F] font-sans font-light leading-relaxed">
            Professor-o‘qituvchi bir vaqtning o‘zida dars jarayonlarini, psixologik konsultatsiyalarini va o‘quv kontentini yagona profil orqali boshqaradi.
          </p>
        </div>

        {/* 3 Capability Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          <div className="bg-[#EEF5F2] border border-[#D2E4DC] rounded-[28px] p-8 flex flex-col justify-between hover:shadow-card transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white text-[#1E3A34] flex items-center justify-center shadow-subtle mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#182321] mb-3">
                Dars bering
              </h3>
              <p className="text-sm text-[#66736F] font-sans leading-relaxed">
                Universitet talabalariga zamonaviy metodikalar asosida ta’lim bering va qo‘llanmalarni yagona tizimda taqdim eting.
              </p>
            </div>
          </div>

          <div className="bg-[#FDF1EB] border border-[#F8D8C9] rounded-[28px] p-8 flex flex-col justify-between hover:shadow-card transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white text-[#8A381A] flex items-center justify-center shadow-subtle mb-6">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#182321] mb-3">
                Amaliyot o‘tkazing
              </h3>
              <p className="text-sm text-[#66736F] font-sans leading-relaxed">
                Konsultatsiya xonalarida seanslar olib boring, ularni xavfsiz tartibda yozib oling va anonimlashtiring.
              </p>
            </div>
          </div>

          <div className="bg-[#FDF7EA] border border-[#F5E2B8] rounded-[28px] p-8 flex flex-col justify-between hover:shadow-card transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white text-[#7D5A12] flex items-center justify-center shadow-subtle mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#182321] mb-3">
                Bilim ulashing
              </h3>
              <p className="text-sm text-[#66736F] font-sans leading-relaxed">
                Amaliyot yozuvlarini ta’limiy video va keyslarga aylantirib, yosh psixolog mutaxassislarni tayyorlang.
              </p>
            </div>
          </div>
        </div>

        {/* Large Product Mockup of Professor Unified Dashboard */}
        <div className="bg-[#F7F9F8] border border-[#E4EAE7] rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-card space-y-6 max-w-5xl mx-auto">
          {/* Top Bar of Dashboard Mockup */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4EAE7] pb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-[#1E3A34] text-white flex items-center justify-center font-serif font-bold text-xl shadow-sm">
                DK
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-serif font-bold text-[#182321]">
                    Prof. Dilorom Karimova
                  </h4>
                  <Badge variant="teal" size="sm">
                    Professor / Amaliyotchi
                  </Badge>
                </div>
                <p className="text-xs text-[#66736F] font-sans mt-0.5">
                  Psixologiya fanlari doktori • Klinik va amaliy psixologiya kafedrasi
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-sans font-bold text-xs px-4 py-2.5 rounded-full shadow-sm self-start sm:self-auto transition-colors cursor-pointer"
            >
              <Disc className="w-4 h-4 animate-pulse" />
              <span>Yangi seans yozib olish (REC)</span>
            </button>
          </div>

          {/* 2 Distinct Areas: Ta'lim & Amaliyot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Ta'lim faoliyati */}
            <div className="p-5 bg-white rounded-2xl border border-[#E4EAE7] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E4EAE7] pb-3">
                <span className="text-xs font-bold text-[#182321] uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <GraduationCap className="w-4 h-4 text-[#2D5A50]" />
                  1. Ta’lim Faoliyati
                </span>
                <span className="text-xs text-[#1E3A34] font-semibold">Boshqaruv</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 bg-[#EEF5F2] rounded-xl border border-[#D2E4DC]">
                  <p className="text-lg font-serif font-bold text-[#1E3A34]">12 ta</p>
                  <p className="text-[10px] font-sans text-[#66736F] mt-0.5">Videolar</p>
                </div>
                <div className="p-3 bg-[#EEF5F2] rounded-xl border border-[#D2E4DC]">
                  <p className="text-lg font-serif font-bold text-[#1E3A34]">18 ta</p>
                  <p className="text-[10px] font-sans text-[#66736F] mt-0.5">Materiallar</p>
                </div>
                <div className="p-3 bg-[#EEF5F2] rounded-xl border border-[#D2E4DC]">
                  <p className="text-lg font-serif font-bold text-[#1E3A34]">6 ta</p>
                  <p className="text-[10px] font-sans text-[#66736F] mt-0.5">Keyslar</p>
                </div>
              </div>

              <p className="text-xs text-[#66736F] font-sans leading-relaxed">
                Kafedradagi ma’ruzalar, metodik qo‘llanmalar va talabalar uchun o‘quv topshiriqlari.
              </p>
            </div>

            {/* 2. Amaliyot faoliyati */}
            <div className="p-5 bg-white rounded-2xl border border-[#E4EAE7] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E4EAE7] pb-3">
                <span className="text-xs font-bold text-[#182321] uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <UserCheck className="w-4 h-4 text-[#2D5A50]" />
                  2. Amaliyot Faoliyati
                </span>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  203-xona faol
                </span>
              </div>

              <div className="p-3.5 bg-[#F7F9F8] rounded-xl border border-[#E4EAE7] text-xs space-y-1.5 font-sans">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#182321]">Bugungi seans:</span>
                  <span className="font-mono text-[#1E3A34] font-bold bg-[#DDEAE5] px-2 py-0.5 rounded border border-[#B8D3CA]">
                    PT-9012
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#66736F] text-[11px] pt-1">
                  <span>Mavzu: KBT xavotir tahlili</span>
                  <span>14:00 – 14:45</span>
                </div>
              </div>

              <p className="text-xs text-[#66736F] font-sans leading-relaxed">
                Konsultatsiya xonalaridagi amaliy seanslar, yozuvlar va supervizor moderatsiyasi.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
