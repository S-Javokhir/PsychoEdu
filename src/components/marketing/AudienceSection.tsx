import React from 'react';
import { GraduationCap, UserCheck, Building2, Check } from 'lucide-react';
import { Card } from '../common/Card';

export const AudienceSection: React.FC = () => {
  const audiences = [
    {
      title: 'Talabalar',
      subtitle: 'Bakalavriat va magistratura',
      description: 'Real amaliyotni kuzating, videolarni tomosha qiling va o‘quv materiallari orqali bilimlaringizni mustahkamlang.',
      icon: <GraduationCap className="w-6 h-6 text-deep-teal" />,
      features: [
        'Jonli mashg‘ulotlarni kuzatish',
        'Metodik video tahlillar',
        'Anonim keyslar ustida ishlash',
      ],
    },
    {
      title: 'Professor-o‘qituvchilar',
      subtitle: 'O‘qituvchi va amaliyotchi psixologlar',
      description: 'Dars va psixologik amaliyotni yagona raqamli muhitda birlashtiring hamda sifatli o‘quv kontentini yarating.',
      icon: <UserCheck className="w-6 h-6 text-deep-teal" />,
      features: [
        'Xonalardan seanslarni yozib olish',
        'Metodik qo‘llanmalar yuklash',
        'Yagona professional profil',
      ],
    },
    {
      title: 'Fakultet va kafedra',
      subtitle: 'Akademik boshqaruv va superviziya',
      description: 'Psixologiya fakultetining amaliy va o‘quv resurslarini yagona platformada markazlashtiring va nazorat qiling.',
      icon: <Building2 className="w-6 h-6 text-deep-teal" />,
      features: [
        'Xonalar va kameralar monitoringi',
        'Kontent moderatsiyasi va superviziya',
        'Markazlashgan o‘quv arxivi',
      ],
    },
  ];

  return (
    <section id="biz-haqimizda" className="py-16 lg:py-24 bg-surface border-t border-border-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-bold text-teal-800 bg-sage-light px-3 py-1 rounded-full uppercase tracking-wider border border-sage inline-block mb-3">
            Foydalanuvchilar
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main tracking-tight">
            Kimlar uchun?
          </h2>
          <p className="text-sm sm:text-base text-text-muted mt-3 leading-relaxed">
            Universitet psixologiya ta’limining barcha ishtirokchilari uchun mo‘ljallangan yaxlit ekotizim.
          </p>
        </div>

        {/* 3 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((aud) => (
            <Card
              key={aud.title}
              padded="lg"
              className="flex flex-col justify-between border-border-ui bg-page/40 hover:border-teal-300 hover:bg-surface hover:shadow-card transition-all duration-200"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-100 mb-5">
                  {aud.icon}
                </div>

                <h3 className="text-lg font-bold text-text-main">
                  {aud.title}
                </h3>
                <p className="text-xs font-medium text-teal-800 mb-3">
                  {aud.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                  {aud.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border-ui space-y-2">
                {aud.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-text-main font-medium">
                    <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
