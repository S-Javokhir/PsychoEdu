import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Disc, 
  Video, 
  FileText, 
  FolderGit2, 
  CalendarCheck, 
  Plus, 
  ArrowRight, 
  Clock, 
  Building, 
  GraduationCap, 
  Stethoscope,
  Sparkles,
  FilePlus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProfessorData } from '../../context/ProfessorDataContext';
import { mockTeachingActivities, mockPracticalActivities } from '../../data/professorData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatCard } from '../../components/domain/StatCard';
import { VideoStatusBadge } from '../../components/status/VideoStatusBadge';

export const ProfessorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { sessions, videos, materials, cases } = useProfessorData();
  const navigate = useNavigate();

  const draftSessions = sessions.filter(s => s.status === 'Draft');
  const reviewSessions = sessions.filter(s => s.status === 'Under Review' || s.status === 'Submitted');
  const changesSessions = sessions.filter(s => s.status === 'Changes Requested');
  const publishedSessions = sessions.filter(s => s.status === 'Published');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-deep-teal via-teal-800 to-teal-900 rounded-card p-6 sm:p-8 text-white shadow-card relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-xs text-sage mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-sage" />
            <span>Klinik va amaliy psixologiya kafedrasi • Professor & Psixolog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Assalomu alaykum, {currentUser.fullName} 👋
          </h1>
          <p className="text-sm sm:text-base text-sage-light/90 leading-relaxed">
            Bugungi akademik darslar, amaliy psixologik seanslar va ta’limiy kontent boshqaruvi.
          </p>

          {/* Quick action buttons row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-deep-teal hover:bg-sage-light font-semibold shadow-sm"
              icon={<Disc className="w-4 h-4 text-rose-600" />}
              onClick={() => navigate('/professor/recording')}
            >
              Seansni boshlash
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => navigate('/professor/videos')}
            >
              Video qo‘shish
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
              icon={<FilePlus className="w-4 h-4" />}
              onClick={() => navigate('/professor/materials')}
            >
              Material qo‘shish
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
              icon={<FolderGit2 className="w-4 h-4" />}
              onClick={() => navigate('/professor/cases')}
            >
              Keys yaratish
            </Button>
          </div>
        </div>

        {/* Decorative background circles */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none transform translate-x-8" />
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Mening Seanslarim"
          value={sessions.length}
          subtext={`${draftSessions.length} qoralama • ${publishedSessions.length} e’lon qilingan`}
          icon={<CalendarCheck className="w-5 h-5 text-deep-teal" />}
          iconBg="bg-teal-50"
        />

        <StatCard
          title="Video Kontent"
          value={videos.length}
          subtext={`${reviewSessions.length} ta tekshiruvda`}
          icon={<Video className="w-5 h-5 text-blue-700" />}
          iconBg="bg-blue-50"
        />

        <StatCard
          title="O‘quv Materiallarim"
          value={materials.length}
          subtext="Metodik qo‘llanmalar"
          icon={<FileText className="w-5 h-5 text-teal-700" />}
          iconBg="bg-sage-light"
        />

        <StatCard
          title="Amaliy Keyslarim"
          value={cases.length}
          subtext="Anonimlashtirilgan"
          icon={<FolderGit2 className="w-5 h-5 text-amber-700" />}
          iconBg="bg-amber-50"
        />
      </div>

      {/* TWO CORE FUNCTIONAL AREAS: Ta'lim & Amaliyot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AREA 1: Ta'lim Faoliyati */}
        <Card padded="lg" className="border-border-ui space-y-5">
          <div className="flex items-center justify-between border-b border-border-ui pb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-200">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-main">
                  Ta’lim faoliyati
                </h3>
                <p className="text-xs text-text-muted">
                  Bugungi akademik mashg‘ulotlar va dars jadvali
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold bg-teal-50 text-teal-800 px-2.5 py-1 rounded-full border border-teal-200">
              Bugun 3 ta dars
            </span>
          </div>

          {/* Schedule List */}
          <div className="space-y-3">
            {mockTeachingActivities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 bg-page rounded-xl border border-border-ui flex items-center justify-between gap-3 hover:border-teal-300 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-teal-900 bg-sage-light px-2 py-0.5 rounded border border-sage">
                      {act.type}
                    </span>
                    <span className="text-xs font-semibold text-text-main">
                      {act.subject}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-text-soft" />
                      {act.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-text-soft" />
                      {act.room} ({act.group})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Teaching Quick Links */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <Link
              to="/professor/materials"
              className="text-deep-teal font-medium hover:text-teal-700 flex items-center gap-1"
            >
              <span>Metodik qo‘llanmalarni ko‘rish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/professor/cases"
              className="text-deep-teal font-medium hover:text-teal-700 flex items-center gap-1"
            >
              <span>Keyslar bazasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>

        {/* AREA 2: Amaliyot Faoliyati */}
        <Card padded="lg" className="border-border-ui space-y-5">
          <div className="flex items-center justify-between border-b border-border-ui pb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-main">
                  Amaliyot faoliyati
                </h3>
                <p className="text-xs text-text-muted">
                  Psixologik xizmat, individual va guruh konsultatsiyalari
                </p>
              </div>
            </div>
            <Link to="/professor/recording">
              <Button variant="primary" size="sm" className="text-xs">
                Yangi Seans
              </Button>
            </Link>
          </div>

          {/* Practical sessions */}
          <div className="space-y-3">
            {mockPracticalActivities.map((pract) => (
              <div
                key={pract.id}
                className="p-3.5 bg-page rounded-xl border border-border-ui flex items-center justify-between gap-3 hover:border-teal-300 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-deep-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {pract.patientCode}
                    </span>
                    <h4 className="text-xs font-semibold text-text-main">
                      {pract.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-text-soft" />
                      {pract.time}
                    </span>
                    <span>•</span>
                    <span>{pract.roomNumber}</span>
                    <span>•</span>
                    <span className="text-teal-800">{pract.method}</span>
                  </div>
                </div>

                <div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      pract.status === 'Tugallandi'
                        ? 'bg-gray-100 text-gray-700 border-gray-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {pract.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <Link
              to="/live"
              className="text-deep-teal font-medium hover:text-teal-700 flex items-center gap-1"
            >
              <span>Live kameralarni ko‘rish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/professor/sessions"
              className="text-deep-teal font-medium hover:text-teal-700 flex items-center gap-1"
            >
              <span>Mening barcha seanslarim</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>
      </div>

      {/* SECTION: Seanslar va Kontent Holati (Drafts, Review, Recent) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-text-main">
              So‘nggi seanslar va kontent holati
            </h3>
            <p className="text-xs text-text-muted">
              Qoralamalar, ko‘rib chiqilayotgan yozuvlar va tasdiqlangan ta’limiy videolar
            </p>
          </div>
          <Link
            to="/professor/sessions"
            className="text-xs sm:text-sm font-medium text-deep-teal hover:text-teal-700 flex items-center gap-1"
          >
            <span>Barchasini boshqarish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Qoralamalar (Drafts) */}
          <Card padded="md" className="space-y-3 border-border-ui">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-text-main flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                <span>Qoralamalar ({draftSessions.length})</span>
              </h4>
              <Link to="/professor/sessions?status=Draft" className="text-xs text-deep-teal hover:underline">
                Barchasi
              </Link>
            </div>

            {draftSessions.length === 0 ? (
              <p className="text-xs text-text-muted py-4 text-center">
                Qoralamalar mavjud emas
              </p>
            ) : (
              <div className="space-y-2.5">
                {draftSessions.slice(0, 2).map((s) => (
                  <div
                    key={s.id}
                    onClick={() => navigate(`/professor/sessions`)}
                    className="p-3 bg-page rounded-lg border border-border-ui hover:border-teal-300 transition-colors cursor-pointer"
                  >
                    <p className="text-xs font-semibold text-text-main line-clamp-1 mb-1">
                      {s.title}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-text-muted">
                      <span>{s.roomNumber} • {s.duration}</span>
                      <VideoStatusBadge status="Draft" size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Card 2: Ko'rib chiqilmoqda (Under Review & Changes) */}
          <Card padded="md" className="space-y-3 border-border-ui">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-text-main flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Ko‘rib chiqilmoqda ({reviewSessions.length + changesSessions.length})</span>
              </h4>
              <Link to="/professor/sessions?status=Under Review" className="text-xs text-deep-teal hover:underline">
                Barchasi
              </Link>
            </div>

            <div className="space-y-2.5">
              {[...reviewSessions, ...changesSessions].slice(0, 2).map((s) => (
                <div
                  key={s.id}
                  onClick={() => navigate(`/professor/sessions`)}
                  className="p-3 bg-page rounded-lg border border-border-ui hover:border-teal-300 transition-colors cursor-pointer"
                >
                  <p className="text-xs font-semibold text-text-main line-clamp-1 mb-1">
                    {s.title}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-text-muted">
                    <span className="font-mono text-teal-800">{s.patientCode}</span>
                    <VideoStatusBadge status={s.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Card 3: Yaqinda e'lon qilingan (Published) */}
          <Card padded="md" className="space-y-3 border-border-ui">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-text-main flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>E’lon qilingan ({publishedSessions.length})</span>
              </h4>
              <Link to="/professor/sessions?status=Published" className="text-xs text-deep-teal hover:underline">
                Barchasi
              </Link>
            </div>

            <div className="space-y-2.5">
              {publishedSessions.slice(0, 2).map((s) => (
                <div
                  key={s.id}
                  onClick={() => navigate(`/videos`)}
                  className="p-3 bg-page rounded-lg border border-border-ui hover:border-teal-300 transition-colors cursor-pointer"
                >
                  <p className="text-xs font-semibold text-text-main line-clamp-1 mb-1">
                    {s.title}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-text-muted">
                    <span>{s.date}</span>
                    <VideoStatusBadge status="Published" size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};
