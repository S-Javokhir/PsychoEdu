import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Building 
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import type { Department } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { EmptyState } from '../../components/common/EmptyState';

export const Departments: React.FC = () => {
  const { departments, faculties, addDepartment, updateDepartment, deleteDepartment } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [viewingDepartment, setViewingDepartment] = useState<Department | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [facultyId, setFacultyId] = useState('fac-1');
  const [headOfDepartment, setHeadOfDepartment] = useState('');
  const [professorsCount, setProfessorsCount] = useState(10);
  const [description, setDescription] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredDepartments = useMemo(() => {
    return departments.filter((d) => {
      const matchSearch =
        searchQuery === '' ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.headOfDepartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.facultyName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchFaculty =
        selectedFaculty === 'all' || d.facultyId === selectedFaculty;

      return matchSearch && matchFaculty;
    });
  }, [departments, searchQuery, selectedFaculty]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const facObj = faculties.find((f) => f.id === facultyId) || faculties[0];
    addDepartment({
      name: name || 'Yangi kafedra',
      facultyId: facObj.id,
      facultyName: facObj.name,
      headOfDepartment: headOfDepartment || 'Kafedra mudiri',
      professorsCount: Number(professorsCount) || 1,
      description: description || 'Kafedra o‘quv faoliyati tavsifi',
    });

    setIsAddModalOpen(false);
    showToast('Kafedra muvaffaqiyatli qo‘shildi!');
    setName('');
    setHeadOfDepartment('');
    setDescription('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDepartment) return;

    updateDepartment(editingDepartment.id, {
      name: editingDepartment.name,
      headOfDepartment: editingDepartment.headOfDepartment,
      professorsCount: Number(editingDepartment.professorsCount),
      description: editingDepartment.description,
    });

    setEditingDepartment(null);
    showToast('Kafedra ma’lumotlari yangilandi!');
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      deleteDepartment(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast('Kafedra o‘chirildi.');
    }
  };

  const facultyOptions = [
    { value: 'all', label: 'Barcha fakultetlar' },
    ...faculties.map((f) => ({ value: f.id, label: f.name })),
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kafedralar Boshqaruvi"
        description="Fakultetlar tasarrufidagi akademik kafedralar, mudirlar va professor-o‘qituvchilar tarkibi"
        breadcrumbs={[
          { label: 'Tashkilot' },
          { label: 'Kafedralar' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Kafedra qo‘shish
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
            placeholder="Kafedra nomi yoki mudiri bo‘yicha qidiruv..."
          />
        </div>

        <div className="w-full sm:w-72">
          <Select
            options={facultyOptions}
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
          />
        </div>
      </div>

      {/* Departments Grid */}
      {filteredDepartments.length === 0 ? (
        <EmptyState
          icon={<Layers className="w-6 h-6 text-text-muted" />}
          title="Kafedralar topilmadi"
          description="Kiritilgan parametrlar bo‘yicha kafedra topilmadi."
          actionLabel="Yangi kafedra qo‘shish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredDepartments.map((dep) => (
            <Card key={dep.id} padded="lg" className="flex flex-col justify-between hover:border-teal-300 transition-colors">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-200 shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-text-main">
                        {dep.name}
                      </h4>
                      <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-text-soft" />
                        <span>{dep.facultyName}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-text-muted line-clamp-2 mb-4 bg-page p-3 rounded-xl border border-border-ui">
                  {dep.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs text-text-muted mb-4">
                  <div className="p-2.5 bg-page rounded-lg border border-border-ui">
                    <span className="text-[11px] text-text-soft block">Kafedra mudiri:</span>
                    <strong className="text-text-main font-semibold truncate block mt-0.5">{dep.headOfDepartment}</strong>
                  </div>
                  <div className="p-2.5 bg-page rounded-lg border border-border-ui">
                    <span className="text-[11px] text-text-soft block">O‘qituvchilar:</span>
                    <strong className="text-text-main font-semibold block mt-0.5">{dep.professorsCount} nafar professor</strong>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-border-ui flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  icon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() => setViewingDepartment(dep)}
                >
                  Ko‘rish
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                  icon={<Edit3 className="w-3.5 h-3.5" />}
                  onClick={() => setEditingDepartment(dep)}
                >
                  Tahrirlash
                </Button>

                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(dep.id)}
                  className="p-2 text-text-soft hover:text-red-600 hover:bg-red-50 rounded-btn transition-colors"
                  title="O‘chirish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Department Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Yangi kafedra qo‘shish"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Kafedrani saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Kafedra nomi*"
              placeholder="Masalan: Klinik va amaliy psixologiya kafedrasi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Select
              label="Tegishli fakultet*"
              options={faculties.map((f) => ({ value: f.id, label: f.name }))}
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
            />

            <Input
              label="Kafedra mudiri (F.I.Sh)*"
              placeholder="Prof. Dilorom Karimova"
              value={headOfDepartment}
              onChange={(e) => setHeadOfDepartment(e.target.value)}
              required
            />

            <Input
              label="Professor-o‘qituvchilar soni"
              type="number"
              value={professorsCount}
              onChange={(e) => setProfessorsCount(Number(e.target.value))}
            />

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Kafedra tavsifi va yo‘nalishlari
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Department Modal */}
      {editingDepartment && (
        <Modal
          isOpen={!!editingDepartment}
          onClose={() => setEditingDepartment(null)}
          title="Kafedrani tahrirlash"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingDepartment(null)}>
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
              label="Kafedra nomi*"
              value={editingDepartment.name}
              onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
              required
            />

            <Input
              label="Kafedra mudiri*"
              value={editingDepartment.headOfDepartment}
              onChange={(e) => setEditingDepartment({ ...editingDepartment, headOfDepartment: e.target.value })}
              required
            />

            <Input
              label="O‘qituvchilar soni"
              type="number"
              value={editingDepartment.professorsCount}
              onChange={(e) => setEditingDepartment({ ...editingDepartment, professorsCount: Number(e.target.value) })}
            />

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Tavsif
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={editingDepartment.description}
                onChange={(e) => setEditingDepartment({ ...editingDepartment, description: e.target.value })}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* View Department Modal */}
      {viewingDepartment && (
        <Modal
          isOpen={!!viewingDepartment}
          onClose={() => setViewingDepartment(null)}
          title={viewingDepartment.name}
          description={viewingDepartment.facultyName}
          footer={
            <Button variant="outline" size="sm" onClick={() => setViewingDepartment(null)}>
              Yopish
            </Button>
          }
        >
          <div className="space-y-3 text-xs">
            <p className="text-text-muted leading-relaxed bg-page p-3 rounded-lg border border-border-ui">
              {viewingDepartment.description}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-page rounded-lg border border-border-ui">
                <span className="text-text-soft block">Kafedra mudiri:</span>
                <span className="font-bold text-text-main text-sm">{viewingDepartment.headOfDepartment}</span>
              </div>
              <div className="p-3 bg-page rounded-lg border border-border-ui">
                <span className="text-text-soft block">Professorlar soni:</span>
                <span className="font-bold text-text-main text-sm">{viewingDepartment.professorsCount} nafar</span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="Kafedrani o‘chirishni tasdiqlaysizmi?"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setDeleteConfirmId(null)}>
                Bekor qilish
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                O‘chirishni tasdiqlash
              </Button>
            </>
          }
        >
          <p className="text-xs text-text-muted">
            Ushbu kafedrani o‘chirishni tasdiqlaysizmi?
          </p>
        </Modal>
      )}
    </div>
  );
};
