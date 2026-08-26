import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Lock, 
  UserCheck 
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import type { AnonymousPatient } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { EmptyState } from '../../components/common/EmptyState';

export const Patients: React.FC = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<AnonymousPatient | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [patientCode, setPatientCode] = useState('PT-8890');
  const [ageGroup, setAgeGroup] = useState('Kattalar (28 yosh)');
  const [primaryTopic, setPrimaryTopic] = useState('Xavotir buzilishi va vahima');
  const [assignedProfessor, setAssignedProfessor] = useState('Prof. Dilorom Karimova');
  const [totalSessions] = useState(1);
  const [status, setStatus] = useState<'Faol' | 'Yakunlangan' | 'Kutilmoqda'>('Faol');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchSearch =
        searchQuery === '' ||
        p.patientCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.primaryTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.assignedProfessor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.ageGroup.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [patients, searchQuery, selectedStatus]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addPatient({
      patientCode: patientCode || 'PT-9012',
      ageGroup,
      totalSessions: Number(totalSessions) || 1,
      firstVisitDate: 'Bugun, 26 Fevral, 2026',
      lastVisitDate: 'Bugun, 26 Fevral, 2026',
      primaryTopic: primaryTopic || 'Umumiy amaliyot',
      assignedProfessor,
      status,
    });

    setIsAddModalOpen(false);
    showToast('Anonim bemor profili muvaffaqiyatli saqlandi!');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient) return;

    updatePatient(editingPatient.id, {
      ageGroup: editingPatient.ageGroup,
      primaryTopic: editingPatient.primaryTopic,
      assignedProfessor: editingPatient.assignedProfessor,
      totalSessions: Number(editingPatient.totalSessions),
      status: editingPatient.status,
    });

    setEditingPatient(null);
    showToast('Bemor ma’lumotlari yangilandi!');
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      deletePatient(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast('Bemor profili arxivdan o‘chirildi.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bemorlar Ro‘yxati (Konfidensial)"
        description="Amaliy psixologik konsultatsiyalardan o‘tuvchi shaxslarning to‘liq anonimlashtirilgan o‘quv registri"
        breadcrumbs={[
          { label: 'Foydalanuvchilar' },
          { label: 'Bemorlar' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Anonim bemor qo‘shish
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

      {/* Strict Privacy Banner */}
      <div className="bg-sage-light border border-sage rounded-card p-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-teal-900 shrink-0 mt-0.5" />
        <div className="text-xs text-teal-950">
          <p className="font-bold text-teal-900 mb-0.5">
            Bemorlarning Shaxsiy Daxlsizligi va Konfidensiallik Talabi
          </p>
          <p className="text-teal-850 leading-relaxed">
            Ushbu tizimda bemorlarning ismi, familiyasi, telefon raqami, manzili yoki pasport ma’lumotlari mutlaqo saqlanmaydi va ko‘rsatilmaydi. Faqat shifrlangan <strong>Anonim ID</strong> (masalan, <code>PT-9012</code>) orqali amaliy mashg‘ulotlar bog‘lanadi.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-surface border border-border-ui rounded-card p-4 shadow-subtle flex flex-col sm:flex-row sm:items-center sm:gap-3 space-y-3 sm:space-y-0">
        <div className="flex-1">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Anonim ID (masalan, PT-9012), murojaat mavzusi yoki professor..."
          />
        </div>

        <div className="w-full sm:w-60">
          <Select
            options={[
              { value: 'all', label: 'Barcha holatlar' },
              { value: 'Faol', label: 'Faol (Jarayonda)' },
              { value: 'Yakunlangan', label: 'Yakunlangan' },
              { value: 'Kutilmoqda', label: 'Kutilmoqda' },
            ]}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          />
        </div>
      </div>

      {/* Patients Table */}
      {filteredPatients.length === 0 ? (
        <EmptyState
          icon={<ShieldAlert className="w-6 h-6 text-text-muted" />}
          title="Bemorlar topilmadi"
          description="Kiritilgan parametrlar bo‘yicha anonim bemor mavjud emas."
          actionLabel="Anonim profil qo‘shish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <Card padded="none" className="overflow-hidden border-border-ui shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page border-b border-border-ui text-text-muted font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Anonymous ID</th>
                  <th className="py-3.5 px-4">Yosh guruhi</th>
                  <th className="py-3.5 px-4">Asosiy murojaat sababi</th>
                  <th className="py-3.5 px-4">Biriktirilgan mutaxassis</th>
                  <th className="py-3.5 px-4">Seanslar soni</th>
                  <th className="py-3.5 px-4">Holat</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ui bg-surface">
                {filteredPatients.map((pt) => (
                  <tr key={pt.id} className="hover:bg-page/50 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-xs sm:text-sm bg-teal-50 text-deep-teal px-2.5 py-1 rounded-md border border-teal-200">
                        {pt.patientCode}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-text-main font-medium">
                      {pt.ageGroup}
                    </td>

                    <td className="py-3.5 px-4 min-w-[200px]">
                      <span className="font-medium text-text-main block">{pt.primaryTopic}</span>
                      <span className="text-[11px] text-text-muted">So‘nggi seans: {pt.lastVisitDate}</span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-text-main font-medium">
                        <UserCheck className="w-3.5 h-3.5 text-teal-700" />
                        <span>{pt.assignedProfessor}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-text-main">
                      {pt.totalSessions} ta seans
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] border ${
                        pt.status === 'Faol'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : pt.status === 'Yakunlangan'
                          ? 'bg-teal-50 text-teal-800 border border-teal-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {pt.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingPatient(pt)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(pt.id)}
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

      {/* Add Patient Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Yangi anonim bemor ro‘yxatdan o‘tkazish"
          description="Eslatma: Shaxsiy ma’lumotlar (ism, telefon, manzil) yozilmaydi"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Profilni saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Anonymous Patient ID*"
                placeholder="PT-8890"
                value={patientCode}
                onChange={(e) => setPatientCode(e.target.value)}
                hint="Shifrlangan kod"
                required
              />

              <Select
                label="Yosh guruhi*"
                options={[
                  { value: 'Bolalar (7–13 yosh)', label: 'Bolalar (7–13 yosh)' },
                  { value: 'O‘smirlar (14–17 yosh)', label: 'O‘smirlar (14–17 yosh)' },
                  { value: 'Yoshlar (18–24 yosh)', label: 'Yoshlar (18–24 yosh)' },
                  { value: 'Kattalar (25–35 yosh)', label: 'Kattalar (25–35 yosh)' },
                  { value: 'Kattalar (36+ yosh)', label: 'Kattalar (36+ yosh)' },
                ]}
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
              />
            </div>

            <Input
              label="Asosiy murojaat sababi / Muammo yo‘nalishi*"
              placeholder="Masalan: Umumiy xavotir sindromi va stress"
              value={primaryTopic}
              onChange={(e) => setPrimaryTopic(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Biriktirilgan mutaxassis"
                options={[
                  { value: 'Prof. Dilorom Karimova', label: 'Prof. Dilorom Karimova' },
                  { value: 'Dots. Jamshid Aliyev', label: 'Dots. Jamshid Aliyev' },
                  { value: 'Dr. Nigora Toirova', label: 'Dr. Nigora Toirova' },
                ]}
                value={assignedProfessor}
                onChange={(e) => setAssignedProfessor(e.target.value)}
              />

              <Select
                label="Holat"
                options={[
                  { value: 'Faol', label: 'Faol (Jarayonda)' },
                  { value: 'Yakunlangan', label: 'Yakunlangan' },
                  { value: 'Kutilmoqda', label: 'Kutilmoqda' },
                ]}
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Patient Modal */}
      {editingPatient && (
        <Modal
          isOpen={!!editingPatient}
          onClose={() => setEditingPatient(null)}
          title={`Bemor ma’lumotlarini tahrirlash (${editingPatient.patientCode})`}
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingPatient(null)}>
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
                label="Anonymous ID"
                value={editingPatient.patientCode}
                disabled
              />

              <Input
                label="Yosh guruhi"
                value={editingPatient.ageGroup}
                onChange={(e) => setEditingPatient({ ...editingPatient, ageGroup: e.target.value })}
              />
            </div>

            <Input
              label="Murojaat mavzusi"
              value={editingPatient.primaryTopic}
              onChange={(e) => setEditingPatient({ ...editingPatient, primaryTopic: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Seanslar soni"
                type="number"
                value={editingPatient.totalSessions}
                onChange={(e) => setEditingPatient({ ...editingPatient, totalSessions: Number(e.target.value) })}
              />

              <Select
                label="Holat"
                options={[
                  { value: 'Faol', label: 'Faol' },
                  { value: 'Yakunlangan', label: 'Yakunlangan' },
                  { value: 'Kutilmoqda', label: 'Kutilmoqda' },
                ]}
                value={editingPatient.status}
                onChange={(e) => setEditingPatient({ ...editingPatient, status: e.target.value as any })}
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
          title="Bemor profilini o‘chirishni tasdiqlaysizmi?"
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
            Ushbu anonim bemor yozuvlari tizimdan o‘chiriladi.
          </p>
        </Modal>
      )}
    </div>
  );
};
