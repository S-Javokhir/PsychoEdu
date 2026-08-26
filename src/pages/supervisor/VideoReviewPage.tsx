import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Send,
  MessageSquare
} from 'lucide-react';
import { useProfessorData } from '../../context/ProfessorDataContext';
import { useAdminData } from '../../context/AdminDataContext';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { VideoPlayer } from '../../components/domain/VideoPlayer';
import { VideoStatusBadge } from '../../components/status/VideoStatusBadge';

export const VideoReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { videos, updateVideoStatus } = useProfessorData();
  const { addReviewLog } = useAdminData();

  const video = videos.find((v) => v.id === id) || videos[0];

  // Dialogs state
  const [isChangesModalOpen, setIsChangesModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  const [comment, setComment] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [selectedTimestamp, setSelectedTimestamp] = useState<string | undefined>(undefined);

  const handleApprove = () => {
    updateVideoStatus(video.id, 'Published');
    addReviewLog({
      videoId: video.id,
      videoTitle: video.title,
      professorName: video.professor,
      action: 'Approved',
      date: 'Bugun, 26 Fevral, 2026',
      comment: 'Metodik talablarga to‘liq mos. Bemor daxlsizligi ta’minlangan. Talabalar uchun nashr qilindi.',
      supervisorName: currentUser.fullName,
    });

    setIsApproveModalOpen(false);
    setSuccessToast('Video muvaffaqiyatli tasdiqlandi va talabalar uchun nashr qilindi!');
    setTimeout(() => {
      navigate('/supervisor/reviews');
    }, 1500);
  };

  const handleRequestChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateVideoStatus(video.id, 'Changes Requested');
    addReviewLog({
      videoId: video.id,
      videoTitle: video.title,
      professorName: video.professor,
      action: 'Changes Requested',
      date: 'Bugun, 26 Fevral, 2026',
      comment: comment || 'O‘quv maqsadlarini aniqlashtirish so‘raladi.',
      supervisorName: currentUser.fullName,
    });

    setIsChangesModalOpen(false);
    setSuccessToast('O‘zgarish kiritish talabi professorga yuborildi.');
    setTimeout(() => {
      navigate('/supervisor/reviews');
    }, 1500);
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    updateVideoStatus(video.id, 'Rejected');
    addReviewLog({
      videoId: video.id,
      videoTitle: video.title,
      professorName: video.professor,
      action: 'Rejected',
      date: 'Bugun, 26 Fevral, 2026',
      comment: rejectReason || 'Etik yoki texnik talablarga nomuvofiqlik.',
      supervisorName: currentUser.fullName,
    });

    setIsRejectModalOpen(false);
    setSuccessToast('Video rad etildi.');
    setTimeout(() => {
      navigate('/supervisor/reviews');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Video Seans Ekspertizasi"
        description={`${video.title} • Muallif: ${video.professor}`}
        breadcrumbs={[
          { label: 'Superviziya' },
          { label: 'Review Center', href: '/supervisor/reviews' },
          { label: 'Ekspertiza' }
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/supervisor/reviews')}
          >
            Ro‘yxatga qaytish
          </Button>
        }
      />

      {/* Success Feedback Alert */}
      {successToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2.5 shadow-subtle animate-subtle-pulse">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* SPLIT LAYOUT: Left Player + Right Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Large Video Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <VideoPlayer video={video} currentTimestamp={selectedTimestamp} />

          {/* Applied Methods Breakdown */}
          <Card padded="md" className="space-y-3">
            <h4 className="text-xs font-bold text-text-main uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Videoda qayd etilgan metodik bosqichlar:</span>
            </h4>

            <div className="space-y-2">
              {video.appliedMethods.map((m, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedTimestamp(m.timestamp)}
                  className="p-2.5 bg-page rounded-lg border border-border-ui flex items-start gap-2.5 text-xs hover:border-teal-400 hover:bg-teal-50/40 cursor-pointer transition-all duration-150 group"
                >
                  <span className="font-mono font-bold text-deep-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-200 shrink-0 group-hover:bg-deep-teal group-hover:text-white transition-colors">
                    ▶ {m.timestamp}
                  </span>
                  <div>
                    <p className="font-semibold text-text-main group-hover:text-deep-teal transition-colors">{m.title}</p>
                    <p className="text-text-muted mt-0.5">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT: Metadata Panel & Supervision Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Metadata Card */}
          <Card padded="lg" className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-ui pb-3">
              <h3 className="text-sm font-bold text-text-main uppercase tracking-wider">
                Seans Metama’lumotlari
              </h3>
              <VideoStatusBadge status={video.status} size="sm" />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-text-soft block text-[11px]">Seans sarlavhasi:</span>
                <span className="font-bold text-text-main text-sm">{video.title}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border-ui">
                <div>
                  <span className="text-text-soft block text-[11px]">Professor / Psixolog:</span>
                  <span className="font-semibold text-text-main">{video.professor}</span>
                  <span className="text-[11px] text-text-muted block">{video.professorTitle}</span>
                </div>
                <div>
                  <span className="text-text-soft block text-[11px]">Kafedra:</span>
                  <span className="font-medium text-text-main">{video.department}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border-ui">
                <div>
                  <span className="text-text-soft block text-[11px]">Faoliyat turi:</span>
                  <span className="font-semibold text-text-main">{video.activityType}</span>
                </div>
                <div>
                  <span className="text-text-soft block text-[11px]">Psixologik metod:</span>
                  <span className="font-semibold text-teal-800">{video.method}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border-ui">
                <span className="text-text-soft block text-[11px]">Anonim Bemor ID:</span>
                <span className="font-mono font-bold text-deep-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block mt-1">
                  {video.patientCode || 'PT-9012'}
                </span>
              </div>

              <div className="pt-2 border-t border-border-ui">
                <span className="text-text-soft block text-[11px]">Ta’limiy maqsad va ko‘rsatma:</span>
                <p className="text-text-main bg-page p-2.5 rounded-lg border border-border-ui mt-1 leading-relaxed">
                  {video.educationalObjective || video.description}
                </p>
              </div>
            </div>

            {/* Privacy Check Reminder */}
            <div className="bg-sage-light border border-sage rounded-xl p-3 flex items-start gap-2.5 text-xs text-teal-950">
              <ShieldCheck className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-teal-900">Etik va Maxfiylik Nazorati</p>
                <p className="text-teal-800 leading-relaxed text-[11px] mt-0.5">
                  Bemorning yuzi, ismi va shaxsiy ma’lumotlari videoda mavjud emasligi tekshirildi.
                </p>
              </div>
            </div>

            {/* SUPERVISOR ACTION BUTTONS */}
            <div className="pt-4 border-t border-border-ui space-y-2.5">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center text-xs font-bold bg-emerald-700 hover:bg-emerald-800"
                icon={<CheckCircle2 className="w-4 h-4" />}
                onClick={() => setIsApproveModalOpen(true)}
              >
                Tasdiqlash va nashr qilish
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-xs text-amber-700 hover:bg-amber-50 border-amber-300"
                  icon={<MessageSquare className="w-3.5 h-3.5" />}
                  onClick={() => setIsChangesModalOpen(true)}
                >
                  O‘zgarish talab qilish
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-xs text-rose-700 hover:bg-rose-50 border-rose-300"
                  icon={<XCircle className="w-3.5 h-3.5" />}
                  onClick={() => setIsRejectModalOpen(true)}
                >
                  Rad etish
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* MODAL 1: Approve Confirmation */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Ushbu videoni tasdiqlash va nashr qilishni xohlaysizmi?"
        description="Tasdiqlangach, video barcha talabalar uchun Video Library bo‘limida ochiq bo‘ladi."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsApproveModalOpen(false)}
            >
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="bg-emerald-700 hover:bg-emerald-800"
              icon={<CheckCircle2 className="w-4 h-4" />}
              onClick={handleApprove}
            >
              Tasdiqlash va e’lon qilish
            </Button>
          </>
        }
      >
        <div className="p-3 bg-page rounded-xl border border-border-ui text-xs space-y-1.5">
          <p><strong>Video:</strong> {video.title}</p>
          <p><strong>Muallif:</strong> {video.professor}</p>
          <p><strong>Davomiyligi:</strong> {video.duration}</p>
        </div>
      </Modal>

      {/* MODAL 2: Request Changes Dialog with Uzbek Comment Field */}
      {isChangesModalOpen && (
        <Modal
          isOpen={isChangesModalOpen}
          onClose={() => setIsChangesModalOpen(false)}
          title="O‘zgarish kiritish talab qilish"
          description="Professorga qanday metodik yoki mazmuniy tuzatishlar kiritish kerakligini yozing:"
          maxWidth="lg"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChangesModalOpen(false)}
              >
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-amber-700 hover:bg-amber-800"
                icon={<Send className="w-4 h-4" />}
                onClick={handleRequestChanges}
              >
                Izohni yuborish
              </Button>
            </>
          }
        >
          <form onSubmit={handleRequestChanges} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Supervizor izohi va talablari (O‘zbek tilida)*
              </label>
              <textarea
                rows={4}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Masalan: O‘quv maqsadlarida talabalar uchun ko‘rsatmalarni kengaytirish va 15-daqiqadagi KBT texnikasiga qo‘shimcha izoh kiritishingiz so‘raladi..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL 3: Reject Confirmation with Reason */}
      {isRejectModalOpen && (
        <Modal
          isOpen={isRejectModalOpen}
          onClose={() => setIsRejectModalOpen(false)}
          title="Videoni rad etish"
          description="Ushbu videoni rad etish sababini ko‘rsating:"
          maxWidth="lg"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRejectModalOpen(false)}
              >
                Bekor qilish
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="bg-rose-700 hover:bg-rose-800"
                onClick={handleReject}
              >
                Rad etishni tasdiqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleReject} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Rad etish sababi*
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Seans talablariga mos kelmaslik sababini yozing..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
