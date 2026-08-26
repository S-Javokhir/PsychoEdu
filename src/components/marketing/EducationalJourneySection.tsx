import React from 'react';
import { 
  Video, 
  FileText, 
  FolderGit2, 
  GraduationCap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const EducationalJourneySection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F7F9F8] border-t border-[#E4EAE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#DDEAE5]/70 px-4 py-1.5 rounded-full border border-[#B8D3CA] text-xs font-semibold text-[#1E3A34]">
            <Sparkles className="w-3.5 h-3.5 text-[#2D5A50]" />
            <span>Integrallashgan Ta’lim Zanjiri</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#182321] tracking-tight">
            Bir videodan to‘liq klinik tushunchagacha
          </h2>

          <p className="text-base sm:text-lg text-[#66736F] font-sans font-light">
            Amaliy video, nazariy protokol va klinik keys bir-biriga bog‘lanib, talabaning klinik fikrlashini shakllantiradi.
          </p>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Card 1: Video */}
          <div className="bg-[#EEF5F2] border border-[#D2E4DC] rounded-[28px] p-6 flex flex-col justify-between shadow-subtle hover:shadow-card transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1E3A34] bg-white/90 px-3 py-1 rounded-full border border-[#B8D3CA]">
                  1. Amaliy Video
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white text-[#1E3A34] flex items-center justify-center shadow-subtle">
                  <Video className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-lg font-serif font-bold text-[#182321] mb-2">
                Anxiety bilan ishlash
              </h3>

              <div className="space-y-1.5 text-xs text-[#66736F] font-sans">
                <p>• Davomiyligi: <strong className="text-[#182321] font-mono">42:18</strong></p>
                <p>• Metod: <strong className="text-[#182321]">KBT (CBT)</strong></p>
                <p>• Jonli seans metodikasi</p>
              </div>
            </div>

            <div className="mt-8 pt-3 border-t border-[#D2E4DC] text-xs text-[#1E3A34] font-semibold flex items-center justify-between">
              <span>Vizual kuzatish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Material */}
          <div className="bg-[#FDF1EB] border border-[#F8D8C9] rounded-[28px] p-6 flex flex-col justify-between shadow-subtle hover:shadow-card transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8A381A] bg-white/90 px-3 py-1 rounded-full border border-[#F8D8C9]">
                  2. Nazariy Asos
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white text-[#8A381A] flex items-center justify-center shadow-subtle">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-lg font-serif font-bold text-[#182321] mb-2">
                CBT protokollari
              </h3>

              <div className="space-y-1.5 text-xs text-[#66736F] font-sans">
                <p>• Formati: <strong className="text-[#182321] font-mono">PDF</strong></p>
                <p>• Hajmi: <strong className="text-[#182321] font-mono">2.4 MB</strong> (32 bet)</p>
                <p>• Diagnostika shabloni</p>
              </div>
            </div>

            <div className="mt-8 pt-3 border-t border-[#F8D8C9] text-xs text-[#8A381A] font-semibold flex items-center justify-between">
              <span>Metodik qoidalar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Case */}
          <div className="bg-[#FDF7EA] border border-[#F5E2B8] rounded-[28px] p-6 flex flex-col justify-between shadow-subtle hover:shadow-card transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7D5A12] bg-white/90 px-3 py-1 rounded-full border border-[#F5E2B8]">
                  3. Anonim Keys
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white text-[#7D5A12] flex items-center justify-center shadow-subtle">
                  <FolderGit2 className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-serif font-bold text-[#182321]">
                  Case #024
                </h3>
                <span className="font-mono text-[10px] bg-white text-[#1E3A34] font-bold px-2 py-0.5 rounded-full border border-[#F5E2B8]">
                  PT-9012
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#66736F] font-sans">
                <p>• Murojaat: <strong className="text-[#182321]">Xavotir va tana tarangligi</strong></p>
                <p>• Yosh guruhi: <strong className="text-[#182321]">26 yosh</strong></p>
                <p>• Birlamchi intervensiya</p>
              </div>
            </div>

            <div className="mt-8 pt-3 border-t border-[#F5E2B8] text-xs text-[#7D5A12] font-semibold flex items-center justify-between">
              <span>Klinik tahlil</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Learning Outcome */}
          <div className="bg-[#EBF5F8] border border-[#CFE8EF] rounded-[28px] p-6 flex flex-col justify-between shadow-subtle hover:shadow-card transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#124452] bg-white/90 px-3 py-1 rounded-full border border-[#CFE8EF]">
                  4. Natija
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white text-[#124452] flex items-center justify-center shadow-subtle">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-lg font-serif font-bold text-[#182321] mb-2">
                Mustaqil klinik ko‘nikma
              </h3>

              <p className="text-xs text-[#66736F] font-sans leading-relaxed">
                Talaba seansni ko‘radi, qo‘llanma bilan solishtiradi va keys orqali mustaqil tashxis qo‘yish ko‘nikmasini mustahkamlaydi.
              </p>
            </div>

            <div className="mt-8 pt-3 border-t border-[#CFE8EF] text-xs text-[#124452] font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#2D5A50]" />
              <span>To‘liq kompetensiya</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
