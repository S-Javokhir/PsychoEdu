import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Radio, 
  Video, 
  FileText, 
  FolderGit2, 
  ArrowRight, 
  Eye, 
  Clock, 
  User, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockLiveSessions } from '../data/liveSessions';
import { mockVideos } from '../data/videos';
import { mockMaterials } from '../data/materials';
import { mockCases } from '../data/cases';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { VideoCard } from '../components/domain/VideoCard';
import { MaterialCard } from '../components/domain/MaterialCard';
import { CaseCard } from '../components/domain/CaseCard';

export const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const firstName = currentUser.fullName.split(' ')[0];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-deep-teal to-teal-800 rounded-card p-6 sm:p-8 text-white shadow-card relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-xs text-sage mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-sage" />
            <span>Psixologiya fakulteti • Amaliy portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Assalomu alaykum, {firstName} 👋
          </h1>
          <p className="text-sm sm:text-base text-sage-light/90 leading-relaxed">
            Bugungi amaliy mashg‘ulotlar va yangi o‘quv materiallarini ko‘rib chiqing.
          </p>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none transform translate-x-8" />
      </div>

      {/* SECTION 1: Jonli amaliyotlar */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-main">
                Jonli amaliyotlar
              </h2>
              <p className="text-xs text-text-muted">
                Hozirda konsultatsiya xonalarida o‘tkazilayotgan jonli amaliy seanslar
              </p>
            </div>
          </div>

          <Link
            to="/live"
            className="text-xs sm:text-sm font-medium text-deep-teal hover:text-teal-700 flex items-center gap-1 transition-colors"
          >
            <span>Barchasini ko‘rish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockLiveSessions.map((session) => (
            <Card
              key={session.id}
              padded="md"
              className="flex flex-col justify-between hover:border-teal-400 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-deep-teal text-white text-xs font-bold px-2 py-0.5 rounded">
                      {session.roomNumber}
                    </span>
                    <Badge variant="success" size="sm" dot>
                      LIVE
                    </Badge>
                  </div>
                  <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-text-soft" />
                    Boshlangan: {session.startedAt}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-text-main group-hover:text-deep-teal transition-colors mb-1.5 line-clamp-2 leading-snug">
                  {session.title}
                </h3>

                <p className="text-xs text-teal-800 font-medium bg-teal-50 px-2 py-1 rounded inline-block mb-3">
                  {session.activityType}
                </p>

                <div className="space-y-1.5 text-xs text-text-muted mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-text-soft shrink-0" />
                    <span className="text-text-main font-medium">{session.professorName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="text-text-soft">Anonim Bemor:</span>
                    <span className="font-mono font-medium text-teal-900">{session.patientCode}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border-ui">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center"
                  icon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() => navigate(`/live/${session.id}`)}
                >
                  Kuzatish
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 2: Tavsiya etilgan videolar */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-main">
                Tavsiya etilgan videolar
              </h2>
              <p className="text-xs text-text-muted">
                Kafedra professorlari tomonidan o‘tkazilgan tasdiqlangan amaliyot yozuvlari
              </p>
            </div>
          </div>

          <Link
            to="/videos"
            className="text-xs sm:text-sm font-medium text-deep-teal hover:text-teal-700 flex items-center gap-1 transition-colors"
          >
            <span>Barcha videolar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockVideos.slice(0, 3).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* Grid: Yangi materiallar & So'nggi keyslar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SECTION 3: Yangi materiallar */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-main">
                  Yangi materiallar
                </h2>
                <p className="text-xs text-text-muted">
                  Metodik qo‘llanmalar va protokollar
                </p>
              </div>
            </div>

            <Link
              to="/materials"
              className="text-xs font-medium text-deep-teal hover:text-teal-700 flex items-center gap-1 transition-colors"
            >
              <span>Barchasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {mockMaterials.slice(0, 2).map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </section>

        {/* SECTION 4: So‘nggi keyslar */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-main">
                  So‘nggi keyslar
                </h2>
                <p className="text-xs text-text-muted">
                  Anonimlashtirilgan ta’limiy keyslar
                </p>
              </div>
            </div>

            <Link
              to="/cases"
              className="text-xs font-medium text-deep-teal hover:text-teal-700 flex items-center gap-1 transition-colors"
            >
              <span>Barchasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {mockCases.slice(0, 2).map((caseStudy) => (
              <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
