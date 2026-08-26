import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TherapyCategoriesSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGoToResource = () => {
    if (isAuthenticated) {
      navigate('/videos');
    } else {
      navigate('/login');
    }
  };

  const categories = [
    {
      id: 'individual',
      title: 'Individual Konsultatsiya',
      subhead: 'O‘zim uchun',
      description: 'Kognitiv-xulq-atvor (KBT), gumanistik va psixoanalitik yondashuvda shaxsiy krizislar, xavotir, depressiya va o‘z-o‘zini anglash seanslari.',
      icon: User,
      bgColor: 'bg-[#EEF5F2]',
      borderColor: 'border-[#D2E4DC]',
      textColor: 'text-[#1E3A34]',
      tagColor: 'bg-[#DDEAE5] text-[#1E3A34]',
      badge: 'Eng ko‘p ko‘rilgan',
    },
    {
      id: 'couples',
      title: 'Juftlik va Oila Terapiyasi',
      subhead: 'Hamkor va oila uchun',
      description: 'Oilaviy ziddiyatlar, munosabatlardagi emotsional uzilishlar, er-xotin muloqotini tiklash va tizimli oilaviy terapiya usullari tahlili.',
      icon: Users,
      bgColor: 'bg-[#FDF1EB]',
      borderColor: 'border-[#F8D8C9]',
      textColor: 'text-[#8A381A]',
      tagColor: 'bg-[#FCE1D5] text-[#8A381A]',
      badge: 'Amaliy keyslar',
    },
    {
      id: 'teen',
      title: 'O‘smirlar va Yoshlar',
      subhead: 'Farzand va o‘smirlar uchun',
      description: 'O‘smirlik davridagi xulq-atvor o‘zgarishlari, o‘ziga baho, ota-ona bilan munosabatlar va emotsional boshqaruv bo‘yicha real konsultatsiyalar.',
      icon: Compass,
      bgColor: 'bg-[#FDF7EA]',
      borderColor: 'border-[#F5E2B8]',
      textColor: 'text-[#7D5A12]',
      tagColor: 'bg-[#F9ECCE] text-[#7D5A12]',
      badge: 'Klinik tahlil',
    },
  ];

  return (
    <section id="yonalishlar" className="py-20 lg:py-28 bg-[#F7F9F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#DDEAE5]/70 px-4 py-1.5 rounded-full border border-[#B8D3CA] text-xs font-semibold text-[#1E3A34]">
            <Sparkles className="w-3.5 h-3.5 text-[#2D5A50]" />
            <span>Klinik va Amaliy Yo‘nalishlar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#182321] tracking-tight">
            Har bir inson ruhiy xotirjamlikka munosib
          </h2>

          <p className="text-base sm:text-lg text-[#66736F] font-sans font-light">
            Universitet kafedralari va amaliyotchi psixologlar tomonidan olib boriladigan asosiy yo‘nalishlar va darslar to‘plami
          </p>
        </div>

        {/* 3 Pastel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={handleGoToResource}
                className={`${cat.bgColor} ${cat.borderColor} border rounded-[28px] p-8 flex flex-col justify-between hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
              >
                <div>
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-subtle group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-7 h-7 ${cat.textColor}`} />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${cat.tagColor}`}>
                      {cat.badge}
                    </span>
                  </div>

                  {/* Subhead & Title */}
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#66736F] mb-2">
                    {cat.subhead}
                  </p>
                  <h3 className={`text-2xl font-serif font-bold ${cat.textColor} mb-4 leading-tight`}>
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#182321]/80 font-sans leading-relaxed mb-8">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className={`text-xs font-semibold ${cat.textColor} group-hover:underline`}>
                    Seanslarni o‘rganish
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-subtle group-hover:translate-x-1 transition-all">
                    <ArrowRight className={`w-4 h-4 ${cat.textColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
