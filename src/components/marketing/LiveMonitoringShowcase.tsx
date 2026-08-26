import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Radio, 
  ArrowRight, 
  CheckCircle2, 
  Camera, 
  DoorOpen,
  Sparkles 
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';

export const LiveMonitoringShowcase: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGoToLive = () => {
    if (isAuthenticated) {
      navigate('/live');
    } else {
      navigate('/login');
    }
  };

  return (
    <section id="imkoniyatlar" className="py-20 lg:py-28 bg-page border-t border-border-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Benefits & CTA (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-sage-light px-4 py-1.5 rounded-full border border-sage text-xs font-semibold text-deep-teal">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Jonli Efir Monitoringi</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-text-main tracking-tight leading-tight">
              Amaliyotni real vaqtda kuzating
            </h2>

            <p className="text-base sm:text-lg text-text-muted font-sans font-light leading-relaxed">
              Universitetdagi mavjud psixologik laboratoriya mashg‘ulotlarini xavfsiz va qulay interfeys orqali kuzating.
            </p>

            <div className="space-y-3.5 pt-2 font-sans">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main">
                    Jonli mashg‘ulotlarni kuzatish
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    Konsultatsiya xonalarida o‘tkazilayotgan amaliy jarayonlarni uzluksiz tomosha qilish.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main">
                    Xona va faoliyat parametrlari
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    Seans mavzusi, qo‘llanilayotgan metodika va mutaxassis haqida batafsil ma’lumotlar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main">
                    Faqat kuzatish uchun xavfsiz muhit
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    Talabalar uchun etik normalarga to‘liq mos sokin Watch-Only kuzatuv rejimi.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleGoToLive}
                className="inline-flex items-center gap-2 bg-deep-teal hover:bg-teal-700 text-white font-sans font-bold text-sm px-6 py-3.5 rounded-full shadow-card hover:shadow-elevated transition-all duration-200"
              >
                <span>Jonli xonalarni ko‘rish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Realistic Product UI Mockup (7 cols on desktop) */}
          <div className="lg:col-span-7">
            <div className="bg-surface border border-border-ui rounded-[32px] p-6 sm:p-8 shadow-card space-y-5">
              
              {/* Product UI Header bar */}
              <div className="flex items-center justify-between border-b border-border-ui pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-bold text-text-main font-mono">PsychoEdu • Jonli Kuzatuv Paneli</span>
                </div>
                <Badge variant="success" size="sm" dot>
                  1 ta faol efir
                </Badge>
              </div>

              {/* 3 Camera Cards representation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1: LIVE CARD */}
                <Card padded="sm" className="border-teal-300 bg-pastel-sage/50 shadow-subtle flex flex-col justify-between rounded-2xl">
                  <div className="space-y-2.5">
                    <div className="aspect-video bg-neutral-900 rounded-xl overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
                        alt="203-xona Live"
                        className="w-full h-full object-cover opacity-85"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        <Radio className="w-3 h-3 animate-pulse" />
                        <span>LIVE</span>
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        203-xona • Konsultatsiya A
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-text-main line-clamp-1">
                        KBT amaliy seansi (Xavotir tahlili)
                      </p>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        Prof. Dilorom Karimova • PT-9012
                      </p>
                    </div>
                  </div>

                  <div className="pt-2.5 mt-2.5 border-t border-border-ui flex items-center justify-between">
                    <span className="text-[10px] text-emerald-700 font-bold">Efir faol</span>
                    <button
                      type="button"
                      onClick={handleGoToLive}
                      className="text-xs bg-deep-teal hover:bg-teal-700 text-white font-bold px-3 py-1.5 rounded-full transition-colors"
                    >
                      Kuzatish
                    </button>
                  </div>
                </Card>

                {/* 2: ONLINE CARD */}
                <Card padded="sm" className="border-border-ui bg-surface shadow-subtle flex flex-col justify-between rounded-2xl">
                  <div className="space-y-2.5">
                    <div className="aspect-video bg-page rounded-xl border border-border-ui flex flex-col items-center justify-center text-text-muted">
                      <Camera className="w-6 h-6 text-teal-700 mb-1" />
                      <span className="text-[11px] font-mono font-medium">Signal tayyor</span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-text-main">201-xona (Individual)</span>
                        <Badge variant="teal" size="sm">ONLINE</Badge>
                      </div>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        Xona bo‘sh • Seans kutilmoqda
                      </p>
                    </div>
                  </div>

                  <div className="pt-2.5 mt-2.5 border-t border-border-ui text-[10px] text-text-muted flex items-center justify-between font-mono">
                    <span>Avtomatik tayyor</span>
                    <span>1080p HD</span>
                  </div>
                </Card>

                {/* 3: PREPARING CARD (spanning 2 cols) */}
                <Card padded="sm" className="border-border-ui bg-surface shadow-subtle sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-100 shrink-0">
                      <DoorOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-text-main">305-xona (Guruh zali)</span>
                        <span className="bg-amber-50 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-amber-200">
                          TAYYORLANMOQDA
                        </span>
                      </div>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        Dots. Jamshid Aliyev • Guruh psixoterapiyasi (15:00 da)
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoToLive}
                    className="text-xs border border-border-ui hover:border-teal-400 font-bold px-3 py-1.5 rounded-full transition-colors"
                  >
                    Tafsilotlar
                  </button>
                </Card>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
