import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Bookmark, Sparkles, UserCheck } from 'lucide-react';
import type { CaseStudy } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useBookmarks } from '../../context/BookmarkContext';

interface CaseCardProps {
  caseStudy: CaseStudy;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseStudy }) => {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const bookmarked = isBookmarked('case', caseStudy.id);

  const getDifficultyBadge = () => {
    switch (caseStudy.difficulty) {
      case 'Boshlang‘ich':
        return <Badge variant="success" size="sm">Boshlang‘ich</Badge>;
      case 'O‘rta':
        return <Badge variant="warning" size="sm">O‘rta daraja</Badge>;
      case 'Murakkab':
        return <Badge variant="danger" size="sm">Murakkab keys</Badge>;
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark('case', caseStudy.id);
  };

  return (
    <Card padded="md" className="flex flex-col justify-between hover:border-teal-300 transition-all duration-150">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
            <span className="font-mono text-xs font-bold text-deep-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-100 whitespace-nowrap shrink-0">
              {caseStudy.caseNumber}
            </span>
            <div className="inline-flex items-center gap-1 text-[11px] text-text-muted bg-page px-2 py-0.5 rounded border border-border-ui whitespace-nowrap shrink-0">
              <ShieldCheck className="w-3 h-3 text-teal-600 shrink-0" />
              <span className="font-mono">{caseStudy.patientCode}</span>
            </div>
            {getDifficultyBadge()}
          </div>

          <button
            type="button"
            onClick={handleBookmark}
            className={`p-1.5 rounded-md text-text-muted hover:text-deep-teal hover:bg-sage-light transition-colors shrink-0 ${
              bookmarked ? 'text-teal-700' : ''
            }`}
            title={bookmarked ? 'Xatcho‘pdan o‘chirish' : 'Xatcho‘pga saqlash'}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-teal-700' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h4
          onClick={() => navigate(`/cases/${caseStudy.id}`)}
          className="text-sm font-semibold text-text-main hover:text-deep-teal cursor-pointer mb-1.5 leading-snug line-clamp-2"
        >
          {caseStudy.title}
        </h4>

        {/* Topic & Age Group */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted mb-3">
          <span className="flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-text-soft" />
            {caseStudy.ageGroup}
          </span>
          <span>•</span>
          <span className="text-text-soft">{caseStudy.topic}</span>
        </div>

        {/* Method */}
        <div className="mb-3.5">
          <span className="inline-flex items-start gap-1.5 text-xs font-medium text-teal-900 bg-sage-light px-2.5 py-1 rounded-md border border-sage max-w-full leading-normal">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
            <span className="break-words">{caseStudy.method}</span>
          </span>
        </div>

        {/* Presenting problem excerpt */}
        <p className="text-xs text-text-muted line-clamp-2 mb-4 bg-page p-2.5 rounded-lg border border-border-ui">
          <span className="font-medium text-text-main">Murojaat: </span>
          {caseStudy.presentingProblem}
        </p>

        {/* Symptoms tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {caseStudy.observedSymptoms.slice(0, 2).map((symptom, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-gray-50 text-gray-700 px-2 py-0.5 rounded border border-gray-200 break-words max-w-full leading-tight"
            >
              {symptom}
            </span>
          ))}
          {caseStudy.observedSymptoms.length > 2 && (
            <span className="text-[11px] text-text-soft px-1.5 py-0.5 shrink-0">
              +{caseStudy.observedSymptoms.length - 2} ta
            </span>
          )}
        </div>
      </div>

      {/* Action */}
      <div className="pt-3 border-t border-border-ui">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between group-hover:border-teal-400"
          onClick={() => navigate(`/cases/${caseStudy.id}`)}
        >
          <span>Batafsil tahlilni o‘qish</span>
          <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </Card>
  );
};
