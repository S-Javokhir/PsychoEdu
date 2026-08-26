import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  Plus, 
  Eye, 
  Edit3, 
  Send, 
  Archive, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  UploadCloud 
} from 'lucide-react';
import { useProfessorData } from '../../context/ProfessorDataContext';
import type { Video as VideoType, VideoState } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Tabs } from '../../components/common/Tabs';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { EmptyState } from '../../components/common/EmptyState';
import { VideoStatusBadge } from '../../components/status/VideoStatusBadge';

export const MyVideos: React.FC = () => {
  const navigate = useNavigate();
  const { videos, addVideo, updateVideoStatus, updateVideo } = useProfessorData();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);

  // New Video Form
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newActivityType, setNewActivityType] = useState('Individual konsultatsiya');
  const [newMethod, setNewMethod] = useState('KBT (Kognitiv-xulq-atvor)');
  const [newDuration, setNewDuration] = useState('45:00');
  const [newDepartment] = useState('Klinik va amaliy psixologiya kafedrasi');
  const [newStatus, setNewStatus] = useState<VideoState>('Draft');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const videoTabs = [
    { id: 'all', label: 'Barcha videolar', count: videos.length },
    { id: 'Draft', label: 'Qoralama', count: videos.filter(v => v.status === 'Draft').length },
    { id: 'Under Review', label: 'Ko‘rib chiqilmoqda', count: videos.filter(v => v.status === 'Under Review' || v.status === 'Submitted').length },
    { id: 'Changes Requested', label: 'Qayta ishlashda', count: videos.filter(v => v.status === 'Changes Requested').length },
    { id: 'Published', label: 'E’lon qilingan', count: videos.filter(v => v.status === 'Published').length },
  ];

  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchSearch =
        searchQuery === '' ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.activityType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTab =
        activeTab === 'all' ||
        (activeTab === 'Under Review' ? (v.status === 'Under Review' || v.status === 'Submitted') : v.status === activeTab);

      return matchSearch && matchTab;
    });
  }, [videos, searchQuery, activeTab]);

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    addVideo({
      title: newTitle || 'Yangi amaliy mashg‘ulot yozuvi',
      description: newDescription,
      thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
      duration: newDuration || '45:00',
      activityType: newActivityType,
      method: newMethod,
      professor: 'Prof. Dilorom Karimova',
      professorTitle: 'Psixologiya fanlari doktori, Professor',
      professorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      department: newDepartment,
      recordedDate: 'Bugun, 26 Fevral, 2026',
      viewCount: 0,
      status: newStatus,
      appliedMethods: [
        {
          title: newMethod,
          description: newDescription || 'Psixologik metodika qo‘llanilishi',
          timestamp: '03:10'
        }
      ],
      relatedMaterialIds: ['mat-001'],
    });

    setIsAddModalOpen(false);
    showToast('Yangi video muvaffaqiyatli qo‘shildi!');
    // Reset form
    setNewTitle('');
    setNewDescription('');
  };

  const handleOpenEdit = (video: VideoType) => {
    setEditingVideo(video);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    updateVideo(editingVideo.id, {
      title: editingVideo.title,
      description: editingVideo.description,
      activityType: editingVideo.activityType,
      method: editingVideo.method,
    });

    setEditingVideo(null);
    showToast('Video ma’lumotlari yangilandi!');
  };

  const handleSubmitReview = (id: string) => {
    updateVideoStatus(id, 'Under Review');
    showToast('Video supervizor ko‘rib chiqishi uchun yuborildi!');
  };

  const handleArchive = (id: string) => {
    updateVideoStatus(id, 'Archived');
    showToast('Video arxivlandi.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mening Videolarim"
        description="Amaliy psixologik video darslar, tasdiqlangan konsultatsiya yozuvlari va qoralamalar boshqaruvi"
        breadcrumbs={[
          { label: 'Ta’lim' },
          { label: 'Videolarim' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Video qo‘shish
          </Button>
        }
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 bg-teal-50 border border-teal-300 rounded-xl text-teal-900 text-xs font-semibold flex items-center gap-2 shadow-subtle animate-subtle-pulse">
          <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search and Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 max-w-md">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholder="Videolar bo‘yicha qidiruv (nomi, metod, yo‘nalish)..."
            />
          </div>
        </div>

        <Tabs
          tabs={videoTabs}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab)}
        />
      </div>

      {/* Video Cards Grid */}
      {filteredVideos.length === 0 ? (
        <EmptyState
          icon={<Video className="w-6 h-6 text-text-muted" />}
          title="Videolar topilmadi"
          description="Tanlangan parametrlar bo‘yicha video kontent mavjud emas."
          actionLabel="Yangi video qo‘shish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              padded="none"
              className="overflow-hidden flex flex-col justify-between hover:border-teal-300 transition-all duration-200"
            >
              <div>
                {/* Thumbnail Preview */}
                <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <VideoStatusBadge status={video.status} size="sm" />
                    <span className="bg-black/70 text-white text-[11px] font-mono px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sage" />
                      {video.duration}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="text-[11px] font-medium text-white/95 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 border border-white/10">
                      <Sparkles className="w-3 h-3 text-teal-300" />
                      {video.method}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-text-main line-clamp-2 mb-1.5 leading-snug">
                    {video.title}
                  </h4>
                  <p className="text-xs text-text-muted line-clamp-2 mb-3">
                    {video.description}
                  </p>

                  <div className="pt-2 border-t border-border-ui text-[11px] text-text-muted flex items-center justify-between">
                    <span>{video.activityType}</span>
                    <span>{video.recordedDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-4 py-3 bg-page/50 border-t border-border-ui flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs flex-1"
                  icon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() => navigate(`/videos/${video.id}`)}
                >
                  Ko‘rish
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs flex-1"
                  icon={<Edit3 className="w-3.5 h-3.5" />}
                  onClick={() => handleOpenEdit(video)}
                >
                  Tahrirlash
                </Button>

                {(video.status === 'Draft' || video.status === 'Changes Requested') && (
                  <button
                    type="button"
                    onClick={() => handleSubmitReview(video.id)}
                    className="p-2 text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 rounded-btn transition-colors"
                    title="Superviziyaga yuborish"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                )}

                {video.status !== 'Archived' && (
                  <button
                    type="button"
                    onClick={() => handleArchive(video.id)}
                    className="p-2 text-text-soft hover:text-red-600 hover:bg-red-50 rounded-btn transition-colors"
                    title="Arxivlash"
                  >
                    <Archive className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Video Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Yangi ta’limiy video qo‘shish"
          description="Yozib olingan amaliy mashg‘ulot yoki ma’ruza videoni ro‘yxatdan o‘tkazing"
          maxWidth="xl"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(false)}
              >
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateVideo}
              >
                Videoni saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreateVideo} className="space-y-4">
            <Input
              label="Video sarlavhasi*"
              placeholder="Masalan: KBT asosida kognitiv xatoliklarni tahlil qilish"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Video tavsifi va ta’limiy maqsadi*
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Seansning asosiy mazmuni va talabalarga ko‘rsatmasi..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Faoliyat turi*"
                options={[
                  { value: 'Individual konsultatsiya', label: 'Individual konsultatsiya' },
                  { value: 'Guruh psixoterapiyasi', label: 'Guruh psixoterapiyasi' },
                  { value: 'Birlamchi diagnostika', label: 'Birlamchi diagnostika' },
                  { value: 'Bolalar psixoterapiyasi', label: 'Bolalar psixoterapiyasi' },
                ]}
                value={newActivityType}
                onChange={(e) => setNewActivityType(e.target.value)}
              />

              <Input
                label="Psixologik metod*"
                placeholder="Masalan: KBT (Kognitiv-xulq-atvor)"
                value={newMethod}
                onChange={(e) => setNewMethod(e.target.value)}
                required
              />

              <Input
                label="Davomiyligi (mm:ss)*"
                placeholder="45:00"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                required
              />

              <Select
                label="Dastlabki holat"
                options={[
                  { value: 'Draft', label: 'Qoralama (Draft)' },
                  { value: 'Under Review', label: 'Ko‘rib chiqishga yuborish' },
                ]}
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as VideoState)}
              />
            </div>

            {/* Video File Placeholder */}
            <div className="p-4 border-2 border-dashed border-border-ui rounded-xl text-center bg-page">
              <UploadCloud className="w-8 h-8 text-teal-700 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-text-main">
                Video fayl yuklangan deb hisoblanadi (Mock)
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                MP4, MOV yoki MKV formatidagi 1080p yozuv
              </p>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Video Modal */}
      {editingVideo && (
        <Modal
          isOpen={!!editingVideo}
          onClose={() => setEditingVideo(null)}
          title="Video ma’lumotlarini tahrirlash"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingVideo(null)}
              >
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveEdit}
              >
                Saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <Input
              label="Sarlavha*"
              value={editingVideo.title}
              onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
              required
            />

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Tavsif*
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={editingVideo.description}
                onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Faoliyat turi"
                value={editingVideo.activityType}
                onChange={(e) => setEditingVideo({ ...editingVideo, activityType: e.target.value })}
              />

              <Input
                label="Psixologik metod"
                value={editingVideo.method}
                onChange={(e) => setEditingVideo({ ...editingVideo, method: e.target.value })}
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
