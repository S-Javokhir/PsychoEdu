import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderGit2, 
  Plus, 
  ShieldCheck, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  UserCheck
} from 'lucide-react';
import { useProfessorData } from '../../context/ProfessorDataContext';
import type { CaseStudy } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export const MyCases: React.FC = () => {
  const navigate = useNavigate();
  const { cases, addCase, updateCase, deleteCase } = useProfessorData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);

  // New Case Form
  const [caseNumber, setCaseNumber] = useState(`Case #0${cases.length + 10}`);
  const [patientCode, setPatientCode] = useState('PT-8830');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [ageGroup, setAgeGroup] = useState('Kattalar (27 yosh)');
  const [method, setMethod] = useState('Kognitiv-xulq-atvor terapiyasi (CBT)');
  const [difficulty, setDifficulty] = useState<'Boshlang‘ich' | 'O‘rta' | 'Murakkab'>('O‘rta');
  const [presentingProblem, setPresentingProblem] = useState('');
  const [symptomsInput, setSymptomsInput] = useState('Xavotir, Uyqusizlik, Mushak tarangligi');
  const [approachDescription, setApproachDescription] = useState('');
  const [outcomeSummary, setOutcomeSummary] = useState('');
  const [relatedVideoId, setRelatedVideoId] = useState('vid-101');

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
        c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      approachDescription: approachDescription || 'Qo‘llanilgan psixologik yondashuv va o‘tkazilgan intervensiya.',
      outcomeSummary: outcomeSummary || 'Amaliy natija va tavsiyalar.',
      relatedVideoId: relatedVideoId || 'vid-101',
      relatedMaterialIds: ['mat-001'],
    });

    setIsAddModalOpen(false);
    showToast('Yangi amaliy keys yaratildi!');
    setTitle('');
    setPresentingProblem('');
    setApproachDescription('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase) return;

    updateCase(editingCase.id, {
      title: editingCase.title,
      topic: editingCase.topic,
      presentingProblem: editingCase.presentingProblem,
      approachDescription: editingCase.approachDescription,
      outcomeSummary: editingCase.outcomeSummary,
      difficulty: editingCase.difficulty,
    });

    setEditingCase(null);
    showToast('Keys ma’lumotlari yangilandi!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Ushbu keysni o‘chirishni tasdiqlaysizmi?')) {
      deleteCase(id);
      showToast('Keys o‘chirildi.');
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Boshlang‘ich':
        return <Badge variant="success" size="sm">Boshlang‘ich</Badge>;
      case 'O‘rta':
        return <Badge variant="warning" size="sm">O‘rta daraja</Badge>;
      case 'Murakkab':
        return <Badge variant="danger" size="sm">Murakkab</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mening Keyslarim (Case Studies)"
        description="Amaliy psixologik konsultatsiyalardan shakllantirilgan to‘liq anonimlashtirilgan o‘quv keyslari"
        breadcrumbs={[
          { label: 'Ta’lim' },
          { label: 'Keyslarim' }
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

      {/* Toast Alert */}
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
              { value: 'Murakkab', label: 'Murakkab keyslar' },
            ]}
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          />
        </div>
      </div>

      {/* Cases List */}
      {filteredCases.length === 0 ? (
        <EmptyState
          icon={<FolderGit2 className="w-6 h-6 text-text-muted" />}
          title="Keyslar topilmadi"
          description="Kiritilgan so‘rov bo‘yicha amaliy keys mavjud emas."
          actionLabel="Yangi keys yaratish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCases.map((cs) => (
            <Card
              key={cs.id}
              padded="md"
              className="flex flex-col justify-between hover:border-teal-300 transition-all duration-150"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                    <span className="font-mono text-xs font-bold text-deep-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-100 whitespace-nowrap shrink-0">
                      {cs.caseNumber}
                    </span>
                    <div className="inline-flex items-center gap-1 text-[11px] text-text-muted bg-page px-2 py-0.5 rounded border border-border-ui whitespace-nowrap shrink-0">
                      <ShieldCheck className="w-3 h-3 text-teal-600 shrink-0" />
                      <span className="font-mono">{cs.patientCode}</span>
                    </div>
                    {getDifficultyBadge(cs.difficulty)}
                  </div>
                </div>

                <h4
                  onClick={() => navigate(`/cases/${cs.id}`)}
                  className="text-sm font-semibold text-text-main hover:text-deep-teal cursor-pointer mb-1.5 leading-snug line-clamp-2"
                >
                  {cs.title}
                </h4>

                <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted mb-3">
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-text-soft" />
                    {cs.ageGroup}
                  </span>
                  <span>•</span>
                  <span className="text-text-soft">{cs.topic}</span>
                </div>

                <p className="text-xs text-text-muted line-clamp-2 mb-4 bg-page p-2.5 rounded-lg border border-border-ui">
                  <span className="font-medium text-text-main">Murojaat: </span>
                  {cs.presentingProblem}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-border-ui flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  icon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() => navigate(`/cases/${cs.id}`)}
                >
                  Ko‘rish
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 text-xs"
                  icon={<Edit3 className="w-3.5 h-3.5" />}
                  onClick={() => setEditingCase(cs)}
                >
                  Tahrirlash
                </Button>

                <button
                  type="button"
                  onClick={() => handleDelete(cs.id)}
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

      {/* Add Case Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Yangi amaliy keys yaratish (Anonim)"
          description="Bemorning shaxsiy ma’lumotlari to‘liq shifrlanadi. Faqat anonim ID bilan saqlanadi."
          maxWidth="2xl"
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
                Keysni yaratish
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="Keys raqami*"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                required
              />

              <Input
                label="Anonymous Patient ID*"
                placeholder="PT-8830"
                value={patientCode}
                onChange={(e) => setPatientCode(e.target.value)}
                hint="Shifrlangan anonim kod"
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
              label="Keys sarlavhasi*"
              placeholder="Masalan: Fobiya bilan murojaat — Sistematik desensibilizatsiya amaliyoti"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Asosiy mavzu / Muammo yo‘nalishi*"
                placeholder="Masalan: Ijtimoiy fobiya va sarosima"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />

              <Select
                label="Qo‘llanilgan metod*"
                options={[
                  { value: 'Kognitiv-xulq-atvor terapiyasi (CBT)', label: 'KBT (CBT)' },
                  { value: 'Ratsional-emotiv terapiya (REBT)', label: 'REBT' },
                  { value: 'Gestalt terapiya', label: 'Gestalt terapiya' },
                  { value: 'Art-terapiya', label: 'Art-terapiya' },
                  { value: 'Krizis intervensiyasi', label: 'Krizis intervensiyasi' },
                ]}
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                1. Asosiy murojaat sababi va shikoyatlar*
              </label>
              <textarea
                rows={2}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Mijoz nima sababdan murojaat qilgan va qanday qiyinchiliklarga duch kelmoqda..."
                value={presentingProblem}
                onChange={(e) => setPresentingProblem(e.target.value)}
                required
              />
            </div>

            <Input
              label="2. Kuzatilgan asosiy alomatlar (vergul bilan ajrating)*"
              placeholder="Xavotir, Yurak tez urishi, Katastrofik fikrlash"
              value={symptomsInput}
              onChange={(e) => setSymptomsInput(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                3. Qo‘llanilgan psixologik yondashuv va intervensiya bosqichlari*
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Terapevt qanday metodik qadamlarni qo‘lladi..."
                value={approachDescription}
                onChange={(e) => setApproachDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                4. Amaliy natija va yakuniy xulosa*
              </label>
              <textarea
                rows={2}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Seanslar yakunida mijozning holati va dinamika..."
                value={outcomeSummary}
                onChange={(e) => setOutcomeSummary(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Qiyinchilik darajasi"
                options={[
                  { value: 'Boshlang‘ich', label: 'Boshlang‘ich daraja' },
                  { value: 'O‘rta', label: 'O‘rta daraja' },
                  { value: 'Murakkab', label: 'Murakkab keys' },
                ]}
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
              />

              <Select
                label="Bog‘liq amaliyot videosi"
                options={[
                  { value: 'vid-101', label: 'Anxiety bilan ishlash (vid-101)' },
                  { value: 'vid-102', label: 'Faol tinglash va empatiya (vid-102)' },
                  { value: 'vid-103', label: 'Birlamchi konsultatsiya va kontrakt (vid-103)' },
                  { value: 'vid-104', label: 'Bolalarda agressiya korreksiyasi (vid-104)' },
                ]}
                value={relatedVideoId}
                onChange={(e) => setRelatedVideoId(e.target.value)}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Case Modal */}
      {editingCase && (
        <Modal
          isOpen={!!editingCase}
          onClose={() => setEditingCase(null)}
          title="Keysni tahrirlash"
          description={`${editingCase.caseNumber} • ${editingCase.patientCode}`}
          maxWidth="xl"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingCase(null)}
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
                rows={2}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={editingCase.presentingProblem}
                onChange={(e) => setEditingCase({ ...editingCase, presentingProblem: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Qo‘llanilgan yondashuv*
              </label>
              <textarea
                rows={3}
                className="w-full rounded-input border border-border-ui bg-surface text-xs sm:text-sm text-text-main p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={editingCase.approachDescription}
                onChange={(e) => setEditingCase({ ...editingCase, approachDescription: e.target.value })}
                required
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
