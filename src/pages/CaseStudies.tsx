import React, { useState, useMemo } from 'react';
import { FolderGit2, ShieldCheck } from 'lucide-react';
import { mockCases } from '../data/cases';
import { PageHeader } from '../components/common/PageHeader';
import { SearchInput } from '../components/common/SearchInput';
import { Select } from '../components/common/Select';
import { EmptyState } from '../components/common/EmptyState';
import { CaseCard } from '../components/domain/CaseCard';

export const CaseStudies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');

  const filteredCases = useMemo(() => {
    return mockCases.filter((c) => {
      const matchSearch =
        searchQuery === '' ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.patientCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.presentingProblem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.method.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDifficulty =
        selectedDifficulty === 'all' || c.difficulty === selectedDifficulty;

      const matchMethod =
        selectedMethod === 'all' ||
        c.method.toLowerCase().includes(selectedMethod.toLowerCase());

      const matchAge =
        selectedAge === 'all' ||
        c.ageGroup.toLowerCase().includes(selectedAge.toLowerCase());

      return matchSearch && matchDifficulty && matchMethod && matchAge;
    });
  }, [searchQuery, selectedDifficulty, selectedMethod, selectedAge]);

  const difficultyOptions = [
    { value: 'all', label: 'Barcha qiyinlik darajalari' },
    { value: 'Boshlang‘ich', label: 'Boshlang‘ich daraja' },
    { value: 'O‘rta', label: 'O‘rta daraja' },
    { value: 'Murakkab', label: 'Murakkab keys' },
  ];

  const methodOptions = [
    { value: 'all', label: 'Barcha metodlar' },
    { value: 'KBT', label: 'KBT (Kognitiv-xulq-atvor)' },
    { value: 'Art-terapiya', label: 'Art-terapiya' },
    { value: 'Gestalt', label: 'Gestalt yondashuv' },
    { value: 'Krizis', label: 'Krizis intervensiyasi' },
  ];

  const ageOptions = [
    { value: 'all', label: 'Barcha yosh guruhlari' },
    { value: 'o‘smir', label: 'O‘smirlar (14–17 yosh)' },
    { value: 'yosh', label: 'Yoshlar (18–24 yosh)' },
    { value: 'katta', label: 'Kattalar (25+ yosh)' },
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('all');
    setSelectedMethod('all');
    setSelectedAge('all');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Amaliy Keyslar (Case Studies)"
        description="Psixologik konsultatsiya va terapiya amaliyotidan olingan to‘liq anonimlashtirilgan ta’limiy keyslar to‘plami"
        breadcrumbs={[{ label: 'Keyslar' }]}
        badge={
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-deep-teal bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Anonimlashtirilgan Baza ({mockCases.length})
          </span>
        }
      />

      {/* Search and Filters */}
      <div className="bg-surface border border-border-ui rounded-card p-4 shadow-subtle flex flex-col sm:flex-row sm:items-center sm:gap-3 space-y-3 sm:space-y-0">
        <div className="flex-1">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Keys nomi, mavzu yoki anonim ID bo‘yicha qidiruv (masalan, PT-9012)..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:w-auto">
          <Select
            options={difficultyOptions}
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            aria-label="Qiyinlik darajasi"
          />

          <Select
            options={methodOptions}
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            aria-label="Qo‘llanilgan metod"
          />

          <Select
            options={ageOptions}
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            aria-label="Yosh guruhi"
          />
        </div>
      </div>

      {/* Case Studies Grid */}
      {filteredCases.length === 0 ? (
        <EmptyState
          icon={<FolderGit2 className="w-6 h-6 text-text-muted" />}
          title="Keys topilmadi"
          description="Kiritilgan so‘rov yoki parametrlar bo‘yicha amaliy keys mavjud emas."
          actionLabel="Filtrlarni tozalash"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCases.map((cs) => (
            <CaseCard key={cs.id} caseStudy={cs} />
          ))}
        </div>
      )}
    </div>
  );
};
