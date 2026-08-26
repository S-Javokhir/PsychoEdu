import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Video, 
  Bookmark, 
  AlertCircle,
  HelpCircle,
  Stethoscope
} from 'lucide-react';
import { mockCases } from '../data/cases';
import { mockVideos } from '../data/videos';
import { mockMaterials } from '../data/materials';
import { useBookmarks } from '../context/BookmarkContext';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const caseStudy = mockCases.find((c) => c.id === id) || mockCases[0];
  const bookmarked = isBookmarked('case', caseStudy.id);

  const relatedVideo = caseStudy.relatedVideoId
    ? mockVideos.find((v) => v.id === caseStudy.relatedVideoId)
    : null;

  const relatedMaterials = mockMaterials.filter((m) =>
    caseStudy.relatedMaterialIds.includes(m.id)
  );

  const getDifficultyBadge = () => {
    switch (caseStudy.difficulty) {
      case 'Boshlang‘ich':
        return <Badge variant="success" size="md">Boshlang‘ich daraja</Badge>;
      case 'O‘rta':
        return <Badge variant="warning" size="md">O‘rta daraja</Badge>;
      case 'Murakkab':
        return <Badge variant="danger" size="md">Murakkab keys</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${caseStudy.caseNumber}: ${caseStudy.title}`}
        description={`${caseStudy.topic} • Anonimlashtirilgan o‘quv tahlili`}
        breadcrumbs={[
          { label: 'Keyslar', href: '/cases' },
          { label: caseStudy.caseNumber }
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => navigate('/cases')}
            >
              Orqaga
            </Button>
            <Button
              variant={bookmarked ? 'secondary' : 'outline'}
              size="sm"
              icon={<Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-teal-700' : ''}`} />}
              onClick={() => toggleBookmark('case', caseStudy.id)}
            >
              {bookmarked ? 'Saqlangan' : 'Saqlash'}
            </Button>
          </div>
        }
      />

      {/* Main Grid: Clinical breakdown + Sidebar resources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Case In-depth Story */}
        <div className="lg:col-span-2 space-y-6">
          {/* Anonymity Banner */}
          <div className="bg-sage-light border border-sage rounded-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-teal-800 shrink-0" />
              <div>
                <p className="text-xs font-bold text-teal-950">
                  Anonim Bemor Identifikatori: {caseStudy.patientCode}
                </p>
                <p className="text-[11px] text-teal-800">
                  Shaxsiy ma’lumotlar shifrlangan. Barcha faktlar ta’limiy maqsadga moslashtirilgan.
                </p>
              </div>
            </div>
            {getDifficultyBadge()}
          </div>

          {/* Section 1: Presenting Problem */}
          <Card padded="lg">
            <h3 className="text-base font-bold text-text-main mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-600" />
              <span>1. Asosiy murojaat sababi va shikoyatlar</span>
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4 bg-page p-4 rounded-xl border border-border-ui">
              {caseStudy.presentingProblem}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-2 border-t border-border-ui">
              <span>Yosh guruhi: <strong className="text-text-main">{caseStudy.ageGroup}</strong></span>
              <span>•</span>
              <span>Asosiy yo‘nalish: <strong className="text-text-main">{caseStudy.topic}</strong></span>
            </div>
          </Card>

          {/* Section 2: Observed Symptoms */}
          <Card padded="lg">
            <h3 className="text-base font-bold text-text-main mb-3 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>2. Diagnostik suhbatda kuzatilgan asosiy alomatlar</span>
            </h3>

            <div className="space-y-2.5">
              {caseStudy.observedSymptoms.map((symptom, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-page rounded-lg border border-border-ui flex items-start gap-3 text-xs sm:text-sm text-text-main"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 3: Applied Approach */}
          <Card padded="lg">
            <h3 className="text-base font-bold text-text-main mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>3. Qo‘llanilgan psixologik metod va intervensiya jarayoni</span>
            </h3>

            <div className="mb-4">
              <span className="text-xs font-semibold text-deep-teal bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 inline-block mb-2">
                Metod: {caseStudy.method}
              </span>
              <p className="text-sm text-text-muted leading-relaxed">
                {caseStudy.approachDescription}
              </p>
            </div>
          </Card>

          {/* Section 4: Outcome Summary */}
          <Card padded="lg" className="border-teal-300 bg-teal-50/20">
            <h3 className="text-base font-bold text-text-main mb-2">
              4. Amaliy natija va yakuniy xulosa
            </h3>
            <p className="text-sm text-text-main leading-relaxed">
              {caseStudy.outcomeSummary}
            </p>
          </Card>
        </div>

        {/* Right 1 Col: Cross-linked Video & Materials */}
        <div className="space-y-6">
          {/* Related Video */}
          {relatedVideo && (
            <Card padded="md" className="border-teal-300">
              <div className="flex items-center gap-2 text-deep-teal font-semibold text-xs mb-3">
                <Video className="w-4 h-4" />
                <span>Ushbu Keys Bo‘yicha Amaliy Yozuv</span>
              </div>

              <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden relative mb-3 group">
                <img
                  src={relatedVideo.thumbnailUrl}
                  alt={relatedVideo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-xs font-semibold text-white truncate">
                    {relatedVideo.title}
                  </span>
                </div>
              </div>

              <p className="text-xs text-text-muted line-clamp-2 mb-3">
                {relatedVideo.description}
              </p>

              <Link to={`/videos/${relatedVideo.id}`}>
                <Button variant="primary" size="sm" className="w-full text-xs">
                  Videoni tomosha qilish
                </Button>
              </Link>
            </Card>
          )}

          {/* Related Materials */}
          {relatedMaterials.length > 0 && (
            <Card padded="md">
              <div className="flex items-center gap-2 text-deep-teal font-semibold text-xs mb-3">
                <FileText className="w-4 h-4" />
                <span>Tavsiya etilgan qo‘llanmalar ({relatedMaterials.length})</span>
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

          {/* Ethics Note */}
          <Card padded="sm" className="bg-page">
            <div className="flex items-start gap-2 text-xs text-text-muted">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                Keys materiallari faqat o‘quv seminarlari va mustaqil tahlil uchun tavsiya etiladi.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
