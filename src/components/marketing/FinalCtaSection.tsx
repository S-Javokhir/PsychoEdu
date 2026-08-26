import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 lg:py-32 bg-[#142A25] text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2D5A50]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-medium text-[#B8D3CA]">
          <Sparkles className="w-3.5 h-3.5 text-[#8FB9AC]" />
          <span>Psixologik Ta’limda Yangi Standart</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-normal text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Psixologiyani real amaliyot va tajriba orqali o‘rganing.
        </h2>

        <p className="text-base sm:text-lg text-[#DDEAE5]/90 font-sans font-light max-w-2xl mx-auto leading-relaxed">
          Universitet laboratoriyalarida o‘tkazilayotgan real seanslar, tasdiqlangan video tahlillar va klinik keyslar — barchasi yagona akademik platformada.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#DDEAE5] text-[#142A25] font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Platformaga kirish</span>
            <ArrowRight className="w-4 h-4 text-[#142A25]" />
          </button>
        </div>

        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-[#DDEAE5]/80 font-light">
          <ShieldCheck className="w-4 h-4 text-[#8FB9AC]" />
          <span>Fakultet talabalari va professorlari uchun himoyalangan kirish</span>
        </div>
      </div>
    </section>
  );
};
