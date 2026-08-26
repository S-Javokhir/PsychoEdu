import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle2
} from 'lucide-react';
import { useProfessorData } from '../../context/ProfessorDataContext';
import type { Video as VideoType, VideoState } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { SearchInput } from '../../components/common/SearchInput';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { EmptyState } from '../../components/common/EmptyState';
import { VideoStatusBadge } from '../../components/status/VideoStatusBadge';
import { Button } from '../../components/common/Button';

export const AdminVideos: React.FC = () => {
  const navigate = useNavigate();
  const { videos, updateVideoStatus, updateVideo } = useProfessorData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');

  // Modals
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);
  const [statusChangeVideo, setStatusChangeVideo] = useState<VideoType | null>(null);
  const [newStatus, setNewStatus] = useState<VideoState>('Published');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchSearch =
        searchQuery === '' ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.professor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.method.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'Review' ? (v.status === 'Under Review' || v.status === 'Submitted') : v.status === selectedStatus);

      const matchActivity =
        selectedActivity === 'all' || v.activityType === selectedActivity;

      const matchDept =
        selectedDepartment === 'all' || v.department.includes(selectedDepartment);

      const matchAuthor =
        selectedAuthor === 'all' || v.professor === selectedAuthor;

      return matchSearch && matchStatus && matchActivity && matchDept && matchAuthor;
    });
  }, [videos, searchQuery, selectedStatus, selectedActivity, selectedDepartment, selectedAuthor]);

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

  const handleUpdateStatus = () => {
    if (!statusChangeVideo) return;
    updateVideoStatus(statusChangeVideo.id, newStatus);
    setStatusChangeVideo(null);
    showToast(`Video holati «${newStatus}»ga o‘zgartirildi!`);
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      updateVideoStatus(deleteConfirmId, 'Archived');
      setDeleteConfirmId(null);
      showToast('Video arxivlandi.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Barcha Videolar Boshqaruvi"
        description="Platformadagi barcha amaliy konsultatsiyalar, dars yozuvlari va ularning moderatsiya holatlari"
        breadcrumbs={[
          { label: 'Kontent' },
          { label: 'Videolar' }
        ]}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="p-3.5 bg-teal-50 border border-teal-300 rounded-xl text-teal-900 text-xs font-semibold flex items-center gap-2 shadow-subtle animate-subtle-pulse">
          <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search and Advanced Filters */}
      <div className="bg-surface border border-border-ui rounded-card p-4 shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholder="Video nomi, professor yoki metod..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-border-ui">
          <Select
            options={[
              { value: 'all', label: 'Barcha holatlar' },
              { value: 'Draft', label: 'Qoralama (Draft)' },
              { value: 'Review', label: 'Ko‘rib chiqilmoqda (Review)' },
              { value: 'Changes Requested', label: 'Qayta ishlashda (Changes)' },
              { value: 'Approved', label: 'Tasdiqlangan (Approved)' },
              { value: 'Published', label: 'Nashr qilingan (Published)' },
              { value: 'Rejected', label: 'Rad etilgan (Rejected)' },
              { value: 'Archived', label: 'Arxivlangan (Archived)' },
            ]}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          />

          <Select
            options={[
              { value: 'all', label: 'Barcha faoliyat turlari' },
              { value: 'Individual konsultatsiya', label: 'Individual konsultatsiya' },
              { value: 'Guruh terapiyasi', label: 'Guruh terapiyasi' },
              { value: 'Birlamchi diagnostika', label: 'Birlamchi diagnostika' },
              { value: 'Bolalar psixoterapiyasi', label: 'Bolalar psixoterapiyasi' },
            ]}
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
          />

          <Select
            options={[
              { value: 'all', label: 'Barcha kafedralar' },
              { value: 'Klinik va amaliy', label: 'Klinik va amaliy psixologiya' },
              { value: 'Ijtimoiy', label: 'Ijtimoiy psixologiya' },
              { value: 'Yosh davrlari', label: 'Yosh davrlari psixologiyasi' },
            ]}
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          />

          <Select
            options={[
              { value: 'all', label: 'Barcha professorlar' },
              { value: 'Prof. Dilorom Karimova', label: 'Prof. Dilorom Karimova' },
              { value: 'Dots. Jamshid Aliyev', label: 'Dots. Jamshid Aliyev' },
              { value: 'Dr. Nigora Toirova', label: 'Dr. Nigora Toirova' },
            ]}
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          />
        </div>
      </div>

      {/* Videos Table */}
      {filteredVideos.length === 0 ? (
        <EmptyState
          icon={<Video className="w-6 h-6 text-text-muted" />}
          title="Videolar topilmadi"
          description="Kiritilgan parametrlar bo‘yicha video kontent mavjud emas."
        />
      ) : (
        <Card padded="none" className="overflow-hidden border-border-ui shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page border-b border-border-ui text-text-muted font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Video sarlavhasi</th>
                  <th className="py-3.5 px-4">Professor</th>
                  <th className="py-3.5 px-4">Faoliyat / Metod</th>
                  <th className="py-3.5 px-4">Davomiyligi</th>
                  <th className="py-3.5 px-4">Holat</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ui bg-surface">
                {filteredVideos.map((video) => (
                  <tr key={video.id} className="hover:bg-page/50 transition-colors">
                    <td className="py-3.5 px-4 min-w-[240px]">
                      <div>
                        <p className="font-bold text-text-main text-xs sm:text-sm line-clamp-1">
                          {video.title}
                        </p>
                        <span className="text-[11px] text-text-muted">{video.department}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-text-main font-medium">
                      {video.professor}
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-medium text-text-main block">{video.activityType}</span>
                        <span className="text-[11px] text-teal-800 font-mono">{video.method}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-text-muted">
                      {video.duration}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          setStatusChangeVideo(video);
                          setNewStatus(video.status);
                        }}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        title="Holatni o‘zgartirish"
                      >
                        <VideoStatusBadge status={video.status} size="sm" />
                      </button>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => navigate(`/videos/${video.id}`)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Ko‘rish"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingVideo(video)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(video.id)}
                          className="p-1.5 text-text-soft hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                          title="Arxivlash"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Edit Video Modal */}
      {editingVideo && (
        <Modal
          isOpen={!!editingVideo}
          onClose={() => setEditingVideo(null)}
          title="Videoni tahrirlash"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingVideo(null)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveEdit}>
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

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Faoliyat turi"
                value={editingVideo.activityType}
                onChange={(e) => setEditingVideo({ ...editingVideo, activityType: e.target.value })}
              />

              <Input
                label="Metod"
                value={editingVideo.method}
                onChange={(e) => setEditingVideo({ ...editingVideo, method: e.target.value })}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Change Status Modal */}
      {statusChangeVideo && (
        <Modal
          isOpen={!!statusChangeVideo}
          onClose={() => setStatusChangeVideo(null)}
          title="Video moderatsiya holatini o‘zgartirish"
          description={`Video: ${statusChangeVideo.title}`}
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setStatusChangeVideo(null)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleUpdateStatus}>
                Holatni yangilash
              </Button>
            </>
          }
        >
          <div className="space-y-3">
            <Select
              label="Yangi holatni tanlang:"
              options={[
                { value: 'Draft', label: 'Qoralama (Draft)' },
                { value: 'Under Review', label: 'Ko‘rib chiqilmoqda (Under Review)' },
                { value: 'Changes Requested', label: 'Qayta ishlashda (Changes Requested)' },
                { value: 'Approved', label: 'Tasdiqlangan (Approved)' },
                { value: 'Published', label: 'Nashr qilingan (Published)' },
                { value: 'Rejected', label: 'Rad etilgan (Rejected)' },
                { value: 'Archived', label: 'Arxivlangan (Archived)' },
              ]}
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as VideoState)}
            />
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="Videoni arxivlashni tasdiqlaysizmi?"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setDeleteConfirmId(null)}>
                Bekor qilish
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Arxivlash
              </Button>
            </>
          }
        >
          <p className="text-xs text-text-muted">
            Ushbu video arxivga o‘tkaziladi va umumiy ro‘yxatdan yashiriladi.
          </p>
        </Modal>
      )}
    </div>
  );
};
