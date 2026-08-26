import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, FileSpreadsheet, Presentation, Download, Bookmark, Check, Eye } from 'lucide-react';
import type { Material } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useBookmarks } from '../../context/BookmarkContext';

interface MaterialCardProps {
  material: Material;
  onPreview?: (mat: Material) => void;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({ material, onPreview }) => {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [downloaded, setDownloaded] = useState(false);

  const bookmarked = isBookmarked('material', material.id);

  const getFileIcon = () => {
    switch (material.fileType) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'docx':
        return <FileSpreadsheet className="w-5 h-5 text-blue-600" />;
      case 'pptx':
        return <Presentation className="w-5 h-5 text-amber-600" />;
      default:
        return <FileText className="w-5 h-5 text-teal-600" />;
    }
  };

  const getFileTypeBadge = () => {
    switch (material.fileType) {
      case 'pdf':
        return <span className="bg-red-50 text-red-700 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-red-200">PDF</span>;
      case 'docx':
        return <span className="bg-blue-50 text-blue-700 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-blue-200">DOCX</span>;
      case 'pptx':
        return <span className="bg-amber-50 text-amber-700 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-amber-200">PPTX</span>;
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark('material', material.id);
  };

  return (
    <Card padded="md" className="flex flex-col justify-between hover:border-teal-300 transition-all duration-150">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-page flex items-center justify-center border border-border-ui">
              {getFileIcon()}
            </div>
            <div>
              {getFileTypeBadge()}
              <span className="ml-2 text-xs text-text-muted">{material.fileSize}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleBookmark}
              className={`p-1.5 rounded-md text-text-muted hover:text-deep-teal hover:bg-sage-light transition-colors ${
                bookmarked ? 'text-teal-700' : ''
              }`}
              title={bookmarked ? 'Xatcho‘pdan o‘chirish' : 'Xatcho‘pga saqlash'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-teal-700' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category & Title */}
        <div className="mb-2">
          <Badge variant="teal" size="sm" className="mb-1.5">
            {material.category}
          </Badge>
          <h4
            onClick={() => navigate(`/materials/${material.id}`)}
            className="text-sm font-semibold text-text-main hover:text-deep-teal cursor-pointer line-clamp-2 leading-snug"
          >
            {material.title}
          </h4>
        </div>

        <p className="text-xs text-text-muted line-clamp-2 mb-4">
          {material.description}
        </p>
      </div>

      {/* Footer Info & Actions */}
      <div>
        <div className="pt-3 border-t border-border-ui flex items-center justify-between text-xs text-text-muted mb-3">
          <span className="truncate max-w-[170px] text-text-main font-medium">
            {material.author}
          </span>
          <span>{material.pagesCount} bet</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            icon={<Eye className="w-3.5 h-3.5" />}
            onClick={() => {
              if (onPreview) onPreview(material);
              else navigate(`/materials/${material.id}`);
            }}
          >
            Ko‘rish
          </Button>

          <Button
            variant={downloaded ? 'secondary' : 'primary'}
            size="sm"
            className="flex-1 text-xs"
            icon={downloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            onClick={handleDownload}
          >
            {downloaded ? 'Yuklandi' : 'Yuklab olish'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
