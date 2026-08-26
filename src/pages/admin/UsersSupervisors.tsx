import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Mail
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

export const UsersSupervisors: React.FC = () => {
  const { users, addUser, updateUser, deleteUser, departments } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Yosh davrlari psixologiyasi kafedrasi');
  const [academicTitle, setAcademicTitle] = useState('PhD, Bosh supervizor');
  const [supervisionArea, setSupervisionArea] = useState('Klinik va amaliy psixologik video darslar ekspertizasi');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const supervisors = useMemo(() => {
    return users.filter((u) => u.role === 'supervisor');
  }, [users]);

  const filteredSupervisors = useMemo(() => {
    return supervisors.filter((s) => {
      return (
        searchQuery === '' ||
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.supervisionArea && s.supervisionArea.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [supervisors, searchQuery]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      fullName: fullName || 'Dr. Yangi Supervizor',
      email: email || 'super@psychoedu.uz',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      role: 'supervisor',
      roleLabel: 'Kafedra Supervizori',
      faculty: 'Psixologiya fakulteti',
      department,
      academicTitle,
      supervisionArea,
      status: 'Faol',
    });

    setIsAddModalOpen(false);
    showToast('Supervizor muvaffaqiyatli ro‘yxatdan o‘tkazildi!');
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
      supervisionArea: editingUser.supervisionArea,
      status: editingUser.status,
    });

    setEditingUser(null);
    showToast('Supervizor ma’lumotlari yangilandi!');
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      deleteUser(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast('Supervizor profili o‘chirildi.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kafedra Supervizorlari"
        description="Amaliy psixologik mashg‘ulotlar va o‘quv videolarini ekspertizadan o‘tkazuvchi mas’ul supervizorlar"
        breadcrumbs={[
          { label: 'Foydalanuvchilar' },
          { label: 'Supervisorlar' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Supervisor qo‘shish
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
            placeholder="Supervisor ismi yoki kafedrasi bo‘yicha qidiruv..."
          />
        </div>
      </div>

      {/* Table */}
      {filteredSupervisors.length === 0 ? (
        <EmptyState
          icon={<ShieldCheck className="w-6 h-6 text-text-muted" />}
          title="Supervisorlar topilmadi"
          description="Kiritilgan so‘rov bo‘yicha supervisor mavjud emas."
          actionLabel="Yangi supervisor qo‘shish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <Card padded="none" className="overflow-hidden border-border-ui shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page border-b border-border-ui text-text-muted font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Supervisor (F.I.Sh)</th>
                  <th className="py-3.5 px-4">Kafedra va Unvon</th>
                  <th className="py-3.5 px-4">Superviziya yo‘nalishi</th>
                  <th className="py-3.5 px-4">Holat</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ui bg-surface">
                {filteredSupervisors.map((superUser) => (
                  <tr key={superUser.id} className="hover:bg-page/50 transition-colors">
                    <td className="py-3.5 px-4 min-w-[220px]">
                      <div className="flex items-center gap-3">
                        <Avatar src={superUser.avatarUrl} name={superUser.fullName} size="md" />
                        <div>
                          <p className="font-bold text-text-main text-xs sm:text-sm">
                            {superUser.fullName}
                          </p>
                          <p className="text-[11px] text-text-muted flex items-center gap-1">
                            <Mail className="w-3 h-3 text-text-soft" />
                            {superUser.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-medium text-text-main block">{superUser.department}</span>
                        <span className="text-[11px] text-text-muted">{superUser.academicTitle}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[250px]">
                      <span className="text-teal-900 font-medium block truncate">
                        {superUser.supervisionArea || 'Klinik superviziya va video ekspertiza'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold text-[11px]">
                        {superUser.status || 'Faol'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingUser(superUser)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(superUser.id)}
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
          title="Yangi supervisor qo‘shish"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Supervisorni saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="F.I.Sh (Ism, familiya)*"
                placeholder="Dr. Nigora Toirova"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <Input
                label="Elektron pochta*"
                placeholder="n.toirova@psychoedu.uz"
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
                label="Ilmiy daraja / Unvon*"
                placeholder="PhD, Dotsent"
                value={academicTitle}
                onChange={(e) => setAcademicTitle(e.target.value)}
                required
              />
            </div>

            <Input
              label="Superviziya yo‘nalishi*"
              placeholder="Klinik va amaliy psixologik video ekspertiza"
              value={supervisionArea}
              onChange={(e) => setSupervisionArea(e.target.value)}
              required
            />
          </form>
        </Modal>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <Modal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          title="Supervisor ma’lumotlarini tahrirlash"
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

            <Input
              label="Superviziya yo‘nalishi"
              value={editingUser.supervisionArea || ''}
              onChange={(e) => setEditingUser({ ...editingUser, supervisionArea: e.target.value })}
            />
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="Supervisorni o‘chirishni tasdiqlaysizmi?"
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
            Ushbu supervisor akkounti o‘chiriladi.
          </p>
        </Modal>
      )}
    </div>
  );
};
