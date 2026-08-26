import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Archive, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProfessorData } from '../../context/ProfessorDataContext';
import { useAdminData } from '../../context/AdminDataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatCard } from '../../components/domain/StatCard';
import { VideoStatusBadge } from '../../components/status/VideoStatusBadge';

export const SupervisorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { videos } = useProfessorData();
  const { reviewLogs } = useAdminData();
  const navigate = useNavigate();

  const pendingReviewCount = videos.filter(v => v.status === 'Under Review' || v.status === 'Submitted').length;
  const changesRequestedCount = videos.filter(v => v.status === 'Changes Requested').length;
  const publishedCount = videos.filter(v => v.status === 'Published' || v.status === 'Approved').length;
  const archivedCount = videos.filter(v => v.status === 'Archived').length;

  const pendingVideos = videos.filter(v => v.status === 'Under Review' || v.status === 'Submitted');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-deep-teal via-teal-900 to-slate-900 rounded-card p-6 sm:p-8 text-white shadow-card relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-xs text-sage mb-3 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-sage" />
            <span>Kafedra Bosh Supervizori • Etik va Metodik Ekspertiza</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Assalomu alaykum, {currentUser.fullName} 👋
          </h1>
          <p className="text-sm sm:text-base text-sage-light/90 leading-relaxed">
            Professor va amaliyotchi psixologlar tomonidan yozib olingan amaliy mashg‘ulotlarni ekspertizadan o‘tkazish va ta’limiy nashrga ruxsat berish markazi.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-deep-teal hover:bg-sage-light font-semibold shadow-sm"
              icon={<CheckCircle2 className="w-4 h-4 text-blue-600" />}
              onClick={() => navigate('/supervisor/reviews')}
            >
              Review Center’ga o‘tish ({pendingReviewCount})
            </Button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none transform translate-x-8" />
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Ko‘rib chiqilishi kerak"
          value={pendingReviewCount}
          subtext="Ekspertiza kutilmoqda"
          icon={<Clock className="w-5 h-5 text-amber-700" />}
          iconBg="bg-amber-50"
        />

        <StatCard
          title="O‘zgarish talab qilinadi"
          value={changesRequestedCount}
          subtext="Qayta ishlashga yuborilgan"
          icon={<AlertCircle className="w-5 h-5 text-rose-700" />}
          iconBg="bg-rose-50"
        />

        <StatCard
          title="Nashr qilingan (Published)"
          value={publishedCount}
          subtext="Talabalar uchun ochiq"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-700" />}
          iconBg="bg-emerald-50"
        />

        <StatCard
          title="Arxivlangan"
          value={archivedCount}
          subtext="Eskirgan yoki arxiv yozuvlar"
          icon={<Archive className="w-5 h-5 text-gray-700" />}
          iconBg="bg-gray-100"
        />
      </div>

      {/* Two columns: Pending Reviews Queue + Recent Review Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-text-main flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Ko‘rib chiqilishi kutilayotgan videolar ({pendingVideos.length})</span>
            </h3>
            <Link
              to="/supervisor/reviews"
              className="text-xs font-semibold text-deep-teal hover:underline flex items-center gap-1"
            >
              <span>Barcha navbat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {pendingVideos.length === 0 ? (
            <Card padded="lg" className="text-center py-10 border-border-ui">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-text-main">Hozircha tekshiruvda yangi video yo‘q</h4>
              <p className="text-xs text-text-muted mt-1">Barcha yuborilgan amaliy mashg‘ulotlar ko‘rib chiqilgan.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {pendingVideos.map((video) => (
                <Card
                  key={video.id}
                  padded="md"
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-teal-300 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <VideoStatusBadge status={video.status} size="sm" />
                      <span className="text-xs text-text-muted">•</span>
                      <span className="text-xs text-text-muted">{video.activityType}</span>
                    </div>

                    <h4 className="text-sm font-bold text-text-main line-clamp-1">
                      {video.title}
                    </h4>

                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span>Muallif: <strong className="text-text-main">{video.professor}</strong></span>
                      <span>•</span>
                      <span className="text-teal-800">{video.method}</span>
                      <span>•</span>
                      <span className="font-mono">{video.duration}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="shrink-0 text-xs"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    onClick={() => navigate(`/supervisor/reviews/${video.id}`)}
                  >
                    Ekspertiza qilish
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Recent Review Logs */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-text-main flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-700" />
            <span>So‘nggi superviziya xulosalari</span>
          </h3>

          <Card padded="md" className="space-y-3.5 divide-y divide-border-ui border-border-ui">
            {reviewLogs.map((log) => (
              <div key={log.id} className="pt-3.5 first:pt-0 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                    log.action === 'Approved'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : log.action === 'Changes Requested'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {log.action === 'Approved' ? 'Tasdiqlandi' : log.action === 'Changes Requested' ? 'O‘zgarish talab qilindi' : 'Rad etildi'}
                  </span>
                  <span className="text-text-soft text-[11px]">{log.date}</span>
                </div>

                <p className="font-medium text-text-main line-clamp-1">
                  {log.videoTitle}
                </p>

                <p className="text-text-muted text-[11px]">
                  Muallif: {log.professorName}
                </p>

                {log.comment && (
                  <p className="bg-page p-2 rounded text-[11px] text-text-main border border-border-ui leading-relaxed">
                    «{log.comment}»
                  </p>
                )}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};
