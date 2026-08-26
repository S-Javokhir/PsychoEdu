import React from 'react';
import { ShieldCheck, Lock, UserCheck, Sparkles } from 'lucide-react';

export const PrivacyTrustSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#142A25] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-[#2D5A50]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-medium text-[#B8D3CA]">
            <Sparkles className="w-3.5 h-3.5 text-[#8FB9AC]" />
            <span>Axloqiy va Kasbiy Standartlar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight">
            Ta’lim va maxfiylik uyg‘unligi
          </h2>

          <p className="text-base sm:text-lg text-[#DDEAE5]/90 font-sans font-light leading-relaxed">
            Psixologik amaliyotga oid barcha materiallar faqat ta’lim maqsadida, 100% anonimlashtirilgan va nazorat qilinadigan shaklda taqdim etiladi.
          </p>
        </div>

        {/* 3 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-white/10 border border-white/20 rounded-[28px] p-8 backdrop-blur-md flex flex-col justify-between hover:bg-white/15 transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#2D5A50]/40 text-[#8FB9AC] flex items-center justify-center border border-white/15 mb-6">
                <UserCheck className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-serif text-white mb-3">
                Anonimlashtirilgan bemorlar
              </h3>

              <p className="text-sm text-[#DDEAE5]/80 font-sans font-light leading-relaxed mb-6">
                Bemorlarning ismi, familiyasi yoki shaxsiy ma’lumotlari mutlaqo e’lon qilinmaydi. Barcha amaliyotlar faqat shifrlangan identifikatorlar orqali yuritiladi.
              </p>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-[#B8D3CA] font-sans">
              <span>Namuna kodi:</span>
              <span className="font-mono font-bold bg-white/15 px-3 py-1 rounded-full text-white border border-white/20">
                PT-9012
              </span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white/10 border border-white/20 rounded-[28px] p-8 backdrop-blur-md flex flex-col justify-between hover:bg-white/15 transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#2D5A50]/40 text-[#8FB9AC] flex items-center justify-center border border-white/15 mb-6">
                <Lock className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-serif text-white mb-3">
                Yopiq akademik muhit
              </h3>

              <p className="text-sm text-[#DDEAE5]/80 font-sans font-light leading-relaxed mb-6">
                Platformadagi barcha kontent faqat universitet talabalari va professor-o‘qituvchilari uchun shaxsiy autentifikatsiya orqali yopiq muhitda taqdim etiladi.
              </p>
            </div>

            <div className="pt-4 border-t border-white/15 text-xs text-[#B8D3CA] font-sans">
              Universitet ichki tarmog‘i
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white/10 border border-white/20 rounded-[28px] p-8 backdrop-blur-md flex flex-col justify-between hover:bg-white/15 transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#2D5A50]/40 text-[#8FB9AC] flex items-center justify-center border border-white/15 mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-serif text-white mb-3">
                Supervizor ekspertizasi
              </h3>

              <p className="text-sm text-[#DDEAE5]/80 font-sans font-light leading-relaxed mb-6">
                Yozib olingan materiallar talabalar uchun e’lon qilinishidan oldin kafedra bosh supervizori tomonidan ko‘rib chiqiladi va tasdiqlanadi.
              </p>
            </div>

            <div className="pt-4 border-t border-white/15 text-xs text-[#B8D3CA] font-sans">
              Ekspertiza va moderatsiya
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
