import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderGit2, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Eye
} from 'lucide-react';
import { useProfessorData } from '../../context/ProfessorDataContext';
import type { CaseStudy } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export const AdminCases: React.FC = () => {
  const navigate = useNavigate();
  const { cases, addCase, updateCase, deleteCase } = useProfessorData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [caseNumber, setCaseNumber] = useState(`Case #0${cases.length + 10}`);
  const [patientCode, setPatientCode] = useState('PT-9940');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [ageGroup] = useState('Kattalar (29 yosh)');
  const [method, setMethod] = useState('Kognitiv-xulq-atvor terapiyasi (CBT)');
  const [difficulty] = useState<'Boshlang‘ich' | 'O‘rta' | 'Murakkab'>('O‘rta');
  const [presentingProblem, setPresentingProblem] = useState('');
  const [symptomsInput] = useState('Xavotir, Uyqusizlik, Katastrofizatsiya');
  const [approachDescription] = useState('');
  const [outcomeSummary] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchSearch =
        searchQuery === '' ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.patientCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.method.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDiff =
        selectedDifficulty === 'all' || c.difficulty === selectedDifficulty;

      return matchSearch && matchDiff;
    });
  }, [cases, searchQuery, selectedDifficulty]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addCase({
      caseNumber: caseNumber || `Case #0${cases.length + 1}`,
      patientCode: patientCode || 'PT-9012',
      title: title || 'Yangi amaliy keys',
      topic: topic || 'Umumiy amaliyot',
      ageGroup,
      method,
      difficulty,
      presentingProblem: presentingProblem || 'Mijozning shikoyatlari va murojaat sababi.',
      observedSymptoms: symptomsInput.split(',').map((s) => s.trim()).filter(Boolean),
      approachDescription: approachDescription || 'Qo‘llanilgan psixologik yondashuv.',
      outcomeSummary: outcomeSummary || 'Amaliy natija va tavsiyalar.',
      relatedVideoId: 'vid-101',
      relatedMaterialIds: ['mat-001'],
    });

    setIsAddModalOpen(false);
    showToast('Amaliy keys muvaffaqiyatli yaratildi!');
    setTitle('');
    setPresentingProblem('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase) return;

    updateCase(editingCase.id, {
      title: editingCase.title,
      topic: editingCase.topic,
      presentingProblem: editingCase.presentingProblem,
      approachDescription: editingCase.approachDescription,
      difficulty: editingCase.difficulty,
    });

    setEditingCase(null);
    showToast('Keys ma’lumotlari yangilandi!');
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      deleteCase(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast('Keys o‘chirildi.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Amaliy Keyslar Boshqaruvi"
        description="Amaliy psixologik mashg‘ulotlardan olingan to‘liq anonimlashtirilgan o‘quv keyslari"
        breadcrumbs={[
          { label: 'Kontent' },
          { label: 'Keyslar' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Keys yaratish
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
            placeholder="Keys nomi, anonim ID yoki metod bo‘yicha qidiruv..."
          />
        </div>

        <div className="w-full sm:w-60">
          <Select
            options={[
              { value: 'all', label: 'Barcha qiyinlik darajalari' },
              { value: 'Boshlang‘ich', label: 'Boshlang‘ich daraja' },
              { value: 'O‘rta', label: 'O‘rta daraja' },
              { value: 'Murakkab', label: 'Murakkab daraja' },
            ]}
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          />
        </div>
      </div>

      {/* Cases Table */}
      {filteredCases.length === 0 ? (
        <EmptyState
          icon={<FolderGit2 className="w-6 h-6 text-text-muted" />}
          title="Keyslar topilmadi"
          description="Kiritilgan parametrlar bo‘yicha amaliy keys mavjud emas."
          actionLabel="Yangi keys yaratish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <Card padded="none" className="overflow-hidden border-border-ui shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page border-b border-border-ui text-text-muted font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Keys raqami va Nomi</th>
                  <th className="py-3.5 px-4">Anonymous ID</th>
                  <th className="py-3.5 px-4">Yosh guruhi</th>
                  <th className="py-3.5 px-4">Metod</th>
                  <th className="py-3.5 px-4">Darajasi</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ui bg-surface">
                {filteredCases.map((cs) => (
                  <tr key={cs.id} className="hover:bg-page/50 transition-colors">
                    <td className="py-3.5 px-4 min-w-[240px]">
                      <div>
                        <span className="font-bold text-text-main text-xs sm:text-sm block line-clamp-1">
                          {cs.caseNumber} — {cs.title}
                        </span>
                        <span className="text-[11px] text-text-muted">{cs.topic}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-deep-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {cs.patientCode}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-text-main">
                      {cs.ageGroup}
                    </td>

                    <td className="py-3.5 px-4 text-teal-800 font-medium">
                      {cs.method}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant="teal" size="sm">
                        {cs.difficulty}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => navigate(`/cases/${cs.id}`)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Ko‘rish"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingCase(cs)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(cs.id)}
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
          title="Yangi amaliy keys yaratish"
          description="Eslatma: Bemor shaxsiy daxlsizligi to‘liq saqlanadi"
          maxWidth="xl"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Keysni saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Keys raqami*"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                required
              />

              <Input
                label="Anonymous ID*"
                placeholder="PT-9940"
                value={patientCode}
                onChange={(e) => setPatientCode(e.target.value)}
                required
              />
            </div>

            <Input
              label="Keys sarlavhasi*"
              placeholder="Masalan: Vahima hurujlari va relaksatsiya amaliyoti"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Mavzu*"
                placeholder="Panik buzilish"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />

              <Select
                label="Metod*"
                options={[
                  { value: 'Kognitiv-xulq-atvor terapiyasi (CBT)', label: 'KBT (CBT)' },
                  { value: 'Ratsional-emotiv terapiya (REBT)', label: 'REBT' },
                  { value: 'Gestalt terapiya', label: 'Gestalt terapiya' },
                  { value: 'Art-terapiya', label: 'Art-terapiya' },
                ]}
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Murojaat sababi va shikoyatlar*
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={presentingProblem}
                onChange={(e) => setPresentingProblem(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Modal */}
      {editingCase && (
        <Modal
          isOpen={!!editingCase}
          onClose={() => setEditingCase(null)}
          title="Keysni tahrirlash"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingCase(null)}>
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
              label="Sarlavha*"
              value={editingCase.title}
              onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
              required
            />

            <Input
              label="Mavzu*"
              value={editingCase.topic}
              onChange={(e) => setEditingCase({ ...editingCase, topic: e.target.value })}
              required
            />

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Murojaat sababi*
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={editingCase.presentingProblem}
                onChange={(e) => setEditingCase({ ...editingCase, presentingProblem: e.target.value })}
                required
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
          title="Keysni o‘chirishni tasdiqlaysizmi?"
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
            Ushbu keys bazadan olib tashlanadi.
          </p>
        </Modal>
      )}
    </div>
  );
};
