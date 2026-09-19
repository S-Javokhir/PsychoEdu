import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  GraduationCap, 
  Building, 
  Bookmark, 
  LogOut, 
  FileText, 
  Video, 
  FolderGit2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarkContext';
import { mockMaterials } from '../data/materials';
import { mockVideos } from '../data/videos';
import { mockCases } from '../data/cases';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { Tabs } from '../components/common/Tabs';
import { EmptyState } from '../components/common/EmptyState';
import { MaterialCard } from '../components/domain/MaterialCard';
import { VideoCard } from '../components/domain/VideoCard';
import { CaseCard } from '../components/domain/CaseCard';

export const Profile: React.FC = () => {
  const { currentUser, role, logout } = useAuth();
  const { savedMaterialIds, savedCaseIds, savedVideoIds } = useBookmarks();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('materials');

  const savedMaterials = mockMaterials.filter((m) => savedMaterialIds.includes(m.id));
  const savedCases = mockCases.filter((c) => savedCaseIds.includes(c.id));
  const savedVideos = mockVideos.filter((v) => savedVideoIds.includes(v.id));

  const profileTabs = [
    { id: 'materials', label: 'Saqlangan materiallar', count: savedMaterials.length, icon: <FileText className="w-4 h-4" /> },
    { id: 'cases', label: 'Saqlangan keyslar', count: savedCases.length, icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'videos', label: 'Saqlangan videolar', count: savedVideos.length, icon: <Video className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Foydalanuvchi Profili"
        description="Akademik ma’lumotlar va shaxsiy saqlangan o‘quv resurslari"
        breadcrumbs={[{ label: 'Profil' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:bg-red-50"
              icon={<LogOut className="w-4 h-4" />}
              onClick={() => {
                logout();
                navigate('/', { replace: true });
              }}
            >
              Chiqish
            </Button>
          </div>
        }
      />

      {/* User Information Card */}
      <Card padded="lg" className="border-border-ui shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <Avatar
            src={currentUser.avatarUrl}
            name={currentUser.fullName}
            size="xl"
            className="w-20 h-20 text-2xl border-2 border-teal-200"
          />

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-text-main">
                {currentUser.fullName}
              </h2>
              <span className="text-xs font-semibold bg-teal-50 text-teal-800 px-3 py-1 rounded-full border border-teal-200">
                {currentUser.roleLabel}
              </span>
            </div>

            <p className="text-xs text-text-muted flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-text-soft" />
              <span>{currentUser.email}</span>
            </p>

            <div className="pt-2 flex flex-wrap gap-y-2 gap-x-6 text-xs text-text-muted border-t border-border-ui">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-teal-700 shrink-0" />
                <span>{currentUser.faculty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-teal-700 shrink-0" />
                <span>{currentUser.department}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Extended academic attributes */}
        <div className="mt-6 pt-4 border-t border-border-ui grid grid-cols-2 sm:grid-cols-4 gap-4 bg-page p-3.5 rounded-xl text-xs">
          {role === 'student' ? (
            <>
              <div>
                <span className="text-text-soft block text-[11px]">O‘quv yili:</span>
                <span className="font-semibold text-text-main">{currentUser.academicYear}</span>
              </div>
              <div>
                <span className="text-text-soft block text-[11px]">Akademik guruh:</span>
                <span className="font-semibold text-text-main">{currentUser.groupNumber}</span>
              </div>
              <div>
                <span className="text-text-soft block text-[11px]">Talaba ID:</span>
                <span className="font-mono font-semibold text-text-main">{currentUser.studentId}</span>
              </div>
              <div>
                <span className="text-text-soft block text-[11px]">Holat:</span>
                <span className="font-semibold text-emerald-700">Faol talaba</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-text-soft block text-[11px]">Ilmiy unvon:</span>
                <span className="font-semibold text-text-main">{currentUser.academicTitle}</span>
              </div>
              <div>
                <span className="text-text-soft block text-[11px]">Mutaxassislik:</span>
                <span className="font-semibold text-text-main truncate block">{currentUser.specialization}</span>
              </div>
              <div>
                <span className="text-text-soft block text-[11px]">Litsenziya raqami:</span>
                <span className="font-mono font-semibold text-text-main">{currentUser.licenseNumber}</span>
              </div>
              <div>
                <span className="text-text-soft block text-[11px]">Holat:</span>
                <span className="font-semibold text-emerald-700">Professor / Amaliyotchi</span>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Bookmarked / Saved Items Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-text-main flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-teal-700" />
            <span>Xatcho‘plar va saqlangan o‘quv resurslari</span>
          </h3>
        </div>

        <Tabs
          tabs={profileTabs}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab)}
        />

        {/* Tab Content */}
        <div className="pt-2">
          {activeTab === 'materials' && (
            savedMaterials.length === 0 ? (
              <EmptyState
                icon={<FileText className="w-6 h-6 text-text-muted" />}
                title="Saqlangan materiallar yo‘q"
                description="O‘quv materiallari bo‘limidan o‘zingizga kerakli qo‘llanmalarni saqlab qo‘yishingiz mumkin."
                actionLabel="Materiallar sahifasiga o‘tish"
                onAction={() => navigate('/materials')}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedMaterials.map((mat) => (
                  <MaterialCard key={mat.id} material={mat} />
                ))}
              </div>
            )
          )}

          {activeTab === 'cases' && (
            savedCases.length === 0 ? (
              <EmptyState
                icon={<FolderGit2 className="w-6 h-6 text-text-muted" />}
                title="Saqlangan keyslar yo‘q"
                description="Tahlil qilingan amaliy keyslarni xatcho‘pga qo‘shing."
                actionLabel="Keyslar sahifasiga o‘tish"
                onAction={() => navigate('/cases')}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {savedCases.map((cs) => (
                  <CaseCard key={cs.id} caseStudy={cs} />
                ))}
              </div>
            )
          )}

          {activeTab === 'videos' && (
            savedVideos.length === 0 ? (
              <EmptyState
                icon={<Video className="w-6 h-6 text-text-muted" />}
                title="Saqlangan videolar yo‘q"
                description="Video kutubxonasidan dars yozuvlarini saqlab oling."
                actionLabel="Videolar sahifasiga o‘tish"
                onAction={() => navigate('/videos')}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};
