import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Disc, 
  Square, 
  Camera, 
  Clock, 
  Building, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  FileCheck,
  Save,
  Send
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProfessorData } from '../../context/ProfessorDataContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const RecordingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addSession } = useProfessorData();

  // Step state: 'setup' | 'recording' | 'metadata'
  const [step, setStep] = useState<'setup' | 'recording' | 'metadata'>('setup');

  // Room & Camera setup
  const [selectedRoom, setSelectedRoom] = useState('203-xona (Konsultatsiya xonasi A)');
  const [selectedCamera, setSelectedCamera] = useState('Kamera #1 (Asosiy rakurs - 1080p)');
  
  // Timer state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isConfirmEndOpen, setIsConfirmEndOpen] = useState(false);

  // Metadata Form Fields
  const [title, setTitle] = useState('');
  const [activityType, setActivityType] = useState('Individual konsultatsiya');
  const [psychologicalDirection, setPsychologicalDirection] = useState('Kognitiv-xulq-atvor terapiyasi (CBT)');
  const [topic, setTopic] = useState('');
  const [method, setMethod] = useState('');
  const [educationalObjective, setEducationalObjective] = useState('');
  const [difficulty, setDifficulty] = useState<'Boshlang‘ich' | 'O‘rta' | 'Murakkab'>('O‘rta');
  const [tagsInput, setTagsInput] = useState('anxiety, cbt, psixologik konsultatsiya');
  const [patientCode, setPatientCode] = useState('PT-9012');
  const [ageGroup, setAgeGroup] = useState('Kattalar (26 yosh)');
  const [minimalPatientInfo, setMinimalPatientInfo] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Timer effect when recording
  useEffect(() => {
    let interval: any = null;
    if (step === 'recording') {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step]);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setElapsedSeconds(0);
    setStep('recording');
  };

  const handleOpenEndConfirm = () => {
    setIsConfirmEndOpen(true);
  };

  const handleConfirmEnd = () => {
    setIsConfirmEndOpen(false);
    setStep('metadata');
    // Pre-populate title and defaults if empty
    if (!title) {
      setTitle(`${activityType} — ${topic || 'Amaliy seans yozuvi'}`);
    }
    if (!method) {
      setMethod('Sokratik suhbat va kognitiv qayta tuzish');
    }
    if (!educationalObjective) {
      setEducationalObjective('Talabalarga birlamchi konsultatsiya olib borish va mijoz bilan terapevtik kontrakt tuzishni o‘rgatish.');
    }
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const durationStr = `${Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:${(elapsedSeconds % 60).toString().padStart(2, '0')}`;
    
    addSession({
      title: title || 'Nomsiz qoralama seans',
      date: 'Bugun, 26 Fevral, 2026',
      activityType,
      roomNumber: selectedRoom.split(' ')[0],
      duration: durationStr === '00:00' ? '42:15' : durationStr,
      status: 'Draft',
      psychologicalDirection,
      topic: topic || 'Umumiy amaliyot',
      method: method || 'KBT usullari',
      educationalObjective,
      difficulty,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      patientCode: patientCode || 'PT-9012',
      ageGroup,
      minimalPatientInfo,
    });

    setSuccessToast('Seans qoralama sifatida muvaffaqiyatli saqlandi!');
    setTimeout(() => {
      navigate('/professor/sessions');
    }, 1500);
  };

  const handleSubmitForReview = (e: React.FormEvent) => {
    e.preventDefault();
    const durationStr = `${Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:${(elapsedSeconds % 60).toString().padStart(2, '0')}`;

    addSession({
      title: title || 'Amaliy seans yozuvi',
      date: 'Bugun, 26 Fevral, 2026',
      activityType,
      roomNumber: selectedRoom.split(' ')[0],
      duration: durationStr === '00:00' ? '45:30' : durationStr,
      status: 'Under Review',
      psychologicalDirection,
      topic: topic || 'Xavotir va depressiya',
      method: method || 'KBT kognitiv qayta tuzish',
      educationalObjective,
      difficulty,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      patientCode: patientCode || 'PT-9012',
      ageGroup,
      minimalPatientInfo,
    });

    setSuccessToast('Seans ko‘rib chiqishga yuborildi va superviziya navbatiga qo‘shildi!');
    setTimeout(() => {
      navigate('/professor/sessions');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Amaliy Seansni Yozib Olish (Recording)"
        description="Konsultatsiya xonalaridagi amaliy mashg‘ulotlarni ta’limiy maqsadlar uchun yozib olish va metama’lumotlar bilan rasmiylashtirish"
        breadcrumbs={[
          { label: 'Amaliyot' },
          { label: 'Recording' }
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/professor/sessions')}
          >
            Seanslarimga qaytish
          </Button>
        }
      />

      {/* Success Toast */}
      {successToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-sm font-medium flex items-center gap-2.5 shadow-subtle animate-subtle-pulse">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* STEP 1 & 2: Recording Studio / Live Cam Box */}
      {step !== 'metadata' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Screen (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative bg-neutral-950 rounded-card overflow-hidden aspect-video shadow-card flex items-center justify-center border border-neutral-800">
              {/* Studio Room Simulated Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />

              {/* Top Overlays */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                {step === 'recording' ? (
                  <div className="bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-2 shadow-lg animate-pulse">
                    <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    <span>YOZIB OLINMOQDA (RECORDING)</span>
                  </div>
                ) : (
                  <div className="bg-deep-teal/90 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-2 border border-white/10">
                    <Camera className="w-4 h-4 text-teal-300" />
                    <span>Kamera tayyor • Jonli signal</span>
                  </div>
                )}

                <div className="bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-md border border-white/10 font-mono">
                  {selectedRoom.split(' ')[0]} • HD 1080p@30fps
                </div>
              </div>

              {/* Center Recording Timer Display when active */}
              {step === 'recording' && (
                <div className="z-20 text-center select-none">
                  <div className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-rose-500/30 mb-2">
                    <Clock className="w-5 h-5 text-rose-400" />
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-widest">
                      {formatTimer(elapsedSeconds)}
                    </span>
                  </div>
                  <p className="text-white/80 text-xs font-medium">
                    Seans audiosi va videosi xavfsiz serverga buferlanmoqda
                  </p>
                </div>
              )}

              {/* Bottom Control Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-black/75 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <User className="w-4 h-4 text-teal-300" />
                  <span>Mutaxassis: <strong>{currentUser.fullName}</strong></span>
                </div>

                <div>
                  {step === 'setup' ? (
                    <Button
                      variant="danger"
                      size="sm"
                      className="bg-rose-600 hover:bg-rose-700 font-semibold"
                      icon={<Disc className="w-4 h-4" />}
                      onClick={handleStartRecording}
                    >
                      Seansni boshlash
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      size="sm"
                      className="bg-rose-600 hover:bg-rose-700 font-semibold"
                      icon={<Square className="w-4 h-4 fill-white" />}
                      onClick={handleOpenEndConfirm}
                    >
                      Seansni yakunlash
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Privacy & Ethical reminder */}
            <div className="bg-sage-light border border-sage rounded-card p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
              <div className="text-xs text-teal-950">
                <p className="font-semibold text-teal-900 mb-0.5">
                  Professional Etika va Maxfiylik Kafolati
                </p>
                <p className="text-teal-800/90 leading-relaxed">
                  Amaliy seans yozib olinayotganda bemorning shaxsiy ma’lumotlari (familiya, telefon, manzil) aytilmasligi lozim. Barcha ta’limiy yozuvlar anonim ID ostida superviziya uchun saqlanadi.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Studio Setup & Room Selection (1 Col) */}
          <div className="space-y-6">
            <Card padded="lg">
              <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-teal-600" />
                <span>Xona va Kamera Sozlamalari</span>
              </h3>

              <div className="space-y-4">
                <Select
                  label="Konsultatsiya xonasini tanlang:"
                  options={[
                    { value: '203-xona (Konsultatsiya xonasi A)', label: '203-xona (Konsultatsiya xonasi A)' },
                    { value: '201-xona (Individual terapiya)', label: '201-xona (Individual terapiya)' },
                    { value: '305-xona (Guruh terapiyasi)', label: '305-xona (Guruh terapiyasi)' },
                    { value: '108-xona (Bolalar xonasi)', label: '108-xona (Bolalar xonasi)' },
                  ]}
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  disabled={step === 'recording'}
                />

                <Select
                  label="Kamerani tanlang:"
                  options={[
                    { value: 'Kamera #1 (Asosiy rakurs - 1080p)', label: 'Kamera #1 (Asosiy rakurs - 1080p)' },
                    { value: 'Kamera #2 (Yon burchak - 1080p)', label: 'Kamera #2 (Yon burchak - 1080p)' },
                    { value: 'Kamera #3 (Keng panorama - 4K)', label: 'Kamera #3 (Keng panorama - 4K)' },
                  ]}
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  disabled={step === 'recording'}
                />

                <div className="pt-3 border-t border-border-ui space-y-2 text-xs text-text-muted">
                  <div className="flex items-center justify-between">
                    <span>Ovoz kanali:</span>
                    <span className="text-emerald-700 font-semibold">Mikrofon faol (Stereo)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Signal sifati:</span>
                    <span className="text-text-main font-mono">1080p @ 30fps (6000 Kbps)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shifrlash holati:</span>
                    <span className="text-teal-800 font-semibold">AES-256 Faol</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Session Info Helper */}
            <Card padded="md" className="bg-page">
              <h4 className="text-xs font-bold text-text-main mb-2">
                Qo‘llanma:
              </h4>
              <ol className="text-xs text-text-muted space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>Xona va kerakli kamerani tanlang.</li>
                <li>Mijoz bilan seans boshlanganda <strong>«Seansni boshlash»</strong> tugmasini bosing.</li>
                <li>Seans tugagach, <strong>«Seansni yakunlash»</strong> orqali metama’lumotlar formasini to‘ldiring.</li>
              </ol>
            </Card>
          </div>
        </div>
      )}

      {/* Confirmation Modal when Ending Recording */}
      <Modal
        isOpen={isConfirmEndOpen}
        onClose={() => setIsConfirmEndOpen(false)}
        title="Seans yozuvini yakunlashni tasdiqlaysizmi?"
        description="Yozib olish to‘xtatiladi va siz seans metama’lumotlarini to‘ldirish bosqichiga o‘tasiz."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsConfirmEndOpen(false)}
            >
              Yozishni davom ettirish
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<CheckCircle2 className="w-4 h-4" />}
              onClick={handleConfirmEnd}
            >
              Yakunlash va metama’lumotlarni to‘ldirish
            </Button>
          </>
        }
      >
        <div className="p-3 bg-page rounded-xl border border-border-ui space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Seans davomiyligi:</span>
            <span className="font-mono font-bold text-text-main text-sm">
              {formatTimer(elapsedSeconds)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Xona:</span>
            <span className="font-medium text-text-main">{selectedRoom}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Mutaxassis:</span>
            <span className="font-medium text-text-main">{currentUser.fullName}</span>
          </div>
        </div>
      </Modal>

      {/* STEP 3: Professional Session Metadata Form */}
      {step === 'metadata' && (
        <form className="space-y-8 max-w-4xl mx-auto">
          {/* Header Note */}
          <div className="bg-teal-50 border border-teal-200 rounded-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-deep-teal" />
              <div>
                <h3 className="text-sm font-bold text-deep-teal">
                  Seans muvaffaqiyatli yozib olindi ({formatTimer(elapsedSeconds)})
                </h3>
                <p className="text-xs text-teal-800">
                  Ushbu amaliy yozuvni ta’limiy katalogga qo‘shish uchun quyidagi metama’lumotlarni to‘ldiring.
                </p>
              </div>
            </div>
            <Badge variant="teal" size="md">
              Metama’lumotlar
            </Badge>
          </div>

          {/* Section 1: Asosiy Ma'lumotlar */}
          <Card padded="lg" className="space-y-4">
            <div className="border-b border-border-ui pb-3">
              <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-deep-teal text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Asosiy ma’lumotlar</span>
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Konsultatsiya mavzusi, yo‘nalishi va tashkiliy parametrlari
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label="Seans nomi (Sarlavha)*"
                  placeholder="Masalan: Anxiety bilan ishlash (Xavotir buzilishida KBT yondashuvi)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <Select
                label="Faoliyat turi*"
                options={[
                  { value: 'Individual konsultatsiya', label: 'Individual konsultatsiya' },
                  { value: 'Guruh terapiyasi', label: 'Guruh psixoterapiyasi' },
                  { value: 'Birlamchi diagnostika', label: 'Birlamchi diagnostika va anamnez' },
                  { value: 'Bolalar psixoterapiyasi', label: 'Bolalar psixoterapiyasi' },
                  { value: 'Krizis intervensiyasi', label: 'Krizis intervensiyasi' },
                ]}
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
              />

              <Select
                label="Psixologik yo‘nalish / Maktab*"
                options={[
                  { value: 'Kognitiv-xulq-atvor terapiyasi (CBT)', label: 'Kognitiv-xulq-atvor terapiyasi (CBT)' },
                  { value: 'Ratsional-emotiv terapiya (REBT)', label: 'Ratsional-emotiv terapiya (REBT)' },
                  { value: 'Gestalt terapiya', label: 'Gestalt terapiya' },
                  { value: 'Gumanistik va mijozga yo‘naltirilgan', label: 'Gumanistik yondashuv' },
                  { value: 'Art-terapiya', label: 'Art-terapiya' },
                ]}
                value={psychologicalDirection}
                onChange={(e) => setPsychologicalDirection(e.target.value)}
              />

              <Input
                label="Mavzu*"
                placeholder="Masalan: Umumiy xavotir sindromi (GAD)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />

              <Input
                label="Qo‘llanilgan asosiy metod / texnika*"
                placeholder="Masalan: Sokratik savollar va ANF tahlili"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                required
              />

              <Input
                label="Xona"
                value={selectedRoom}
                disabled
              />

              <Input
                label="Davomiyligi"
                value={formatTimer(elapsedSeconds) === '00:00:00' ? '45:30' : formatTimer(elapsedSeconds)}
                disabled
              />
            </div>
          </Card>

          {/* Section 2: Ta'lim uchun */}
          <Card padded="lg" className="space-y-4">
            <div className="border-b border-border-ui pb-3">
              <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-deep-teal text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Ta’lim uchun parametrlar</span>
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Talabalar ushbu videodan qanday amaliy ko‘nikmalarni o‘zlashtirishi ko‘rsatiladi
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-main mb-1.5">
                  O‘quv maqsadi va talabalar uchun ko‘rsatma*
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-input border border-border-ui bg-surface text-sm text-text-main p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-teal-300 transition-colors"
                  placeholder="Masalan: Ushbu darsda talabalar avtomatik salbiy fikrlarni aniqlash va kognitiv qayta tuzish (reframing) texnikasini amalda kuzatadilar..."
                  value={educationalObjective}
                  onChange={(e) => setEducationalObjective(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Qiyinchilik darajasi*"
                  options={[
                    { value: 'Boshlang‘ich', label: 'Boshlang‘ich daraja (1-2 kurs)' },
                    { value: 'O‘rta', label: 'O‘rta daraja (3-4 kurs)' },
                    { value: 'Murakkab', label: 'Murakkab / Magistratura' },
                  ]}
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                />

                <Input
                  label="Teglar (vergul bilan ajrating)"
                  placeholder="anxiety, cbt, sokratik, xavotir"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Section 3: Bemor (Anonim) */}
          <Card padded="lg" className="space-y-4">
            <div className="border-b border-border-ui pb-3">
              <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-deep-teal text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Bemor (To‘liq Anonimlashtirilgan)</span>
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Konfidensiallik qoidasiga ko‘ra bemorning ismi yoki shaxsiy ma’lumotlari yozilmaydi
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Anonymous Patient ID*"
                placeholder="PT-9012"
                value={patientCode}
                onChange={(e) => setPatientCode(e.target.value)}
                hint="Tizim tomonidan generatsiya qilingan anonim kod"
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

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-text-main mb-1.5">
                  Minimal zarur klinik ma’lumot (Murojaat sababi)
                </label>
                <textarea
                  rows={2}
                  className="w-full rounded-input border border-border-ui bg-surface text-sm text-text-main p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-teal-300 transition-colors"
                  placeholder="Masalan: So‘nggi 6 oyda kuchli xavotir va tana tarangligi bo‘yicha birlamchi murojaat..."
                  value={minimalPatientInfo}
                  onChange={(e) => setMinimalPatientInfo(e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border-ui">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setStep('setup')}
            >
              Bekor qilish
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="md"
              icon={<Save className="w-4 h-4" />}
              onClick={handleSaveDraft}
            >
              Qoralama sifatida saqlash
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Send className="w-4 h-4" />}
              onClick={handleSubmitForReview}
            >
              Ko‘rib chiqishga yuborish
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
