import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Video as VideoIcon } from 'lucide-react';
import { mockVideos } from '../data/videos';
import { PageHeader } from '../components/common/PageHeader';
import { SearchInput } from '../components/common/SearchInput';
import { Select } from '../components/common/Select';
import { EmptyState } from '../components/common/EmptyState';
import { VideoCard } from '../components/domain/VideoCard';

export const VideoLibrary: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedActivity, setSelectedActivity] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [selectedProfessor, setSelectedProfessor] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredVideos = useMemo(() => {
    return mockVideos
      .filter((video) => {
        // Search query
        const matchSearch =
          searchQuery === '' ||
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.professor.toLowerCase().includes(searchQuery.toLowerCase());

        // Activity filter
        const matchActivity =
          selectedActivity === 'all' ||
          video.activityType.toLowerCase().includes(selectedActivity.toLowerCase());

        // Method filter
        const matchMethod =
          selectedMethod === 'all' ||
          video.method.toLowerCase().includes(selectedMethod.toLowerCase());

        // Professor filter
        const matchProfessor =
          selectedProfessor === 'all' || video.professor === selectedProfessor;

        // Duration filter
        let matchDuration = true;
        const mins = parseInt(video.duration.split(':')[0], 10);
        if (selectedDuration === 'short') matchDuration = mins < 40;
        else if (selectedDuration === 'medium') matchDuration = mins >= 40 && mins <= 50;
        else if (selectedDuration === 'long') matchDuration = mins > 50;

        return matchSearch && matchActivity && matchMethod && matchProfessor && matchDuration;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.viewCount - a.viewCount;
        return 0; // default order
      });
  }, [searchQuery, selectedActivity, selectedMethod, selectedProfessor, selectedDuration, sortBy]);

  const activityOptions = [
    { value: 'all', label: 'Barcha faoliyat turlari' },
    { value: 'Individual konsultatsiya', label: 'Individual konsultatsiya' },
    { value: 'Guruh psixoterapiyasi', label: 'Guruh psixoterapiyasi' },
    { value: 'Birlamchi diagnostika', label: 'Birlamchi diagnostika' },
    { value: 'Bolalar psixoterapiyasi', label: 'Bolalar psixoterapiyasi' },
  ];

  const methodOptions = [
    { value: 'all', label: 'Barcha metodlar' },
    { value: 'KBT', label: 'KBT (Kognitiv-xulq-atvor)' },
    { value: 'Faol tinglash', label: 'Faol tinglash va empatiya' },
    { value: 'Art-terapiya', label: 'Art-terapiya' },
    { value: 'Gestalt', label: 'Gestalt yondashuv' },
  ];

  const professorOptions = [
    { value: 'all', label: 'Barcha professorlar' },
    { value: 'Prof. Dilorom Karimova', label: 'Prof. Dilorom Karimova' },
    { value: 'Dots. Jamshid Aliyev', label: 'Dots. Jamshid Aliyev' },
    { value: 'Dr. Nigora Toirova', label: 'Dr. Nigora Toirova' },
  ];

  const durationOptions = [
    { value: 'all', label: 'Barcha davomiylik' },
    { value: 'short', label: '< 40 daqiqa' },
    { value: 'medium', label: '40 – 50 daqiqa' },
    { value: 'long', label: '> 50 daqiqa' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Eng so‘nggi yozuvlar' },
    { value: 'popular', label: 'Eng ko‘p ko‘rilgan' },
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedActivity('all');
    setSelectedMethod('all');
    setSelectedProfessor('all');
    setSelectedDuration('all');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Video Library"
        description="Amaliy psixologik konsultatsiyalar, superviziya va diagnostika darslari video kutubxonasi"
        breadcrumbs={[{ label: 'Video Library' }]}
        badge={
          <span className="text-xs font-semibold text-deep-teal bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            {mockVideos.length} ta yozuv
          </span>
        }
      />

      {/* Search and Filters Section */}
      <div className="bg-surface border border-border-ui rounded-card p-4 shadow-subtle space-y-3">
        {/* Top search & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) setSearchParams({ q: e.target.value });
                else setSearchParams({});
              }}
              onClear={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
              placeholder="Videolarni qidiring..."
            />
          </div>

          <div className="w-full sm:w-56">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Saralash"
            />
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-border-ui">
          <Select
            options={activityOptions}
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            aria-label="Faoliyat turi"
          />

          <Select
            options={methodOptions}
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            aria-label="Metod"
          />

          <Select
            options={professorOptions}
            value={selectedProfessor}
            onChange={(e) => setSelectedProfessor(e.target.value)}
            aria-label="Professor"
          />

          <Select
            options={durationOptions}
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            aria-label="Davomiyligi"
          />
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <EmptyState
          icon={<VideoIcon className="w-6 h-6 text-text-muted" />}
          title="Videolar topilmadi"
          description="Kiritilgan so‘rov yoki tanlangan parametrlar bo‘yicha amaliy yozuv topilmadi."
          actionLabel="Filtrlarni tozalash"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};
