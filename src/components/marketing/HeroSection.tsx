import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Camera, 
  ShieldCheck, 
  Users, 
  Award,
  Radio
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleScrollToHowItWorks = () => {
    const el = document.querySelector('#qanday-ishlaydi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="bosh-sahifa" className="relative bg-[#142A25] text-white overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2D5A50]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Main Hero Content */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Editorial Serif Messaging (7 cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-medium text-[#B8D3CA]">
                <Sparkles className="w-3.5 h-3.5 text-[#8FB9AC]" />
                <span>Universitet Psixologiya Fakulteti Amaliy Portali</span>
              </div>

              {/* Main Editorial Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.12]">
                Ruhiy uyg‘unlik va{' '}
                <span className="italic font-serif text-[#8FB9AC]">
                  professional amaliyotni
                </span>{' '}
                jonli tajriba orqali o‘rganing.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-[#DDEAE5]/90 font-sans leading-relaxed max-w-2xl font-light">
                PsychoEdu — talabalar uchun haqiqiy konsultatsiya seanslarini bir tomonlama ko‘zgu texnologiyasida kuzatish, tasdiqlangan video-darslarni tahlil qilish va klinik keyslar bazasidan foydalanish ekotizimi.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#DDEAE5] text-[#142A25] font-sans font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-2xl hover:shadow-elevated transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Platformaga kirish</span>
                  <ArrowRight className="w-4 h-4 text-[#142A25]" />
                </button>

                <button
                  type="button"
                  onClick={handleScrollToHowItWorks}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-sans font-medium text-sm sm:text-base px-6 py-3.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer"
                >
                  <span>Qanday ishlaydi?</span>
                </button>
              </div>

              {/* Quick Trust Points */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#DDEAE5]/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8FB9AC] shrink-0" />
                  <span>100% Etik anonimlik</span>
                </div>
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                  <span>Jonli kuzatuv rejimi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#8FB9AC] shrink-0" />
                  <span>Klinik tasdiqlangan baza</span>
                </div>
              </div>
            </div>

            {/* Right Column: InHarmony-style Asymmetric Photographic Composition (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Large Image: Warm Psychology Consultation Room */}
                <div className="relative rounded-[32px] overflow-hidden border-2 border-white/20 bg-neutral-950 shadow-2xl aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80"
                    alt="Psixologik konsultatsiya xonasi va amaliyot jarayoni"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Discrete Live indicator */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-2 text-white text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <Camera className="w-3.5 h-3.5 text-[#8FB9AC]" />
                    <span>203-xona • Jonli amaliyot</span>
                  </div>

                  {/* Patient Anonymous Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/25 text-white font-mono font-bold text-xs">
                    PT-9012
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-sans uppercase font-bold text-[#8FB9AC] tracking-wider block mb-1">
                      Kognitiv-xulq-atvor terapiyasi (KBT)
                    </span>
                    <p className="text-sm sm:text-base font-serif text-white font-medium line-clamp-1">
                      Xavotir va tushkunlik bilan ishlash bo‘yicha birlamchi seans
                    </p>
                  </div>
                </div>

                {/* Floating Bottom Card: Real-time Student Observation */}
                <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white text-[#182321] p-4 rounded-2xl border border-[#E4EAE7] shadow-2xl items-center gap-3.5 max-w-xs">
                  <div className="w-10 h-10 rounded-full bg-[#F2F7F5] text-[#1E3A34] flex items-center justify-center font-bold shrink-0 border border-[#B8D3CA]">
                    <Users className="w-5 h-5 text-[#1E3A34]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#182321]">
                      18 ta talaba kuzatmoqda
                    </p>
                    <p className="text-[11px] text-[#66736F]">
                      Bir tomonlama ko‘zgu texnologiyasi
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. InHarmony Stats Social Proof Banner */}
      <section className="border-t border-white/15 bg-[#0E1D19] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white">
                56+
              </div>
              <div className="text-xs sm:text-sm font-sans text-[#DDEAE5]/80 mt-1 font-light">
                Malakali professor va amaliyotchilar
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white">
                120+
              </div>
              <div className="text-xs sm:text-sm font-sans text-[#DDEAE5]/80 mt-1 font-light">
                Tahlil qilingan amaliy video seanslar
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white">
                2 400+
              </div>
              <div className="text-xs sm:text-sm font-sans text-[#DDEAE5]/80 mt-1 font-light">
                Fakultet talabalari va mutaxassislar
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white">
                100%
              </div>
              <div className="text-xs sm:text-sm font-sans text-[#DDEAE5]/80 mt-1 font-light">
                Etik va to‘liq maxfiy kuzatuv
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
