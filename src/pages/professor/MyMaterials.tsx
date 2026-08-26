import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  UploadCloud,
  FileSpreadsheet,
  Presentation
} from 'lucide-react';
import { useProfessorData } from '../../context/ProfessorDataContext';
import type { Material } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export const MyMaterials: React.FC = () => {
  const navigate = useNavigate();
  const { materials, addMaterial, updateMaterial, deleteMaterial } = useProfessorData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  // New Material form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Metodik qo‘llanma' | 'Diagnostika shabloni' | 'Taqdimot' | 'Protokol'>('Metodik qo‘llanma');
  const [fileType, setFileType] = useState<'pdf' | 'docx' | 'pptx'>('pdf');
  const [subject, setSubject] = useState('Klinik va amaliy psixologiya');
  const [tagsInput, setTagsInput] = useState('kbt, amaliyot, metodika');
  const [pagesCount, setPagesCount] = useState(24);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const matchSearch =
        searchQuery === '' ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' || m.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [materials, searchQuery, selectedCategory]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addMaterial({
      title: title || 'Yangi o‘quv qo‘llanmasi',
      description,
      fileType,
      fileSize: fileType === 'pdf' ? '3.4 MB' : fileType === 'docx' ? '650 KB' : '8.2 MB',
      author: 'Prof. Dilorom Karimova',
      authorTitle: 'Psixologiya fanlari doktori, Professor',
      department: 'Klinik va amaliy psixologiya kafedrasi',
      category,
      pagesCount: Number(pagesCount) || 20,
      updatedAt: 'Bugun, 26 Fevral, 2026',
      downloadCount: 0,
      subject,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      tableOfContents: [
        '1. Kirish va nazariy asoslar',
        '2. Amaliy psixologik mashqlar',
        '3. Protokollar va shablonlar'
      ],
      summary: description
    });

    setIsAddModalOpen(false);
    showToast('O‘quv materiali muvaffaqiyatli qo‘shildi!');
    setTitle('');
    setDescription('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMaterial) return;

    updateMaterial(editingMaterial.id, {
      title: editingMaterial.title,
      description: editingMaterial.description,
      category: editingMaterial.category,
      pagesCount: Number(editingMaterial.pagesCount) || 20,
    });

    setEditingMaterial(null);
    showToast('Material ma’lumotlari yangilandi!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Ushbu materialni o‘chirishni tasdiqlaysizmi?')) {
      deleteMaterial(id);
      showToast('Material o‘chirildi.');
    }
  };

  const getFileIcon = (ft: string) => {
    switch (ft) {
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mening Materiallarim"
        description="Talabalar uchun metodik qo‘llanmalar, diagnostika shablonlari va protokollar boshqaruvi"
        breadcrumbs={[
          { label: 'Ta’lim' },
          { label: 'Materiallarim' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Material qo‘shish
          </Button>
        }
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 bg-teal-50 border border-teal-300 rounded-xl text-teal-900 text-xs font-semibold flex items-center gap-2 shadow-subtle animate-subtle-pulse">
          <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-surface border border-border-ui rounded-card p-4 shadow-subtle flex flex-col sm:flex-row sm:items-center sm:gap-3 space-y-3 sm:space-y-0">
        <div className="flex-1">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Material nomi yoki tavsifi bo‘yicha qidiruv..."
          />
        </div>

        <div className="w-full sm:w-60">
          <Select
            options={[
              { value: 'all', label: 'Barcha toifalar' },
              { value: 'Metodik qo‘llanma', label: 'Metodik qo‘llanmalar' },
              { value: 'Diagnostika shabloni', label: 'Diagnostika shablonlari' },
              { value: 'Protokol', label: 'Protokollar' },
              { value: 'Taqdimot', label: 'Taqdimotlar' },
            ]}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Materials List / Grid */}
      {filteredMaterials.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-6 h-6 text-text-muted" />}
          title="Materiallar topilmadi"
          description="Kiritilgan parametrlar bo‘yicha material mavjud emas."
          actionLabel="Yangi material qo‘shish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMaterials.map((mat) => (
            <Card
              key={mat.id}
              padded="md"
              className="flex flex-col justify-between hover:border-teal-300 transition-all duration-150"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-page flex items-center justify-center border border-border-ui">
                      {getFileIcon(mat.fileType)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200">
                        {mat.fileType}
                      </span>
                      <span className="ml-2 text-xs text-text-muted">{mat.fileSize}</span>
                    </div>
                  </div>

                  <Badge variant="teal" size="sm">
                    {mat.category}
                  </Badge>
                </div>

                <h4
                  onClick={() => navigate(`/materials/${mat.id}`)}
                  className="text-sm font-semibold text-text-main hover:text-deep-teal cursor-pointer line-clamp-2 mb-1.5 leading-snug"
                >
                  {mat.title}
                </h4>

                <p className="text-xs text-text-muted line-clamp-2 mb-3">
                  {mat.description}
                </p>
              </div>

              {/* Footer */}
              <div>
                <div className="pt-3 border-t border-border-ui text-xs text-text-muted flex items-center justify-between mb-3">
                  <span>{mat.pagesCount} bet</span>
                  <span>Yuklashlar: <strong className="text-text-main">{mat.downloadCount}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    icon={<Eye className="w-3.5 h-3.5" />}
                    onClick={() => navigate(`/materials/${mat.id}`)}
                  >
                    Ko‘rish
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1 text-xs"
                    icon={<Edit3 className="w-3.5 h-3.5" />}
                    onClick={() => setEditingMaterial(mat)}
                  >
                    Tahrirlash
                  </Button>

                  <button
                    type="button"
                    onClick={() => handleDelete(mat.id)}
                    className="p-2 text-text-soft hover:text-red-600 hover:bg-red-50 rounded-btn transition-colors"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Material Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Yangi o‘quv materiali yaratish"
          description="Metodik qo‘llanma, diagnostika shabloni yoki taqdimotni yuklang"
          maxWidth="xl"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(false)}
              >
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreate}
              >
                Materialni saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Material nomi*"
              placeholder="Masalan: KBT amaliy mashqlar va avtomatik fikrlar daftari"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Tavsif va metodik ahamiyati*
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Material kim uchun mo‘ljallangan va qanday o‘quv vazifalarini bajaradi..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Toifasi*"
                options={[
                  { value: 'Metodik qo‘llanma', label: 'Metodik qo‘llanma' },
                  { value: 'Diagnostika shabloni', label: 'Diagnostika shabloni' },
                  { value: 'Protokol', label: 'Protokol va shkalalar' },
                  { value: 'Taqdimot', label: 'Taqdimot' },
                ]}
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              />

              <Select
                label="Fayl formati*"
                options={[
                  { value: 'pdf', label: 'PDF hujjat (.pdf)' },
                  { value: 'docx', label: 'Word shablon (.docx)' },
                  { value: 'pptx', label: 'PowerPoint (.pptx)' },
                ]}
                value={fileType}
                onChange={(e) => setFileType(e.target.value as any)}
              />

              <Input
                label="Fan / Yo‘nalish"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <Input
                label="Sahifalar soni"
                type="number"
                value={pagesCount}
                onChange={(e) => setPagesCount(Number(e.target.value))}
              />
            </div>

            <Input
              label="Teglar"
              placeholder="kbt, diagnostika, shablon"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />

            {/* Upload Box Placeholder */}
            <div className="p-4 border-2 border-dashed border-border-ui rounded-xl text-center bg-page">
              <UploadCloud className="w-8 h-8 text-teal-700 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-text-main">
                Hujjat faylini yuklash (Mock)
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                PDF, DOCX yoki PPTX formatdagi fayl
              </p>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Material Modal */}
      {editingMaterial && (
        <Modal
          isOpen={!!editingMaterial}
          onClose={() => setEditingMaterial(null)}
          title="Materialni tahrirlash"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingMaterial(null)}
              >
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveEdit}
              >
                Saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <Input
              label="Material nomi*"
              value={editingMaterial.title}
              onChange={(e) => setEditingMaterial({ ...editingMaterial, title: e.target.value })}
              required
            />

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Tavsif*
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={editingMaterial.description}
                onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Toifasi"
                options={[
                  { value: 'Metodik qo‘llanma', label: 'Metodik qo‘llanma' },
                  { value: 'Diagnostika shabloni', label: 'Diagnostika shabloni' },
                  { value: 'Protokol', label: 'Protokol va shkalalar' },
                  { value: 'Taqdimot', label: 'Taqdimot' },
                ]}
                value={editingMaterial.category}
                onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value as any })}
              />

              <Input
                label="Sahifalar soni"
                type="number"
                value={editingMaterial.pagesCount}
                onChange={(e) => setEditingMaterial({ ...editingMaterial, pagesCount: Number(e.target.value) })}
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
