import React, { useState, useMemo } from 'react';
import { 
  Camera as CameraIcon, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import type { Camera, CameraState } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { EmptyState } from '../../components/common/EmptyState';
import { CameraStatusBadge } from '../../components/status/CameraStatusBadge';

export const Cameras: React.FC = () => {
  const { cameras, addCamera, updateCamera, deleteCamera } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState('203-xona');
  const [floor] = useState(2);
  const [cameraType, setCameraType] = useState<'PTZ' | 'Panorama' | 'Fixed HD'>('PTZ');
  const [resolution, setResolution] = useState('1080p (Full HD)');
  const [fps] = useState(30);
  const [state, setState] = useState<CameraState>('Online');
  const [recordingEnabled] = useState(true);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCameras = useMemo(() => {
    return cameras.filter((c) => {
      const matchSearch =
        searchQuery === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.resolution.toLowerCase().includes(searchQuery.toLowerCase());

      const matchState = selectedState === 'all' || c.state === selectedState;

      return matchSearch && matchState;
    });
  }, [cameras, searchQuery, selectedState]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addCamera({
      name: name || 'Kamera #1 (Asosiy rakurs)',
      roomNumber,
      floor: Number(floor) || 2,
      state,
      resolution,
      fps: Number(fps) || 30,
      cameraType,
      recordingEnabled,
      lastActivity: 'Hozir',
    });

    setIsAddModalOpen(false);
    showToast('Kamera muvaffaqiyatli qo‘shildi!');
    setName('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCamera) return;

    updateCamera(editingCamera.id, {
      name: editingCamera.name,
      roomNumber: editingCamera.roomNumber,
      resolution: editingCamera.resolution,
      fps: Number(editingCamera.fps),
      state: editingCamera.state,
      recordingEnabled: editingCamera.recordingEnabled,
    });

    setEditingCamera(null);
    showToast('Kamera sozlamalari yangilandi!');
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      deleteCamera(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast('Kamera o‘chirildi.');
    }
  };

  const toggleRecording = (cam: Camera) => {
    const newVal = !cam.recordingEnabled;
    updateCamera(cam.id, { recordingEnabled: newVal });
    showToast(`${cam.name} uchun yozib olish ${newVal ? 'yoqildi' : 'o‘chirildi'}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kuzatuv Kameralari Infratuzilmasi"
        description="Konsultatsiya xonalaridagi video oqim apparatlari, holati va ruxsat etilgan yozib olish sozlamalari"
        breadcrumbs={[
          { label: 'Infratuzilma' },
          { label: 'Kameralar' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Kamera qo‘shish
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
            placeholder="Kamera nomi yoki xona bo‘yicha qidiruv..."
          />
        </div>

        <div className="w-full sm:w-60">
          <Select
            options={[
              { value: 'all', label: 'Barcha signallar' },
              { value: 'Live', label: 'Live (Jonli efir)' },
              { value: 'Recording', label: 'Recording (Yozib olinmoqda)' },
              { value: 'Online', label: 'Online (Tayyor)' },
              { value: 'Preparing', label: 'Preparing (Tayyorlanmoqda)' },
              { value: 'Offline', label: 'Offline' },
              { value: 'Stream Error', label: 'Stream Error (Xatolik)' },
            ]}
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          />
        </div>
      </div>

      {/* Cameras Table */}
      {filteredCameras.length === 0 ? (
        <EmptyState
          icon={<CameraIcon className="w-6 h-6 text-text-muted" />}
          title="Kameralar topilmadi"
          description="Kiritilgan parametrlar bo‘yicha kamera apparati topilmadi."
          actionLabel="Yangi kamera qo‘shish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <Card padded="none" className="overflow-hidden border-border-ui shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page border-b border-border-ui text-text-muted font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Kamera nomi</th>
                  <th className="py-3.5 px-4">Xona</th>
                  <th className="py-3.5 px-4">Turi</th>
                  <th className="py-3.5 px-4">Signal sifati</th>
                  <th className="py-3.5 px-4">Oqim holati</th>
                  <th className="py-3.5 px-4 text-center">Yozib olish</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ui bg-surface">
                {filteredCameras.map((cam) => (
                  <tr key={cam.id} className="hover:bg-page/50 transition-colors">
                    <td className="py-3.5 px-4 min-w-[200px]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-page flex items-center justify-center border border-border-ui shrink-0">
                          <CameraIcon className="w-4 h-4 text-teal-700" />
                        </div>
                        <div>
                          <span className="font-semibold text-text-main text-xs sm:text-sm block">
                            {cam.name}
                          </span>
                          <span className="text-[11px] text-text-muted">ID: {cam.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-text-main bg-page px-2 py-0.5 rounded border border-border-ui">
                        {cam.roomNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-text-muted">
                      {cam.cameraType || 'PTZ (Boshqariluvchi)'}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-text-main">
                      {cam.resolution} @ {cam.fps}fps
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <CameraStatusBadge state={cam.state} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-center">
                      <button
                        type="button"
                        onClick={() => toggleRecording(cam)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                          cam.recordingEnabled
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {cam.recordingEnabled ? 'Ruxsat berilgan' : 'Bloklangan'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingCamera(cam)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(cam.id)}
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

      {/* Add Camera Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Yangi kamera apparati qo‘shish"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Kamerani saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Kamera nomi*"
              placeholder="Masalan: Kamera #1 (Asosiy rakurs)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Tegishli xona*"
                options={[
                  { value: '203-xona', label: '203-xona (Konsultatsiya A)' },
                  { value: '201-xona', label: '201-xona (Individual B)' },
                  { value: '305-xona', label: '305-xona (Guruh zali)' },
                  { value: '108-xona', label: '108-xona (Bolalar xonasi)' },
                  { value: '204-xona', label: '204-xona (Laboratoriya)' },
                ]}
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />

              <Select
                label="Kamera turi*"
                options={[
                  { value: 'PTZ', label: 'PTZ (Boshqariluvchi)' },
                  { value: 'Panorama', label: 'Panorama (Keng burchak)' },
                  { value: 'Fixed HD', label: 'Fixed HD (Statsionar)' },
                ]}
                value={cameraType}
                onChange={(e) => setCameraType(e.target.value as any)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Signal sifati"
                options={[
                  { value: '1080p (Full HD)', label: '1080p Full HD' },
                  { value: '4K (Ultra HD)', label: '4K Ultra HD' },
                  { value: '720p (HD)', label: '720p HD' },
                ]}
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
              />

              <Select
                label="Dastlabki signal holati"
                options={[
                  { value: 'Online', label: 'Online' },
                  { value: 'Live', label: 'Live' },
                  { value: 'Preparing', label: 'Preparing' },
                  { value: 'Offline', label: 'Offline' },
                ]}
                value={state}
                onChange={(e) => setState(e.target.value as any)}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Camera Modal */}
      {editingCamera && (
        <Modal
          isOpen={!!editingCamera}
          onClose={() => setEditingCamera(null)}
          title="Kamera sozlamalarini tahrirlash"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingCamera(null)}>
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
              label="Kamera nomi*"
              value={editingCamera.name}
              onChange={(e) => setEditingCamera({ ...editingCamera, name: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Xona raqami"
                value={editingCamera.roomNumber}
                onChange={(e) => setEditingCamera({ ...editingCamera, roomNumber: e.target.value })}
              />

              <Select
                label="Oqim holati"
                options={[
                  { value: 'Online', label: 'Online' },
                  { value: 'Live', label: 'Live' },
                  { value: 'Recording', label: 'Recording' },
                  { value: 'Preparing', label: 'Preparing' },
                  { value: 'Offline', label: 'Offline' },
                  { value: 'Stream Error', label: 'Stream Error' },
                ]}
                value={editingCamera.state}
                onChange={(e) => setEditingCamera({ ...editingCamera, state: e.target.value as any })}
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
          title="Kamerani o‘chirishni tasdiqlaysizmi?"
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
            Ushbu kamera signali tizimdan olib tashlanadi.
          </p>
        </Modal>
      )}
    </div>
  );
};
