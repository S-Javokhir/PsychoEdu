import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react';

export const MarketingHeader: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Amaliy yo‘nalishlar', href: '#yonalishlar' },
    { label: 'Qanday ishlaydi?', href: '#qanday-ishlaydi' },
    { label: 'Video kutubxona', href: '#video-kutubxona' },
    { label: 'Fikrlar', href: '#fikrlar' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#142A25]/95 backdrop-blur-md border-b border-white/15 shadow-elevated'
          : 'bg-[#142A25] border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo - Clicking scrolls smoothly to top of page */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3.5 group focus:outline-none cursor-pointer"
          title="Sahifaning boshiga qaytish"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shadow-inner group-hover:bg-white/20 group-hover:scale-105 transition-all duration-200">
            <GraduationCap className="w-5 h-5 text-[#8FB9AC]" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide block leading-tight group-hover:text-[#DDEAE5] transition-colors">
              PsychoEdu
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans font-medium text-[#DDEAE5]/80 block leading-none mt-0.5 tracking-wider uppercase">
              Amaliy Psixologiya Portali
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Asosiy navigatsiya">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs xl:text-sm font-sans font-medium text-white/85 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-full transition-all duration-150 cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#DDEAE5] text-[#142A25] font-sans font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-card hover:shadow-elevated transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Platformaga kirish</span>
            <ArrowRight className="w-4 h-4 text-[#142A25]" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="sm:hidden text-xs bg-white text-[#142A25] font-bold px-3 py-1.5 rounded-full cursor-pointer"
          >
            Kirish
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#142A25]/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 shadow-dropdown">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/login');
              }}
              className="w-full flex items-center justify-center gap-2 bg-white text-[#142A25] font-sans font-bold text-sm py-3 rounded-full shadow-lg cursor-pointer"
            >
              <span>Platformaga kirish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
