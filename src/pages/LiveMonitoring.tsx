import React, { useState, useMemo } from 'react';
import { Radio, Filter } from 'lucide-react';
import { mockCameras } from '../data/cameras';
import { PageHeader } from '../components/common/PageHeader';
import { SearchInput } from '../components/common/SearchInput';
import { Select } from '../components/common/Select';
import { EmptyState } from '../components/common/EmptyState';
import { CameraCard } from '../components/domain/CameraCard';

export const LiveMonitoring: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  const filteredCameras = useMemo(() => {
    return mockCameras.filter((cam) => {
      // Search
      const matchSearch =
        searchQuery === '' ||
        cam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cam.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cam.currentProfessor && cam.currentProfessor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (cam.currentActivity && cam.currentActivity.toLowerCase().includes(searchQuery.toLowerCase()));

      // Room filter
      const matchRoom = selectedRoom === 'all' || cam.roomNumber === selectedRoom;

      // Activity filter
      const matchActivity =
        selectedActivity === 'all' ||
        (cam.currentActivity && cam.currentActivity.toLowerCase().includes(selectedActivity.toLowerCase()));

      // State filter
      const matchState = selectedState === 'all' || cam.state === selectedState;

      return matchSearch && matchRoom && matchActivity && matchState;
    });
  }, [searchQuery, selectedRoom, selectedActivity, selectedState]);

  const activeLiveCount = mockCameras.filter(c => c.state === 'Live' || c.state === 'Recording').length;

  const roomOptions = [
    { value: 'all', label: 'Barcha xonalar' },
    { value: '203-xona', label: '203-xona (Konsultatsiya A)' },
    { value: '201-xona', label: '201-xona (Individual terapiya)' },
    { value: '305-xona', label: '305-xona (Guruh terapiyasi)' },
    { value: '108-xona', label: '108-xona (Bolalar xonasi)' },
    { value: '204-xona', label: '204-xona (Laboratoriya)' },
  ];

  const activityOptions = [
    { value: 'all', label: 'Barcha faoliyat turlari' },
    { value: 'Individual konsultatsiya', label: 'Individual konsultatsiya' },
    { value: 'KBT', label: 'KBT amaliy seansi' },
    { value: 'Guruh', label: 'Guruh terapiyasi' },
  ];

  const stateOptions = [
    { value: 'all', label: 'Barcha holatlar' },
    { value: 'Live', label: 'JONLI EFIR (Live)' },
    { value: 'Recording', label: 'Yozib olinmoqda (Recording)' },
    { value: 'Online', label: 'Yoniq / Kutish (Online)' },
    { value: 'Preparing', label: 'Tayyorlanmoqda (Preparing)' },
    { value: 'Offline', label: 'O‘chiq (Offline)' },
    { value: 'Stream Error', label: 'Aloqa uzildi (Error)' },
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRoom('all');
    setSelectedActivity('all');
    setSelectedState('all');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Monitoring"
        description="Psixologiya xonalaridagi amaliy konsultatsiya va dars jarayonlarini jonli kuzatish tizimi"
        breadcrumbs={[{ label: 'Live Monitoring' }]}
        badge={
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <Radio className="w-3.5 h-3.5" />
            {activeLiveCount} ta faol efir
          </span>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-surface border border-border-ui rounded-card p-4 shadow-subtle space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
        <div className="flex-1">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Xona, faoliyat yoki professor bo‘yicha qidiruv..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:w-auto">
          <Select
            options={roomOptions}
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            aria-label="Xonani tanlash"
          />

          <Select
            options={activityOptions}
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            aria-label="Faoliyat turini tanlash"
          />

          <Select
            options={stateOptions}
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            aria-label="Holatni tanlash"
          />
        </div>
      </div>

      {/* Cameras Grid */}
      {filteredCameras.length === 0 ? (
        <EmptyState
          icon={<Filter className="w-6 h-6 text-text-muted" />}
          title="Kamera yoki seans topilmadi"
          description="Tanlangan filtrlar bo‘yicha hech qanday xona yoki efir mavjud emas. Filtrlarni o‘zgartirib ko‘ring."
          actionLabel="Filtrlarni tozalash"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCameras.map((cam) => (
            <CameraCard key={cam.id} camera={cam} />
          ))}
        </div>
      )}
    </div>
  );
};
