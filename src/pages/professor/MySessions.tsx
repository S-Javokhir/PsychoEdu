import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CalendarCheck, 
  Disc, 
  Edit3, 
  Send, 
  Archive, 
  CheckCircle2, 
  Clock
} from 'lucide-react';
import { useProfessorData } from '../../context/ProfessorDataContext';
import type { ProfessorSession } from '../../types';
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

export const MySessions: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') || 'all';

  const { sessions, updateSessionStatus, updateSession } = useProfessorData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(initialStatus);

  // Edit Modal State
  const [editingSession, setEditingSession] = useState<ProfessorSession | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editMethod, setEditMethod] = useState('');
  const [editObjective, setEditObjective] = useState('');
  const [editDifficulty, setEditDifficulty] = useState<'Boshlang‘ich' | 'O‘rta' | 'Murakkab'>('O‘rta');
  
  // Feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const statusTabs = [
    { id: 'all', label: 'Barcha seanslar', count: sessions.length },
    { id: 'Draft', label: 'Qoralama', count: sessions.filter(s => s.status === 'Draft').length },
    { id: 'Under Review', label: 'Ko‘rib chiqilmoqda', count: sessions.filter(s => s.status === 'Under Review' || s.status === 'Submitted').length },
    { id: 'Changes Requested', label: 'Qayta ishlashda', count: sessions.filter(s => s.status === 'Changes Requested').length },
    { id: 'Published', label: 'E’lon qilingan', count: sessions.filter(s => s.status === 'Published').length },
    { id: 'Archived', label: 'Arxivlangan', count: sessions.filter(s => s.status === 'Archived').length },
  ];

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchSearch =
        searchQuery === '' ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.patientCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.method.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTab =
        activeTab === 'all' ||
        (activeTab === 'Under Review' ? (s.status === 'Under Review' || s.status === 'Submitted') : s.status === activeTab);

      return matchSearch && matchTab;
    });
  }, [sessions, searchQuery, activeTab]);

  const handleOpenEdit = (session: ProfessorSession) => {
    setEditingSession(session);
    setEditTitle(session.title);
    setEditMethod(session.method);
    setEditObjective(session.educationalObjective);
    setEditDifficulty(session.difficulty);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSession) return;

    updateSession(editingSession.id, {
      title: editTitle,
      method: editMethod,
      educationalObjective: editObjective,
      difficulty: editDifficulty,
    });

    setEditingSession(null);
    showToast('Seans ma’lumotlari muvaffaqiyatli yangilandi!');
  };

  const handleSubmitReview = (id: string) => {
    updateSessionStatus(id, 'Under Review');
    showToast('Seans ko‘rib chiqishga (Superviziyaga) yuborildi!');
  };

  const handleArchive = (id: string) => {
    updateSessionStatus(id, 'Archived');
    showToast('Seans arxivlandi.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mening Seanslarim"
        description="Amaliy psixologik mashg‘ulotlar, yozib olingan konsultatsiyalar va ta’limiy yozuvlar ro‘yxati"
        breadcrumbs={[
          { label: 'Amaliyot' },
          { label: 'Mening seanslarim' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Disc className="w-4 h-4 text-rose-300" />}
            onClick={() => navigate('/professor/recording')}
          >
            Yangi seans yozish
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
              placeholder="Seans nomi, xona yoki anonim ID (masalan, PT-9012)..."
            />
          </div>
        </div>

        <Tabs
          tabs={statusTabs}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab)}
        />
      </div>

      {/* Sessions Table / List */}
      {filteredSessions.length === 0 ? (
        <EmptyState
          icon={<CalendarCheck className="w-6 h-6 text-text-muted" />}
          title="Seanslar topilmadi"
          description="Ushbu toifada yoki qidiruv so‘rovingiz bo‘yicha amaliy seanslar mavjud emas."
          actionLabel="Yangi seans boshlash"
          onAction={() => navigate('/professor/recording')}
        />
      ) : (
        <Card padded="none" className="overflow-hidden border-border-ui shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page border-b border-border-ui text-text-muted font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Seans nomi va ID</th>
                  <th className="py-3.5 px-4">Sana</th>
                  <th className="py-3.5 px-4">Faoliyat turi</th>
                  <th className="py-3.5 px-4">Xona</th>
                  <th className="py-3.5 px-4">Davomiyligi</th>
                  <th className="py-3.5 px-4">Holat</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ui bg-surface">
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-page/50 transition-colors">
                    {/* Session Name & Code */}
                    <td className="py-3.5 px-4 min-w-[240px]">
                      <div>
                        <p className="font-semibold text-text-main text-xs sm:text-sm line-clamp-1">
                          {session.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-[11px] bg-teal-50 text-teal-900 px-1.5 py-0.2 rounded border border-teal-100 font-medium">
                            {session.patientCode}
                          </span>
                          <span className="text-[11px] text-text-muted truncate max-w-[150px]">
                            {session.method}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-text-muted">
                      {session.date}
                    </td>

                    {/* Activity */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="bg-page text-text-main font-medium px-2 py-1 rounded border border-border-ui">
                        {session.activityType}
                      </span>
                    </td>

                    {/* Room */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-text-main font-medium">
                      {session.roomNumber}
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-text-soft" />
                        {session.duration}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <VideoStatusBadge status={session.status} size="sm" />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(session)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Submit for Review (if Draft or Changes Requested) */}
                        {(session.status === 'Draft' || session.status === 'Changes Requested') && (
                          <button
                            type="button"
                            onClick={() => handleSubmitReview(session.id)}
                            className="p-1.5 text-teal-700 hover:text-teal-900 rounded-md hover:bg-teal-50 transition-colors"
                            title="Ko‘rib chiqishga yuborish"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}

                        {/* Archive Button */}
                        {session.status !== 'Archived' && (
                          <button
                            type="button"
                            onClick={() => handleArchive(session.id)}
                            className="p-1.5 text-text-soft hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            title="Arxivlash"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Edit Session Modal */}
      {editingSession && (
        <Modal
          isOpen={!!editingSession}
          onClose={() => setEditingSession(null)}
          title="Seans metama’lumotlarini tahrirlash"
          description={`${editingSession.roomNumber} • ${editingSession.date} • ${editingSession.patientCode}`}
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingSession(null)}
              >
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveEdit}
              >
                O‘zgarishlarni saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <Input
              label="Seans sarlavhasi*"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />

            <Input
              label="Qo‘llanilgan psixologik metod*"
              value={editMethod}
              onChange={(e) => setEditMethod(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                O‘quv maqsadi va talabalar uchun ko‘rsatma*
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={editObjective}
                onChange={(e) => setEditObjective(e.target.value)}
                required
              />
            </div>

            <Select
              label="Qiyinchilik darajasi"
              options={[
                { value: 'Boshlang‘ich', label: 'Boshlang‘ich daraja' },
                { value: 'O‘rta', label: 'O‘rta daraja' },
                { value: 'Murakkab', label: 'Murakkab daraja' },
              ]}
              value={editDifficulty}
              onChange={(e) => setEditDifficulty(e.target.value as any)}
            />
          </form>
        </Modal>
      )}
    </div>
  );
};
