import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Download, 
  Bookmark, 
  Check, 
  ArrowLeft, 
  Layers, 
  Video, 
  FolderGit2 
} from 'lucide-react';
import { mockMaterials } from '../data/materials';
import { mockVideos } from '../data/videos';
import { mockCases } from '../data/cases';
import { useBookmarks } from '../context/BookmarkContext';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const MaterialDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [downloaded, setDownloaded] = useState(false);

  const material = mockMaterials.find((m) => m.id === id) || mockMaterials[0];
  const bookmarked = isBookmarked('material', material.id);

  const relatedVideos = mockVideos.filter((v) => material.relatedVideoIds?.includes(v.id));
  const relatedCases = mockCases.filter((c) => material.relatedCaseIds?.includes(c.id));

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={material.title}
        description={`${material.category} • ${material.department}`}
        breadcrumbs={[
          { label: 'Materiallar', href: '/materials' },
          { label: material.title }
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => navigate('/materials')}
            >
              Orqaga
            </Button>
            <Button
              variant={bookmarked ? 'secondary' : 'outline'}
              size="sm"
              icon={<Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-teal-700' : ''}`} />}
              onClick={() => toggleBookmark('material', material.id)}
            >
              {bookmarked ? 'Saqlangan' : 'Saqlash'}
            </Button>
            <Button
              variant={downloaded ? 'secondary' : 'primary'}
              size="sm"
              icon={downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              onClick={handleDownload}
            >
              {downloaded ? 'Yuklandi' : 'Yuklab olish'}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Content & Table of contents */}
        <div className="lg:col-span-2 space-y-6">
          <Card padded="lg">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="teal" size="sm">
                {material.category}
              </Badge>
              <span className="text-xs uppercase font-mono font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
                {material.fileType}
              </span>
              <span className="text-xs text-text-muted ml-auto">
                Oxirgi yangilanish: {material.updatedAt}
              </span>
            </div>

            <h2 className="text-xl font-bold text-text-main mb-3">
              Qo‘llanmaning qisqacha mazmuni
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              {material.description}
            </p>

            {material.summary && (
              <div className="p-4 bg-sage-light/60 rounded-xl border border-sage mb-6">
                <h3 className="text-xs font-bold text-teal-950 uppercase tracking-wider mb-2">
                  Metodik ahamiyati va talabalarga ko‘rsatma:
                </h3>
                <p className="text-xs sm:text-sm text-teal-900 leading-relaxed">
                  {material.summary}
                </p>
              </div>
            )}

            {/* Table of Contents */}
            {material.tableOfContents && (
              <div>
                <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-600" />
                  <span>Mundarija va amaliy modullar:</span>
                </h3>

                <div className="space-y-2">
                  {material.tableOfContents.map((section, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-page rounded-lg border border-border-ui flex items-center gap-3 text-xs sm:text-sm text-text-main"
                    >
                      <span className="w-6 h-6 rounded-md bg-teal-50 text-deep-teal font-mono font-bold text-xs flex items-center justify-center border border-teal-100 shrink-0">
                        0{idx + 1}
                      </span>
                      <span>{section}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right 1 Col: Metadata & Linked Resources */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <Card padded="md">
            <h4 className="text-xs font-semibold text-text-soft uppercase tracking-wider mb-3">
              Hujjat Ma’lumotlari
            </h4>

            <div className="space-y-3 text-xs text-text-muted">
              <div>
                <span className="text-text-soft block text-[11px] mb-0.5">Muallif:</span>
                <span className="font-semibold text-text-main text-sm">{material.author}</span>
                <p className="text-[11px] text-text-soft">{material.authorTitle}</p>
              </div>

              <div className="pt-2 border-t border-border-ui">
                <span className="text-text-soft block text-[11px] mb-0.5">Kafedra:</span>
                <span className="font-medium text-text-main">{material.department}</span>
              </div>

              <div className="pt-2 border-t border-border-ui grid grid-cols-2 gap-2">
                <div>
                  <span className="text-text-soft block text-[11px]">Hajmi:</span>
                  <span className="font-semibold text-text-main font-mono">{material.fileSize}</span>
                </div>
                <div>
                  <span className="text-text-soft block text-[11px]">Hajm (betlar):</span>
                  <span className="font-semibold text-text-main">{material.pagesCount} bet</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border-ui">
              <Button
                variant={downloaded ? 'secondary' : 'primary'}
                size="sm"
                className="w-full justify-center text-xs"
                icon={downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                onClick={handleDownload}
              >
                {downloaded ? 'Yuklab olindi' : 'Faylni yuklab olish'}
              </Button>
            </div>
          </Card>

          {/* Linked Video Sessions */}
          {relatedVideos.length > 0 && (
            <Card padded="md">
              <div className="flex items-center gap-2 text-deep-teal font-semibold text-xs mb-3">
                <Video className="w-4 h-4" />
                <span>Bog‘liq Amaliy Yozuvlar ({relatedVideos.length})</span>
              </div>

              <div className="space-y-2.5">
                {relatedVideos.map((video) => (
                  <Link
                    key={video.id}
                    to={`/videos/${video.id}`}
                    className="p-2.5 bg-page rounded-lg border border-border-ui hover:border-teal-300 transition-colors block"
                  >
                    <p className="text-xs font-semibold text-text-main line-clamp-1">
                      {video.title}
                    </p>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      {video.professor} • {video.duration}
                    </p>
                  </Link>
                ))}
              </div>
            </Card>
          )}

          {/* Linked Cases */}
          {relatedCases.length > 0 && (
            <Card padded="md" className="border-teal-200 bg-teal-50/20">
              <div className="flex items-center gap-2 text-deep-teal font-semibold text-xs mb-3">
                <FolderGit2 className="w-4 h-4" />
                <span>Bog‘liq Keys Tahlillari</span>
              </div>

              <div className="space-y-2.5">
                {relatedCases.map((cs) => (
                  <Link
                    key={cs.id}
                    to={`/cases/${cs.id}`}
                    className="p-2.5 bg-surface rounded-lg border border-border-ui hover:border-teal-400 transition-colors block"
                  >
                    <p className="text-xs font-semibold text-text-main line-clamp-1">
                      {cs.caseNumber} — {cs.title}
                    </p>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      Bemor: {cs.patientCode} • {cs.method}
                    </p>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
