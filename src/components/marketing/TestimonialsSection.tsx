import React from 'react';
import { Quote, Sparkles, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Avvallari talabalarimiz faqat kitobdagi nazariyani o‘qib amaliyotga chiqishar edi. PsychoEdu orqali ular real seanslarda mijoz bilan qanday 'rapport' o‘rnatish, sokratik savollar berish va empatiyani saqlashni jonli ko‘rib, tahlil qila olishmoqda.",
      name: "Prof. Dilorom Karimova",
      role: "Klinik psixologiya kafedrasi professori",
      experience: "24 yillik tajriba",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
      bgColor: "bg-[#EEF5F2]",
      borderColor: "border-[#D2E4DC]",
      textColor: "text-[#1E3A34]",
    },
    {
      id: 2,
      quote: "Bir tomonlama ko‘zgu orqali professorimizning xavotir sindromi bo‘lgan bemor bilan ishlashini jonli kuzatish menga o‘nlab kitoblardan ko‘ra ko‘proq tushuncha berdi. Ayniqsa videodagi daqiqama-daqiqa ajratilgan metodik belgilar juda qulay!",
      name: "Madina Usmonova",
      role: "Psixologiya fakulteti talabasi",
      experience: "4-kurs bitiruvchisi",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      bgColor: "bg-[#FDF1EB]",
      borderColor: "border-[#F8D8C9]",
      textColor: "text-[#8A381A]",
    },
    {
      id: 3,
      quote: "Superviziya markazi sifatida har bir yozilgan seansni etik mezonlarga ko‘ra tekshirib, bemorning ma’lumotlarini to‘liq anonimlashtiramiz. Bu tizim talabalarga xavfsiz va eng yuqori professional standartdagi bilimlarni beradi.",
      name: "Dots. Jamshid Aliyev",
      role: "Fakultet bosh supervizori, PhD",
      experience: "16 yillik tajriba",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
      bgColor: "bg-[#FDF7EA]",
      borderColor: "border-[#F5E2B8]",
      textColor: "text-[#7D5A12]",
    },
  ];

  return (
    <section id="fikrlar" className="py-20 lg:py-28 bg-[#F7F9F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#DDEAE5]/70 px-4 py-1.5 rounded-full border border-[#B8D3CA] text-xs font-semibold text-[#1E3A34]">
            <Sparkles className="w-3.5 h-3.5 text-[#2D5A50]" />
            <span>Akademik Hamjamiyat Fikri</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#182321] tracking-tight">
            Professorlar va talabalar PsychoEdu haqida
          </h2>

          <p className="text-base sm:text-lg text-[#66736F] font-sans font-light">
            Universitetimizda psixologik amaliy ta’lim sifatini yangi bosqichga olib chiqqan ustoz va talabalar tajribasi
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`${item.bgColor} ${item.borderColor} border rounded-[28px] p-8 flex flex-col justify-between hover:shadow-elevated transition-all duration-300 relative group`}
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-subtle text-[#1E3A34]">
                    <Quote className="w-5 h-5 fill-[#1E3A34]/20 text-[#1E3A34]" />
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-sm sm:text-base font-sans text-[#182321] leading-relaxed mb-8 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-6 border-t border-black/10 flex items-center gap-3.5">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#182321] font-sans">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#66736F] leading-tight mt-0.5">
                    {item.role}
                  </p>
                  <span className="text-[11px] text-[#1E3A34] font-medium">
                    {item.experience}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
