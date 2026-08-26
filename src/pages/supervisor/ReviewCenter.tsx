import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  ArrowRight, 
  Video as VideoIcon
} from 'lucide-react';
import { useProfessorData } from '../../context/ProfessorDataContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Tabs } from '../../components/common/Tabs';
import { EmptyState } from '../../components/common/EmptyState';
import { VideoStatusBadge } from '../../components/status/VideoStatusBadge';

export const ReviewCenter: React.FC = () => {
  const navigate = useNavigate();
  const { videos } = useProfessorData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  const pendingVideos = videos.filter(v => v.status === 'Under Review' || v.status === 'Submitted');
  const changesVideos = videos.filter(v => v.status === 'Changes Requested');
  const approvedVideos = videos.filter(v => v.status === 'Published' || v.status === 'Approved');
  const rejectedVideos = videos.filter(v => v.status === 'Rejected');

  const reviewTabs = [
    { id: 'pending', label: 'Kutilmoqda', count: pendingVideos.length },
    { id: 'changes', label: 'O‘zgarish kerak', count: changesVideos.length },
    { id: 'approved', label: 'Tasdiqlangan', count: approvedVideos.length },
    { id: 'rejected', label: 'Rad etilgan', count: rejectedVideos.length },
  ];

  const currentList = useMemo(() => {
    let list = pendingVideos;
    if (activeTab === 'changes') list = changesVideos;
    else if (activeTab === 'approved') list = approvedVideos;
    else if (activeTab === 'rejected') list = rejectedVideos;

    return list.filter((v) => {
      return (
        searchQuery === '' ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.professor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.activityType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.method.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [activeTab, pendingVideos, changesVideos, approvedVideos, rejectedVideos, searchQuery]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Review Center (Kontent Ekspertizasi)"
        description="Amaliy psixologik mashg‘ulotlar videolarini metodik, etik va ta’limiy standartlarga muvofiqligini tekshirish"
        breadcrumbs={[
          { label: 'Superviziya' },
          { label: 'Review Center' }
        ]}
        badge={
          <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-2.5 py-1 rounded-full border border-blue-200">
            {pendingVideos.length} ta tekshiruvda
          </span>
        }
      />

      {/* Search and Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 max-w-md">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholder="Video nomi, professor yoki metod bo‘yicha qidiruv..."
            />
          </div>
        </div>

        <Tabs
          tabs={reviewTabs}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab)}
        />
      </div>

      {/* Review List / Table */}
      {currentList.length === 0 ? (
        <EmptyState
          icon={<VideoIcon className="w-6 h-6 text-text-muted" />}
          title="Ushbu toifada videolar yo‘q"
          description="Tanlangan holat bo‘yicha ekspertizaga yuborilgan video topilmadi."
        />
      ) : (
        <Card padded="none" className="overflow-hidden border-border-ui shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page border-b border-border-ui text-text-muted font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Video sarlavhasi</th>
                  <th className="py-3.5 px-4">Muallif (Professor)</th>
                  <th className="py-3.5 px-4">Faoliyat turi va Metod</th>
                  <th className="py-3.5 px-4">Yuborilgan sana</th>
                  <th className="py-3.5 px-4">Holat</th>
                  <th className="py-3.5 px-4 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ui bg-surface">
                {currentList.map((video) => (
                  <tr key={video.id} className="hover:bg-page/50 transition-colors">
                    {/* Title */}
                    <td className="py-3.5 px-4 min-w-[240px]">
                      <div>
                        <p className="font-semibold text-text-main text-xs sm:text-sm line-clamp-1">
                          {video.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-text-muted">
                          <span className="font-mono text-text-main font-medium">{video.duration}</span>
                          <span>•</span>
                          <span className="truncate max-w-[200px]">{video.department}</span>
                        </div>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-text-soft" />
                        <span className="font-medium text-text-main">{video.professor}</span>
                      </div>
                    </td>

                    {/* Activity & Method */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-medium text-text-main block">{video.activityType}</span>
                        <span className="text-[11px] text-teal-800 font-mono">{video.method}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-text-muted">
                      {video.recordedDate}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <VideoStatusBadge status={video.status} size="sm" />
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <Button
                        variant={activeTab === 'pending' ? 'primary' : 'outline'}
                        size="sm"
                        className="text-xs"
                        icon={<ArrowRight className="w-3.5 h-3.5" />}
                        onClick={() => navigate(`/supervisor/reviews/${video.id}`)}
                      >
                        {activeTab === 'pending' ? 'Ekspertiza qilish' : 'Ko‘rib chiqish'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
