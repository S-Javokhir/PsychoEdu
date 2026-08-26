import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Check } from 'lucide-react';
import { mockMaterials } from '../data/materials';
import type { Material } from '../types';
import { PageHeader } from '../components/common/PageHeader';
import { SearchInput } from '../components/common/SearchInput';
import { Select } from '../components/common/Select';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { MaterialCard } from '../components/domain/MaterialCard';

export const Materials: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [previewMaterial, setPreviewMaterial] = useState<Material | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredMaterials = useMemo(() => {
    return mockMaterials.filter((mat) => {
      const matchSearch =
        searchQuery === '' ||
        mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mat.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mat.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' || mat.category === selectedCategory;

      const matchFileType =
        selectedFileType === 'all' || mat.fileType === selectedFileType;

      return matchSearch && matchCategory && matchFileType;
    });
  }, [searchQuery, selectedCategory, selectedFileType]);

  const categoryOptions = [
    { value: 'all', label: 'Barcha toifalar' },
    { value: 'Metodik qo‘llanma', label: 'Metodik qo‘llanmalar' },
    { value: 'Diagnostika shabloni', label: 'Diagnostika shablonlari' },
    { value: 'Protokol', label: 'Protokollar va shkalalar' },
    { value: 'Taqdimot', label: 'Taqdimotlar' },
  ];

  const fileTypeOptions = [
    { value: 'all', label: 'Barcha fayl turlari' },
    { value: 'pdf', label: 'PDF hujjatlar' },
    { value: 'docx', label: 'DOCX shablonlar' },
    { value: 'pptx', label: 'PPTX taqdimotlar' },
  ];

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setPreviewMaterial(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="O‘quv Materiallari"
        description="Amaliy psixologiya bo‘yicha metodik qo‘llanmalar, diagnostika shablonlari va protokollar bazasi"
        breadcrumbs={[{ label: 'Materiallar' }]}
        badge={
          <span className="text-xs font-semibold text-deep-teal bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            {mockMaterials.length} ta material
          </span>
        }
      />

      {/* Search and Filters */}
      <div className="bg-surface border border-border-ui rounded-card p-4 shadow-subtle flex flex-col sm:flex-row sm:items-center sm:gap-3 space-y-3 sm:space-y-0">
        <div className="flex-1">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Materiallarni qidiring (nomi, muallifi, toifasi)..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:w-auto">
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Toifani tanlash"
          />

          <Select
            options={fileTypeOptions}
            value={selectedFileType}
            onChange={(e) => setSelectedFileType(e.target.value)}
            aria-label="Fayl turini tanlash"
          />
        </div>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-6 h-6 text-text-muted" />}
          title="Material topilmadi"
          description="Kiritilgan parametrlar bo‘yicha hech qanday metodik hujjat topilmadi."
          actionLabel="Filtrlarni tozalash"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('all');
            setSelectedFileType('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMaterials.map((mat) => (
            <MaterialCard
              key={mat.id}
              material={mat}
              onPreview={(item) => setPreviewMaterial(item)}
            />
          ))}
        </div>
      )}

      {/* Document Quick Preview Modal */}
      {previewMaterial && (
        <Modal
          isOpen={!!previewMaterial}
          onClose={() => setPreviewMaterial(null)}
          title={
            <div className="flex items-center gap-2">
              <Badge variant="teal" size="sm">
                {previewMaterial.category}
              </Badge>
              <span className="truncate max-w-[320px]">{previewMaterial.title}</span>
            </div>
          }
          description={`${previewMaterial.author} • ${previewMaterial.pagesCount} bet • ${previewMaterial.fileSize}`}
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMaterial(null)}
              >
                Yopish
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/materials/${previewMaterial.id}`)}
              >
                To‘liq sahifani ochish
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={downloadSuccess ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                onClick={handleDownload}
              >
                {downloadSuccess ? 'Yuklandi' : 'Yuklab olish'}
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-1.5">
                Hujjat haqida qisqacha:
              </h4>
              <p className="text-sm text-text-muted leading-relaxed bg-page p-3 rounded-lg border border-border-ui">
                {previewMaterial.summary || previewMaterial.description}
              </p>
            </div>

            {previewMaterial.tableOfContents && (
              <div>
                <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-2">
                  Mundarija va boblar:
                </h4>
                <ul className="space-y-1.5 text-xs text-text-main divide-y divide-border-ui">
                  {previewMaterial.tableOfContents.map((item, idx) => (
                    <li key={idx} className="pt-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
