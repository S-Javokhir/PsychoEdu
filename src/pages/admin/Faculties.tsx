import React, { useState, useMemo } from 'react';
import { 
  Building, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Users, 
  Layers 
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import type { Faculty } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { EmptyState } from '../../components/common/EmptyState';

export const Faculties: React.FC = () => {
  const { faculties, addFaculty, updateFaculty, deleteFaculty } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [viewingFaculty, setViewingFaculty] = useState<Faculty | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [dean, setDean] = useState('');
  const [departmentsCount, setDepartmentsCount] = useState(4);
  const [studentsCount, setStudentsCount] = useState(600);
  const [description, setDescription] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredFaculties = useMemo(() => {
    return faculties.filter((f) => {
      return (
        searchQuery === '' ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.dean.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [faculties, searchQuery]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addFaculty({
      name: name || 'Yangi fakultet',
      dean: dean || 'Fakultet dekani',
      departmentsCount: Number(departmentsCount) || 1,
      studentsCount: Number(studentsCount) || 0,
      description: description || 'Fakultet faoliyati tavsifi',
    });

    setIsAddModalOpen(false);
    showToast('Fakultet muvaffaqiyatli qo‘shildi!');
    setName('');
    setDean('');
    setDescription('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty) return;

    updateFaculty(editingFaculty.id, {
      name: editingFaculty.name,
      dean: editingFaculty.dean,
      departmentsCount: Number(editingFaculty.departmentsCount),
      studentsCount: Number(editingFaculty.studentsCount),
      description: editingFaculty.description,
    });

    setEditingFaculty(null);
    showToast('Fakultet ma’lumotlari yangilandi!');
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      deleteFaculty(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast('Fakultet o‘chirildi.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fakultetlar Boshqaruvi"
        description="Universitet tuzilmasidagi barcha fakultetlar va ularning umumiy ko‘rsatkichlari"
        breadcrumbs={[
          { label: 'Tashkilot' },
          { label: 'Fakultetlar' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Fakultet qo‘shish
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

      {/* Search Bar */}
      <div className="bg-surface border border-border-ui rounded-card p-4 shadow-subtle flex items-center justify-between">
        <div className="w-full sm:w-96">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Fakultet nomi yoki dekan bo‘yicha qidiruv..."
          />
        </div>
      </div>

      {/* Faculties Grid */}
      {filteredFaculties.length === 0 ? (
        <EmptyState
          icon={<Building className="w-6 h-6 text-text-muted" />}
          title="Fakultetlar topilmadi"
          description="Kiritilgan qidiruv so‘rovi bo‘yicha fakultet mavjud emas."
          actionLabel="Yangi fakultet qo‘shish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredFaculties.map((fac) => (
            <Card key={fac.id} padded="lg" className="flex flex-col justify-between hover:border-teal-300 transition-colors">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-200 shrink-0">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-text-main">
                        {fac.name}
                      </h4>
                      <p className="text-xs text-text-muted">
                        Dekan: <strong className="text-text-main">{fac.dean}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-text-muted line-clamp-2 mb-4 bg-page p-3 rounded-xl border border-border-ui">
                  {fac.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs text-text-muted mb-4">
                  <div className="flex items-center gap-2 p-2 bg-page rounded-lg border border-border-ui">
                    <Layers className="w-4 h-4 text-teal-700 shrink-0" />
                    <span><strong>{fac.departmentsCount}</strong> ta kafedra</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-page rounded-lg border border-border-ui">
                    <Users className="w-4 h-4 text-blue-700 shrink-0" />
                    <span><strong>{fac.studentsCount}</strong> ta talaba</span>
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
                  onClick={() => setViewingFaculty(fac)}
                >
                  Ko‘rish
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                  icon={<Edit3 className="w-3.5 h-3.5" />}
                  onClick={() => setEditingFaculty(fac)}
                >
                  Tahrirlash
                </Button>

                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(fac.id)}
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

      {/* Add Faculty Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Yangi fakultet qo‘shish"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Fakultetni saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Fakultet nomi*"
              placeholder="Masalan: Psixologiya fakulteti"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Fakultet dekani (F.I.Sh)*"
              placeholder="Prof. Otabek Vohidov"
              value={dean}
              onChange={(e) => setDean(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Kafedralar soni"
                type="number"
                value={departmentsCount}
                onChange={(e) => setDepartmentsCount(Number(e.target.value))}
              />

              <Input
                label="Talabalar soni"
                type="number"
                value={studentsCount}
                onChange={(e) => setStudentsCount(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Fakultet tavsifi
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

      {/* Edit Faculty Modal */}
      {editingFaculty && (
        <Modal
          isOpen={!!editingFaculty}
          onClose={() => setEditingFaculty(null)}
          title="Fakultetni tahrirlash"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingFaculty(null)}>
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
              label="Fakultet nomi*"
              value={editingFaculty.name}
              onChange={(e) => setEditingFaculty({ ...editingFaculty, name: e.target.value })}
              required
            />

            <Input
              label="Fakultet dekani*"
              value={editingFaculty.dean}
              onChange={(e) => setEditingFaculty({ ...editingFaculty, dean: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Kafedralar soni"
                type="number"
                value={editingFaculty.departmentsCount}
                onChange={(e) => setEditingFaculty({ ...editingFaculty, departmentsCount: Number(e.target.value) })}
              />

              <Input
                label="Talabalar soni"
                type="number"
                value={editingFaculty.studentsCount}
                onChange={(e) => setEditingFaculty({ ...editingFaculty, studentsCount: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Tavsif
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={editingFaculty.description}
                onChange={(e) => setEditingFaculty({ ...editingFaculty, description: e.target.value })}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* View Faculty Modal */}
      {viewingFaculty && (
        <Modal
          isOpen={!!viewingFaculty}
          onClose={() => setViewingFaculty(null)}
          title={viewingFaculty.name}
          description={`Dekan: ${viewingFaculty.dean}`}
          footer={
            <Button variant="outline" size="sm" onClick={() => setViewingFaculty(null)}>
              Yopish
            </Button>
          }
        >
          <div className="space-y-3 text-xs">
            <p className="text-text-muted leading-relaxed bg-page p-3 rounded-lg border border-border-ui">
              {viewingFaculty.description}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-page rounded-lg border border-border-ui">
                <span className="text-text-soft block">Kafedralar soni:</span>
                <span className="font-bold text-text-main text-sm">{viewingFaculty.departmentsCount} ta</span>
              </div>
              <div className="p-3 bg-page rounded-lg border border-border-ui">
                <span className="text-text-soft block">Tahsil oluvchi talabalar:</span>
                <span className="font-bold text-text-main text-sm">{viewingFaculty.studentsCount} nafar</span>
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
          title="Fakultetni o‘chirishni tasdiqlaysizmi?"
          description="Fakultet o‘chirilganda unga tegishli ma’lumotlar bazadan olib tashlanadi."
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
            Ushbu amalni ortga qaytarib bo‘lmaydi.
          </p>
        </Modal>
      )}
    </div>
  );
};
