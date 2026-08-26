import React, { useState } from 'react';
import { 
  User, 
  Globe, 
  Bell, 
  CheckCircle2, 
  Save 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Tabs } from '../../components/common/Tabs';

export const AdminSettings: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Form states
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [email, setEmail] = useState(currentUser.email);
  const [language, setLanguage] = useState('uz');
  const [calmMode, setCalmMode] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [reviewNotifications, setReviewNotifications] = useState(true);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Sozlamalar muvaffaqiyatli saqlandi!');
  };

  const tabs = [
    { id: 'profile', label: 'Profil sozlamalari', icon: <User className="w-4 h-4" /> },
    { id: 'interface', label: 'Interfeys afzalliklari', icon: <Globe className="w-4 h-4" /> },
    { id: 'notifications', label: 'Bildirishnomalar', icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tizim Sozlamalari"
        description="Foydalanuvchi profili, interfeys va bildirishnomalar boshqaruvi"
        breadcrumbs={[
          { label: 'Tizim' },
          { label: 'Sozlamalar' }
        ]}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="p-3.5 bg-teal-50 border border-teal-300 rounded-xl text-teal-900 text-xs font-semibold flex items-center gap-2 shadow-subtle animate-subtle-pulse">
          <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onChange={(tab) => setActiveTab(tab)} />

      <form onSubmit={handleSave} className="max-w-2xl">
        {activeTab === 'profile' && (
          <Card padded="lg" className="space-y-4">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider border-b border-border-ui pb-2">
              Administrator Profili
            </h3>

            <div className="space-y-3">
              <Input
                label="To‘liq ism (F.I.Sh)*"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <Input
                label="Elektron pochta*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Tizimdagi vazifasi"
                value={currentUser.roleLabel}
                disabled
              />
            </div>
          </Card>
        )}

        {activeTab === 'interface' && (
          <Card padded="lg" className="space-y-4">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider border-b border-border-ui pb-2">
              Interfeys va Ko‘rinish
            </h3>

            <div className="space-y-4">
              <Select
                label="Asosiy interfeys tili"
                options={[
                  { value: 'uz', label: 'O‘zbek tili (Lotin)' },
                ]}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />

              <div className="flex items-center justify-between p-3.5 bg-page rounded-xl border border-border-ui">
                <div>
                  <h4 className="text-xs font-bold text-text-main">Sokin akademik rejim (Calm Academic Mode)</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">Ortiqcha miltillashlar va agressiv animatsiyalarni cheklash</p>
                </div>
                <input
                  type="checkbox"
                  checked={calmMode}
                  onChange={(e) => setCalmMode(e.target.checked)}
                  className="w-4 h-4 text-deep-teal rounded"
                />
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'notifications' && (
          <Card padded="lg" className="space-y-4">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider border-b border-border-ui pb-2">
              Bildirishnomalar Sozlamalari
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-page rounded-xl border border-border-ui">
                <div>
                  <h4 className="text-xs font-bold text-text-main">Yangi videolar va seanslar haqida xabarnoma</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">Professor yangi amaliy seans yuklaganda xabar berish</p>
                </div>
                <input
                  type="checkbox"
                  checked={reviewNotifications}
                  onChange={(e) => setReviewNotifications(e.target.checked)}
                  className="w-4 h-4 text-deep-teal rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-page rounded-xl border border-border-ui">
                <div>
                  <h4 className="text-xs font-bold text-text-main">E-mail orqali haftalik hisobotlar</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">Kafedralar faolligi haqida e-mail xabarlar</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-deep-teal rounded"
                />
              </div>
            </div>
          </Card>
        )}

        <div className="pt-4 flex items-center justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={<Save className="w-4 h-4" />}
          >
            Sozlamalarni saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};
