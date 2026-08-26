import React, { useState, useMemo } from 'react';
import { 
  UserCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Mail, 
  ShieldCheck
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import type { User } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Avatar } from '../../components/common/Avatar';
import { EmptyState } from '../../components/common/EmptyState';

export const UsersProfessors: React.FC = () => {
  const { users, addUser, updateUser, deleteUser, departments } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Klinik va amaliy psixologiya kafedrasi');
  const [academicTitle, setAcademicTitle] = useState('Psixologiya fanlari nomzodi, Dotsent');
  const [specialization, setSpecialization] = useState('KBT, Xavotir va depressiya');
  const [licenseNumber, setLicenseNumber] = useState('PSY-UZ-2024-1102');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const professors = useMemo(() => {
    return users.filter((u) => u.role === 'professor_psychologist');
  }, [users]);

  const filteredProfessors = useMemo(() => {
    return professors.filter((p) => {
      return (
        searchQuery === '' ||
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.specialization && p.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [professors, searchQuery]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      fullName: fullName || 'Prof. Yangi Psixolog',
      email: email || 'prof@psychoedu.uz',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'professor_psychologist',
      roleLabel: 'Professor / Amaliyotchi Psixolog',
      faculty: 'Psixologiya fakulteti',
      department,
      academicTitle,
      specialization,
      licenseNumber,
      capabilities: ['Ma’ruza o‘qitish', 'Amaliy konsultatsiya', 'Video yozish', 'Keys yaratish'],
      status: 'Faol',
    });

    setIsAddModalOpen(false);
    showToast('Professor muvaffaqiyatli ro‘yxatdan o‘tkazildi!');
    setFullName('');
    setEmail('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    updateUser(editingUser.id, {
      fullName: editingUser.fullName,
      email: editingUser.email,
      department: editingUser.department,
      academicTitle: editingUser.academicTitle,
      specialization: editingUser.specialization,
      status: editingUser.status,
    });

    setEditingUser(null);
    showToast('Professor ma’lumotlari yangilandi!');
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      deleteUser(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast('Professor profili o‘chirildi.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Professor va Amaliyotchi Psixologlar"
        description="Akademik kurs o‘qituvchilari va amaliy psixologik xizmat ko‘rsatuvchi yagona professor profillari"
        breadcrumbs={[
          { label: 'Foydalanuvchilar' },
          { label: 'Professorlar' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Professor qo‘shish
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

      {/* Single Profile Principle Reminder */}
      <div className="bg-sage-light border border-sage rounded-card p-3.5 flex items-center gap-3 text-xs text-teal-950">
        <ShieldCheck className="w-5 h-5 text-teal-800 shrink-0" />
        <div>
          <span className="font-bold text-teal-900">Yagona Profil Qoidasi: </span>
          <span>Professor va amaliyotchi psixolog yagona akkaunt orqali akademik ta’lim va amaliy xizmat imkoniyatlariga ega.</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-surface border border-border-ui rounded-card p-4 shadow-subtle flex items-center justify-between">
        <div className="w-full sm:w-96">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Professor ismi, mutaxassislik yoki kafedra..."
          />
        </div>
      </div>

      {/* Professors Table */}
      {filteredProfessors.length === 0 ? (
        <EmptyState
          icon={<UserCheck className="w-6 h-6 text-text-muted" />}
          title="Professorlar topilmadi"
          description="Kiritilgan so‘rov bo‘yicha professor topilmadi."
          actionLabel="Yangi professor qo‘shish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <Card padded="none" className="overflow-hidden border-border-ui shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page border-b border-border-ui text-text-muted font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Professor (F.I.Sh)</th>
                  <th className="py-3.5 px-4">Kafedra va Unvon</th>
                  <th className="py-3.5 px-4">Mutaxassislik</th>
                  <th className="py-3.5 px-4">Imkoniyatlar</th>
                  <th className="py-3.5 px-4">Holat</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ui bg-surface">
                {filteredProfessors.map((prof) => (
                  <tr key={prof.id} className="hover:bg-page/50 transition-colors">
                    <td className="py-3.5 px-4 min-w-[220px]">
                      <div className="flex items-center gap-3">
                        <Avatar src={prof.avatarUrl} name={prof.fullName} size="md" />
                        <div>
                          <p className="font-bold text-text-main text-xs sm:text-sm">
                            {prof.fullName}
                          </p>
                          <p className="text-[11px] text-text-muted flex items-center gap-1">
                            <Mail className="w-3 h-3 text-text-soft" />
                            {prof.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-medium text-text-main block">{prof.department}</span>
                        <span className="text-[11px] text-text-muted">{prof.academicTitle}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[220px]">
                      <span className="text-teal-900 font-medium block truncate">
                        {prof.specialization || 'Umumiy va klinik psixologiya'}
                      </span>
                      <span className="font-mono text-[10px] text-text-soft">
                        Litsenziya: {prof.licenseNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-sage-light text-teal-900 font-semibold px-2 py-0.5 rounded text-[10px] border border-sage">
                          O‘qitish
                        </span>
                        <span className="bg-teal-50 text-teal-900 font-semibold px-2 py-0.5 rounded text-[10px] border border-teal-100">
                          Psixologiya xizmati
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold text-[11px]">
                        {prof.status || 'Faol'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingUser(prof)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(prof.id)}
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

      {/* Add Professor Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Yangi professor ro‘yxatdan o‘tkazish"
          description="O‘qituvchi va amaliyotchi psixolog ma’lumotlarini kiriting"
          maxWidth="xl"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Professorni saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="F.I.Sh (Ism, familiya)*"
                placeholder="Prof. Dilorom Karimova"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <Input
                label="Elektron pochta*"
                placeholder="d.karimova@psychoedu.uz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Kafedra*"
                options={departments.map((d) => ({ value: d.name, label: d.name }))}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />

              <Input
                label="Ilmiy unvon / Daraja*"
                placeholder="Psixologiya fanlari doktori, Professor"
                value={academicTitle}
                onChange={(e) => setAcademicTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Amaliy mutaxassislik yo‘nalishi"
                placeholder="KBT, Ratsional-emotiv terapiya"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />

              <Input
                label="Amaliyot litsenziya raqami"
                placeholder="PSY-UZ-2024-0991"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Professor Modal */}
      {editingUser && (
        <Modal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          title="Professor ma’lumotlarini tahrirlash"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingUser(null)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveEdit}>
                Saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="F.I.Sh*"
                value={editingUser.fullName}
                onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                required
              />

              <Input
                label="Elektron pochta*"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Kafedra"
                value={editingUser.department}
                onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
              />

              <Input
                label="Ilmiy unvon"
                value={editingUser.academicTitle || ''}
                onChange={(e) => setEditingUser({ ...editingUser, academicTitle: e.target.value })}
              />
            </div>

            <Input
              label="Mutaxassislik"
              value={editingUser.specialization || ''}
              onChange={(e) => setEditingUser({ ...editingUser, specialization: e.target.value })}
            />
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="Professorni o‘chirishni tasdiqlaysizmi?"
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
            Ushbu professor akkauntini o‘chirishni tasdiqlaysizmi?
          </p>
        </Modal>
      )}
    </div>
  );
};
