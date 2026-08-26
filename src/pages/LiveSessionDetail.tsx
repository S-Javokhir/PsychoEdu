import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FolderGit2, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { mockLiveSessions } from '../data/liveSessions';
import { mockCases } from '../data/cases';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { LiveStreamPlayer } from '../components/domain/LiveStreamPlayer';

export const LiveSessionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const session = mockLiveSessions.find((s) => s.id === id) || mockLiveSessions[0];
  const relatedCase = session.relatedCaseId ? mockCases.find(c => c.id === session.relatedCaseId) : null;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <PageHeader
        title={`${session.roomNumber}: ${session.title}`}
        description={`${session.professorName} tomonidan olib borilayotgan jonli amaliy mashg‘ulot`}
        breadcrumbs={[
          { label: 'Live Monitoring', href: '/live' },
          { label: session.roomNumber }
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/live')}
          >
            Ro‘yxatga qaytish
          </Button>
        }
      />

      {/* Main Grid: Video Player + Session Info Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Player */}
        <div className="lg:col-span-2 space-y-6">
          <LiveStreamPlayer session={session} />

          {/* Student Watch-Only Banner */}
          <div className="bg-sage-light border border-sage rounded-card p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
            <div className="text-xs text-teal-950">
              <p className="font-semibold text-teal-900 mb-0.5">
                Talaba rejimi: Faqat kuzatish (Watch-Only)
              </p>
              <p className="text-teal-800/90 leading-relaxed">
                Ushbu seans professional etika va konfidensiallik qoidalariga binoan faqat o‘quv-kuzatuv maqsadida uzatilmoqda. Kamera burish yoki yozib olish imkoniyati faqat supervizor va professor uchun ochiq.
              </p>
            </div>
          </div>

          {/* Session Details Card */}
          <Card padded="lg">
            <h3 className="text-base font-bold text-text-main mb-3">
              Amaliy seans haqida ma’lumot
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              {session.description}
            </p>

            {/* Session Objectives */}
            <div>
              <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">
                Kuzatuv davomidagi asosiy ta’limiy vazifalar:
              </h4>
              <ul className="space-y-2.5">
                {session.sessionObjectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-main">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Professor & Case Details */}
        <div className="space-y-6">
          {/* Professor / Therapist Card */}
          <Card padded="md">
            <h4 className="text-xs font-semibold text-text-soft uppercase tracking-wider mb-3">
              Amaliyotchi Mutaxassis
            </h4>
            <div className="flex items-start gap-3 mb-4">
              <Avatar src={session.professorAvatar} name={session.professorName} size="lg" />
              <div>
                <h4 className="text-sm font-bold text-text-main">
                  {session.professorName}
                </h4>
                <p className="text-xs text-text-muted mt-0.5">
                  {session.professorTitle}
                </p>
                <span className="inline-block mt-2 text-[11px] font-medium bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                  {session.psychologicalMethod}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-border-ui space-y-2 text-xs text-text-muted">
              <div className="flex items-center justify-between">
                <span>Xona:</span>
                <span className="font-semibold text-text-main">{session.roomNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Faoliyat turi:</span>
                <span className="font-semibold text-text-main">{session.activityType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Boshlangan vaqti:</span>
                <span className="font-mono text-text-main">{session.startedAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Anonim Bemor:</span>
                <span className="font-mono font-bold text-deep-teal bg-sage-light px-2 py-0.5 rounded">
                  {session.patientCode}
                </span>
              </div>
            </div>
          </Card>

          {/* Related Case Study Card */}
          {relatedCase && (
            <Card padded="md" className="border-teal-200 bg-teal-50/30">
              <div className="flex items-center gap-2 text-deep-teal font-semibold text-xs mb-2">
                <FolderGit2 className="w-4 h-4" />
                <span>Bog‘liq Keys Tahlili</span>
              </div>
              <h4 className="text-sm font-bold text-text-main mb-1.5 line-clamp-2">
                {relatedCase.caseNumber}: {relatedCase.title}
              </h4>
              <p className="text-xs text-text-muted line-clamp-2 mb-3">
                {relatedCase.presentingProblem}
              </p>
              <Link to={`/cases/${relatedCase.id}`}>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Keysni ochish
                </Button>
              </Link>
            </Card>
          )}

          {/* Ethical guideline reminder */}
          <Card padded="sm" className="bg-page border-border-ui">
            <div className="flex items-start gap-2 text-xs text-text-muted">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                Ushbu seansdagi holatlarni darsdan tashqarida muhokama qilish yoki tarqatish qat’iyan man etiladi.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
