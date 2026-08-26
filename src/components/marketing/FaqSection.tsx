import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Psixologik seanslar qanday yozib olinadi va anonimlik qanday ta’minlanadi?',
      answer: 'Barcha amaliy seanslar maxsus jihozlangan konsultatsiya xonalarida bemorning yozma roziligi bilan olib boriladi. Yozib olingan videolardan bemorning shaxsini aniqlashtiruvchi barcha ma’lumotlar (ism-familiya, telefon, manzil) olib tashlanadi va unga maxsus anonim kod (masalan: PT-9012) beriladi. Supervizor tekshiruvidan so‘nggina video darslik sifatida tasdiqlanadi.',
    },
    {
      question: 'Talabalar jonli efir vaqtida konsultatsiya xonasiga va bemorga xalaqit bera oladimi?',
      answer: 'Yo‘q, mutlaqo xalaqit bera olmaydi. Tizim bir tomonlama ko‘zgu (One-way mirror) tamoyiliga asoslangan bo‘lib, talabalar uchun faqat tomosha qilish (Watch-only) rejimi faoldir. Konsultatsiya xonasidagi mutaxassis va mijoz kuzatuvchilar mavjudligidan chalg‘imaydi.',
    },
    {
      question: 'Psixologiya amaliyot videolarini shaxsiy kompyuterga yuklab olish mumkinmi?',
      answer: 'Axborot xavfsizligi va tibbiy-psixologik etika qoidalariga ko‘ra, video seanslarni yuklab olish taqiqlangan. Barcha videolar himoyalangan o‘quv pleyeri orqali faqat platforma ichida onlayn ko‘rish uchun taqdim etiladi. O‘quv qo‘llanmalari va protokollarni esa PDF shaklida yuklab olish mumkin.',
    },
    {
      question: 'Professor va amaliyotchi psixolog bitta profilda ishlay oladimi?',
      answer: 'Ha, PsychoEdu platformasida professor-o‘qituvchilar bir vaqtning o‘zida akademik guruhlarga dars berish, o‘zining amaliy seanslarini yozib olish va ularni o‘quv materiallariga biriktirish imkoniyatiga ega yagona ko‘p funksiyali profilga egalar.',
    },
    {
      question: 'Kafedra materiallari va klinik keyslar bazasidan kimlar foydalana oladi?',
      answer: 'Platformadan universitetning psixologiya fakulteti talabalari, magistrantlar, doktorantlar, kafedra o‘qituvchilari hamda supervizorlar o‘zlariga berilgan shaxsiy talaba yoki o‘qituvchi ID kartalari orqali xavfsiz foydalanishlari mumkin.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-t border-[#E4EAE7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#DDEAE5]/70 px-4 py-1.5 rounded-full border border-[#B8D3CA] text-xs font-semibold text-[#1E3A34]">
            <HelpCircle className="w-3.5 h-3.5 text-[#2D5A50]" />
            <span>Savollarga Javoblar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#182321] tracking-tight">
            Tez-tez beriladigan savollar
          </h2>

          <p className="text-base text-[#66736F] font-sans font-light">
            Platformaning ishlash tartibi, xavfsizlik va o‘quv imkoniyatlari bo‘yicha muhim ma’lumotlar
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#2D5A50] bg-[#F7F9F8] shadow-subtle'
                    : 'border-[#E4EAE7] bg-white hover:border-[#B8D3CA]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-serif font-bold text-[#182321]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#1E3A34] text-white rotate-180' : 'bg-[#DDEAE5] text-[#1E3A34]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-sm sm:text-base text-[#66736F] font-sans leading-relaxed border-t border-[#E4EAE7]/80 animate-subtle-pulse">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
