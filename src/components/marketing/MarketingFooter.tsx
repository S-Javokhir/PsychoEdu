import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export const MarketingFooter: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (href === '#bosh-sahifa' || href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <footer className="bg-[#0E1D19] text-white py-16 lg:py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand Col (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#8FB9AC] group-hover:scale-105 transition-all">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-white tracking-wide block leading-tight group-hover:text-[#DDEAE5] transition-colors">
                  PsychoEdu
                </span>
                <span className="text-[11px] font-sans font-medium text-[#DDEAE5]/70 block leading-none mt-0.5 tracking-wider uppercase">
                  Amaliy Psixologiya Portali
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#DDEAE5]/75 font-sans font-light leading-relaxed max-w-sm">
              Universitet psixologiya fakulteti talabalari, amaliyotchi professorlar va supervizorlar uchun yaratilgan raqamli ta’lim ekotizimi.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs text-[#B8D3CA]">
                <ShieldCheck className="w-4 h-4 text-[#8FB9AC]" />
                <span>100% Maxfiylik va Etika Kafolatlangan</span>
              </span>
            </div>
          </div>

          {/* Col 1: Sahifalar (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8FB9AC]">
              Navigatsiya
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DDEAE5]/80 font-sans font-light">
              <li>
                <a
                  href="#bosh-sahifa"
                  onClick={(e) => handleScrollTo(e, '#bosh-sahifa')}
                  className="hover:text-white transition-colors"
                >
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a
                  href="#yonalishlar"
                  onClick={(e) => handleScrollTo(e, '#yonalishlar')}
                  className="hover:text-white transition-colors"
                >
                  Amaliy yo‘nalishlar
                </a>
              </li>
              <li>
                <a
                  href="#qanday-ishlaydi"
                  onClick={(e) => handleScrollTo(e, '#qanday-ishlaydi')}
                  className="hover:text-white transition-colors"
                >
                  Qanday ishlaydi?
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleScrollTo(e, '#faq')}
                  className="hover:text-white transition-colors"
                >
                  Savol-javoblar
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: O‘quv Resurslari (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8FB9AC]">
              Ta’limiy Baza
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DDEAE5]/80 font-sans font-light">
              <li>
                <Link to="/videos" className="hover:text-white transition-colors">
                  Tasdiqlangan video darslar
                </Link>
              </li>
              <li>
                <Link to="/materials" className="hover:text-white transition-colors">
                  Metodik protokollar va PDF
                </Link>
              </li>
              <li>
                <Link to="/cases" className="hover:text-white transition-colors">
                  Anonimlashtirilgan klinik keyslar
                </Link>
              </li>
              <li>
                <Link to="/live" className="hover:text-white transition-colors">
                  Jonli xonalar monitoringi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Kirish va Aloqa (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8FB9AC]">
              Tizimga Kirish
            </h4>
            <p className="text-xs text-[#DDEAE5]/70 font-sans font-light leading-relaxed">
              Talabalar, professorlar va supervizorlar shaxsiy kabinetiga kirish:
            </p>
            <div className="pt-1">
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-white text-[#142A25] font-sans font-bold text-xs rounded-full hover:bg-[#DDEAE5] transition-colors shadow-sm"
              >
                Platformaga kirish
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DDEAE5]/60 font-sans font-light">
          <p>© 2026 PsychoEdu. Universitet psixologiya ta’lim portali.</p>
          <div className="flex items-center gap-1.5 text-[#DDEAE5]/60">
            <span>Amaliyot va fan uyg‘unligi bilan yaratilgan</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </div>
        </div>

      </div>
    </footer>
  );
};
