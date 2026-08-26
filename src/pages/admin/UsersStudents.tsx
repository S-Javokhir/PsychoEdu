import React, { useState, useMemo } from 'react';
import { 
  Users, 
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

export const UsersStudents: React.FC = () => {
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
  const [groupNumber, setGroupNumber] = useState('401-guruh');
  const [studentId, setStudentId] = useState('ST-2023-9901');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const students = useMemo(() => {
    return users.filter((u) => u.role === 'student');
  }, [users]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      return (
        searchQuery === '' ||
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.studentId && s.studentId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.groupNumber && s.groupNumber.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [students, searchQuery]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      fullName: fullName || 'Yangi Talaba',
      email: email || 'student@psychoedu.uz',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'student',
      roleLabel: 'Talaba',
      faculty: 'Psixologiya fakulteti',
      department,
      groupNumber,
      studentId,
      academicYear: '2025/2026',
      status: 'Faol',
    });

    setIsAddModalOpen(false);
    showToast('Talaba muvaffaqiyatli qo‘shildi!');
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
      groupNumber: editingUser.groupNumber,
      studentId: editingUser.studentId,
      status: editingUser.status,
    });

    setEditingUser(null);
    showToast('Talaba ma’lumotlari yangilandi!');
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      deleteUser(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast('Talaba profili o‘chirildi.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Talabalar Ro‘yxati"
        description="Amaliy psixologiya va klinik diagnostika kurslari talabalari bazasi"
        breadcrumbs={[
          { label: 'Foydalanuvchilar' },
          { label: 'Talabalar' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Talaba qo‘shish
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
            placeholder="Talaba ismi, ID yoki guruhi..."
          />
        </div>
      </div>

      {/* Students Table */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          icon={<Users className="w-6 h-6 text-text-muted" />}
          title="Talabalar topilmadi"
          description="Kiritilgan so‘rov bo‘yicha talaba topilmadi."
          actionLabel="Yangi talaba qo‘shish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <Card padded="none" className="overflow-hidden border-border-ui shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page border-b border-border-ui text-text-muted font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Talaba (F.I.Sh)</th>
                  <th className="py-3.5 px-4">Talaba ID</th>
                  <th className="py-3.5 px-4">Akademik guruh</th>
                  <th className="py-3.5 px-4">Kafedra</th>
                  <th className="py-3.5 px-4">Holat</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ui bg-surface">
                {filteredStudents.map((stud) => (
                  <tr key={stud.id} className="hover:bg-page/50 transition-colors">
                    <td className="py-3.5 px-4 min-w-[220px]">
                      <div className="flex items-center gap-3">
                        <Avatar src={stud.avatarUrl} name={stud.fullName} size="md" />
                        <div>
                          <p className="font-bold text-text-main text-xs sm:text-sm">
                            {stud.fullName}
                          </p>
                          <p className="text-[11px] text-text-muted flex items-center gap-1">
                            <Mail className="w-3 h-3 text-text-soft" />
                            {stud.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-deep-teal">
                      {stud.studentId || 'ST-2024-001'}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="bg-page px-2 py-0.5 rounded border border-border-ui font-medium text-text-main">
                        {stud.groupNumber || '401-guruh'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-text-muted">
                      {stud.department}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold text-[11px]">
                        {stud.status || 'Faol'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingUser(stud)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(stud.id)}
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

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Yangi talaba qo‘shish"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Talabani saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="F.I.Sh (Ism, familiya)*"
                placeholder="Madina Usmonova"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <Input
                label="Elektron pochta*"
                placeholder="m.usmonova@psychoedu.uz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Talaba ID*"
                placeholder="ST-2023-8901"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />

              <Input
                label="Akademik guruh*"
                placeholder="401-guruh"
                value={groupNumber}
                onChange={(e) => setGroupNumber(e.target.value)}
                required
              />
            </div>

            <Select
              label="Kafedra*"
              options={departments.map((d) => ({ value: d.name, label: d.name }))}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </form>
        </Modal>
      )}

      {/* Edit Student Modal */}
      {editingUser && (
        <Modal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          title="Talaba ma’lumotlarini tahrirlash"
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
                label="Talaba ID"
                value={editingUser.studentId || ''}
                onChange={(e) => setEditingUser({ ...editingUser, studentId: e.target.value })}
              />

              <Input
                label="Guruh"
                value={editingUser.groupNumber || ''}
                onChange={(e) => setEditingUser({ ...editingUser, groupNumber: e.target.value })}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="Talabani o‘chirishni tasdiqlaysizmi?"
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
            Ushbu talabaning akkaunti o‘chiriladi.
          </p>
        </Modal>
      )}
    </div>
  );
};
