import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  FileSpreadsheet, 
  Presentation 
} from 'lucide-react';
import { useProfessorData } from '../../context/ProfessorDataContext';
import type { Material } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export const AdminMaterials: React.FC = () => {
  const { materials, addMaterial, updateMaterial, deleteMaterial } = useProfessorData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author] = useState('Prof. Dilorom Karimova');
  const [department] = useState('Klinik va amaliy psixologiya kafedrasi');
  const [category, setCategory] = useState<'Metodik qo‘llanma' | 'Diagnostika shabloni' | 'Taqdimot' | 'Protokol'>('Metodik qo‘llanma');
  const [fileType, setFileType] = useState<'pdf' | 'docx' | 'pptx'>('pdf');
  const [tagsInput] = useState('diagnostika, metodika');
  const [pagesCount] = useState(25);

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
        m.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' || m.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [materials, searchQuery, selectedCategory]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addMaterial({
      title: title || 'Yangi o‘quv materiali',
      description,
      fileType,
      fileSize: '3.2 MB',
      author,
      authorTitle: 'Professor',
      department,
      category,
      pagesCount: Number(pagesCount) || 20,
      updatedAt: 'Bugun, 26 Fevral, 2026',
      downloadCount: 0,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
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
      author: editingMaterial.author,
      department: editingMaterial.department,
      pagesCount: Number(editingMaterial.pagesCount) || 20,
    });

    setEditingMaterial(null);
    showToast('Material ma’lumotlari yangilandi!');
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      deleteMaterial(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast('Material o‘chirildi.');
    }
  };

  const getFileIcon = (ft: string) => {
    switch (ft) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-600" />;
      case 'docx': return <FileSpreadsheet className="w-4 h-4 text-blue-600" />;
      case 'pptx': return <Presentation className="w-4 h-4 text-amber-600" />;
      default: return <FileText className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="O‘quv Materiallari Boshqaruvi"
        description="Metodik qo‘llanmalar, diagnostika protokollari va shablonlar bazasi"
        breadcrumbs={[
          { label: 'Kontent' },
          { label: 'Materiallar' }
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

      {/* Toast */}
      {toastMessage && (
        <div className="p-3.5 bg-teal-50 border border-teal-300 rounded-xl text-teal-900 text-xs font-semibold flex items-center gap-2 shadow-subtle animate-subtle-pulse">
          <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-surface border border-border-ui rounded-card p-4 shadow-subtle flex flex-col sm:flex-row sm:items-center sm:gap-3 space-y-3 sm:space-y-0">
        <div className="flex-1">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Material nomi, muallif yoki kafedra..."
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

      {/* Materials Table */}
      {filteredMaterials.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-6 h-6 text-text-muted" />}
          title="Materiallar topilmadi"
          description="Kiritilgan parametrlar bo‘yicha o‘quv materiali mavjud emas."
          actionLabel="Yangi material qo‘shish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <Card padded="none" className="overflow-hidden border-border-ui shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page border-b border-border-ui text-text-muted font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Material nomi</th>
                  <th className="py-3.5 px-4">Muallif va Kafedra</th>
                  <th className="py-3.5 px-4">Toifasi</th>
                  <th className="py-3.5 px-4">Format</th>
                  <th className="py-3.5 px-4">Yuklashlar</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ui bg-surface">
                {filteredMaterials.map((mat) => (
                  <tr key={mat.id} className="hover:bg-page/50 transition-colors">
                    <td className="py-3.5 px-4 min-w-[240px]">
                      <div>
                        <p className="font-bold text-text-main text-xs sm:text-sm line-clamp-1">
                          {mat.title}
                        </p>
                        <span className="text-[11px] text-text-muted">{mat.pagesCount} bet • {mat.fileSize}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-medium text-text-main block">{mat.author}</span>
                        <span className="text-[11px] text-text-muted">{mat.department}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant="teal" size="sm">
                        {mat.category}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-mono uppercase font-bold text-text-main">
                        {getFileIcon(mat.fileType)}
                        <span>{mat.fileType}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-text-main font-bold">
                      {mat.downloadCount} ta
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingMaterial(mat)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(mat.id)}
                          className="p-1.5 text-text-soft hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                          title="O‘chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Yangi o‘quv materiali yaratish"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Materialni saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Material nomi*"
              placeholder="Masalan: KBT diagnostik shkalasi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Tavsif*
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Toifasi"
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
                label="Fayl formati"
                options={[
                  { value: 'pdf', label: 'PDF (.pdf)' },
                  { value: 'docx', label: 'Word (.docx)' },
                  { value: 'pptx', label: 'PowerPoint (.pptx)' },
                ]}
                value={fileType}
                onChange={(e) => setFileType(e.target.value as any)}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Modal */}
      {editingMaterial && (
        <Modal
          isOpen={!!editingMaterial}
          onClose={() => setEditingMaterial(null)}
          title="Materialni tahrirlash"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingMaterial(null)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveEdit}>
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
                Tavsif
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={editingMaterial.description}
                onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })}
              />
            </div>

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
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="Materialni o‘chirishni tasdiqlaysizmi?"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setDeleteConfirmId(null)}>
                Bekor qilish
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                O‘chirish
              </Button>
            </>
          }
        >
          <p className="text-xs text-text-muted">
            Ushbu o‘quv materiali tizimdan olib tashlanadi.
          </p>
        </Modal>
      )}
    </div>
  );
};
