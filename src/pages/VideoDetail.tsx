import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Clock, 
  Sparkles, 
  FileText, 
  FolderGit2, 
  ArrowLeft, 
  Calendar,
  Eye,
  Building
} from 'lucide-react';
import { mockVideos } from '../data/videos';
import { mockMaterials } from '../data/materials';
import { mockCases } from '../data/cases';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { VideoPlayer } from '../components/domain/VideoPlayer';

export const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedTimestamp, setSelectedTimestamp] = React.useState<string | undefined>(undefined);

  const video = mockVideos.find((v) => v.id === id) || mockVideos[0];
  const relatedMaterials = mockMaterials.filter((m) => video.relatedMaterialIds.includes(m.id));
  const relatedCase = video.relatedCaseId ? mockCases.find((c) => c.id === video.relatedCaseId) : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={video.title}
        description={`${video.activityType} • ${video.department}`}
        breadcrumbs={[
          { label: 'Video Library', href: '/videos' },
          { label: video.title }
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/videos')}
          >
            Videolarga qaytish
          </Button>
        }
      />

      {/* Main Grid: Video Player + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Player & In-depth methods */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer video={video} currentTimestamp={selectedTimestamp} />

          {/* Video Overview Card */}
          <Card padded="lg">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="teal" size="sm">
                {video.activityType}
              </Badge>
              <Badge variant="sage" size="sm">
                {video.method}
              </Badge>
              <span className="text-xs text-text-muted flex items-center gap-1 ml-auto">
                <Calendar className="w-3.5 h-3.5 text-text-soft" />
                {video.recordedDate}
              </span>
              <span className="text-xs text-text-muted flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-text-soft" />
                {video.viewCount} marta ko‘rilgan
              </span>
            </div>

            <h2 className="text-lg font-bold text-text-main mb-2">
              Seans tavsifi va ta’limiy maqsadi
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              {video.description}
            </p>

            {/* Applied Psychological Methods Breakdown */}
            <div>
              <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Videoda qo‘llanilgan psixologik metodlar va texnikalar:</span>
              </h3>

              <div className="space-y-3">
                {video.appliedMethods.map((method, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedTimestamp(method.timestamp)}
                    className="p-3.5 bg-page rounded-xl border border-border-ui flex items-start gap-3 hover:border-teal-400 hover:bg-teal-50/30 cursor-pointer transition-all duration-150 group"
                  >
                    <span className="font-mono text-xs font-bold text-deep-teal bg-teal-50 px-2 py-1 rounded border border-teal-200 shrink-0 group-hover:bg-deep-teal group-hover:text-white transition-colors">
                      ▶ {method.timestamp}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-text-main mb-1 group-hover:text-deep-teal transition-colors">
                        {method.title}
                      </h4>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {method.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Instructor & Cross-linked Resources */}
        <div className="space-y-6">
          {/* Professor / Instructor Card */}
          <Card padded="md">
            <h4 className="text-xs font-semibold text-text-soft uppercase tracking-wider mb-3">
              Amaliyotchi Mutaxassis
            </h4>
            <div className="flex items-start gap-3 mb-4">
              <Avatar src={video.professorAvatar} name={video.professor} size="lg" />
              <div>
                <h4 className="text-sm font-bold text-text-main">
                  {video.professor}
                </h4>
                <p className="text-xs text-text-muted mt-0.5">
                  {video.professorTitle}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border-ui space-y-2 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-text-soft shrink-0" />
                <span className="text-text-main font-medium">{video.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-text-soft shrink-0" />
                <span>Davomiyligi: <strong className="text-text-main font-mono">{video.duration}</strong></span>
              </div>
            </div>
          </Card>

          {/* Related Case Study */}
          {relatedCase && (
            <Card padded="md" className="border-teal-200 bg-teal-50/20">
              <div className="flex items-center gap-2 text-deep-teal font-semibold text-xs mb-2">
                <FolderGit2 className="w-4 h-4" />
                <span>Bog‘liq Keys</span>
              </div>
              <h4 className="text-sm font-bold text-text-main mb-1.5 line-clamp-2">
                {relatedCase.caseNumber} — {relatedCase.title}
              </h4>
              <p className="text-xs text-text-muted line-clamp-2 mb-3">
                {relatedCase.presentingProblem}
              </p>
              <Link to={`/cases/${relatedCase.id}`}>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Keys tahlilini o‘qish
                </Button>
              </Link>
            </Card>
          )}

          {/* Related Educational Materials */}
          {relatedMaterials.length > 0 && (
            <Card padded="md">
              <div className="flex items-center gap-2 text-deep-teal font-semibold text-xs mb-3">
                <FileText className="w-4 h-4" />
                <span>Bog‘liq o‘quv materiallari ({relatedMaterials.length})</span>
              </div>

              <div className="space-y-2.5">
                {relatedMaterials.map((mat) => (
                  <div
                    key={mat.id}
                    className="p-2.5 bg-page rounded-lg border border-border-ui hover:border-teal-300 transition-colors flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-text-main truncate">
                        {mat.title}
                      </p>
                      <p className="text-[11px] text-text-muted">
                        {mat.category} • {mat.fileSize}
                      </p>
                    </div>

                    <Link to={`/materials/${mat.id}`}>
                      <Button variant="ghost" size="sm" className="p-1.5 text-deep-teal">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
