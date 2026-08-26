import React, { useState, useMemo } from 'react';
import { 
  DoorOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Camera
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import type { Room } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { EmptyState } from '../../components/common/EmptyState';

export const Rooms: React.FC = () => {
  const { rooms, addRoom, updateRoom, deleteRoom } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [roomNumber, setRoomNumber] = useState('');
  const [name, setName] = useState('');
  const [floor, setFloor] = useState(2);
  const [faculty] = useState('Psixologiya fakulteti');
  const [department] = useState('Klinik va amaliy psixologiya kafedrasi');
  const [purpose, setPurpose] = useState('Individual konsultatsiya va KBT seanslari');
  const [cameraCount, setCameraCount] = useState(2);
  const [status, setStatus] = useState<'Faol' | 'Band' | 'Bo‘sh' | 'Texnik xizmat'>('Bo‘sh');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      const matchSearch =
        searchQuery === '' ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.purpose.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = selectedStatus === 'all' || r.status === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [rooms, searchQuery, selectedStatus]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addRoom({
      roomNumber: roomNumber || '205-xona',
      name: name || 'Amaliy konsultatsiya xonasi',
      floor: Number(floor) || 2,
      faculty,
      department,
      purpose,
      cameraCount: Number(cameraCount) || 1,
      status,
    });

    setIsAddModalOpen(false);
    showToast('Xona muvaffaqiyatli qo‘shildi!');
    setRoomNumber('');
    setName('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;

    updateRoom(editingRoom.id, {
      roomNumber: editingRoom.roomNumber,
      name: editingRoom.name,
      floor: Number(editingRoom.floor),
      purpose: editingRoom.purpose,
      cameraCount: Number(editingRoom.cameraCount),
      status: editingRoom.status,
    });

    setEditingRoom(null);
    showToast('Xona ma’lumotlari yangilandi!');
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      deleteRoom(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast('Xona o‘chirildi.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Konsultatsiya va Amaliyot Xonalari"
        description="Psixologik seanslar, guruh mashg‘ulotlari va diagnostika xonalarining infratuzilmasi"
        breadcrumbs={[
          { label: 'Infratuzilma' },
          { label: 'Xonalar' }
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Xona qo‘shish
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
            placeholder="Xona raqami, nomi yoki kafedrasi bo‘yicha qidiruv..."
          />
        </div>

        <div className="w-full sm:w-60">
          <Select
            options={[
              { value: 'all', label: 'Barcha holatlar' },
              { value: 'Faol', label: 'Faol (Seans ketmoqda)' },
              { value: 'Bo‘sh', label: 'Bo‘sh (Tayyor)' },
              { value: 'Band', label: 'Band' },
              { value: 'Texnik xizmat', label: 'Texnik xizmat' },
            ]}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          />
        </div>
      </div>

      {/* Rooms Table */}
      {filteredRooms.length === 0 ? (
        <EmptyState
          icon={<DoorOpen className="w-6 h-6 text-text-muted" />}
          title="Xonalar topilmadi"
          description="Kiritilgan parametrlar bo‘yicha xona mavjud emas."
          actionLabel="Yangi xona qo‘shish"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <Card padded="none" className="overflow-hidden border-border-ui shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page border-b border-border-ui text-text-muted font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Xona raqami va Nomi</th>
                  <th className="py-3.5 px-4">Qavat</th>
                  <th className="py-3.5 px-4">Kafedra</th>
                  <th className="py-3.5 px-4">Asosiy vazifasi</th>
                  <th className="py-3.5 px-4">Kameralar</th>
                  <th className="py-3.5 px-4">Holat</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ui bg-surface">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-page/50 transition-colors">
                    <td className="py-3.5 px-4 min-w-[200px]">
                      <div>
                        <span className="font-bold text-text-main text-xs sm:text-sm block">
                          {room.roomNumber}
                        </span>
                        <span className="text-[11px] text-text-muted">
                          {room.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-text-main font-mono">
                      {room.floor}-qavat
                    </td>

                    <td className="py-3.5 px-4 text-text-muted max-w-[200px] truncate">
                      {room.department}
                    </td>

                    <td className="py-3.5 px-4 text-text-main font-medium">
                      {room.purpose}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 bg-page px-2 py-0.5 rounded border border-border-ui font-mono font-medium text-teal-900">
                        <Camera className="w-3 h-3 text-teal-700" />
                        {room.cameraCount} ta
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full font-semibold text-[11px] border ${
                        room.status === 'Faol'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : room.status === 'Bo‘sh'
                          ? 'bg-teal-50 text-teal-800 border border-teal-200'
                          : room.status === 'Band'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {room.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingRoom(room)}
                          className="p-1.5 text-text-muted hover:text-deep-teal rounded-md hover:bg-sage-light transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(room.id)}
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

      {/* Add Room Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Yangi xona qo‘shish"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Xonani saqlash
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Xona raqami*"
                placeholder="Masalan: 205-xona"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />

              <Input
                label="Qavat"
                type="number"
                value={floor}
                onChange={(e) => setFloor(Number(e.target.value))}
              />
            </div>

            <Input
              label="Xona nomi*"
              placeholder="Konsultatsiya xonasi C"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Asosiy vazifasi*"
              placeholder="Individual va oilaviy konsultatsiyalar"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Kameralar soni"
                type="number"
                value={cameraCount}
                onChange={(e) => setCameraCount(Number(e.target.value))}
              />

              <Select
                label="Dastlabki holat"
                options={[
                  { value: 'Bo‘sh', label: 'Bo‘sh (Tayyor)' },
                  { value: 'Faol', label: 'Faol' },
                  { value: 'Texnik xizmat', label: 'Texnik xizmat' },
                ]}
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Room Modal */}
      {editingRoom && (
        <Modal
          isOpen={!!editingRoom}
          onClose={() => setEditingRoom(null)}
          title="Xona ma’lumotlarini tahrirlash"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingRoom(null)}>
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
                label="Xona raqami*"
                value={editingRoom.roomNumber}
                onChange={(e) => setEditingRoom({ ...editingRoom, roomNumber: e.target.value })}
                required
              />

              <Input
                label="Qavat"
                type="number"
                value={editingRoom.floor}
                onChange={(e) => setEditingRoom({ ...editingRoom, floor: Number(e.target.value) })}
              />
            </div>

            <Input
              label="Xona nomi*"
              value={editingRoom.name}
              onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
              required
            />

            <Input
              label="Asosiy vazifasi*"
              value={editingRoom.purpose}
              onChange={(e) => setEditingRoom({ ...editingRoom, purpose: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Kameralar soni"
                type="number"
                value={editingRoom.cameraCount}
                onChange={(e) => setEditingRoom({ ...editingRoom, cameraCount: Number(e.target.value) })}
              />

              <Select
                label="Holat"
                options={[
                  { value: 'Faol', label: 'Faol' },
                  { value: 'Bo‘sh', label: 'Bo‘sh' },
                  { value: 'Band', label: 'Band' },
                  { value: 'Texnik xizmat', label: 'Texnik xizmat' },
                ]}
                value={editingRoom.status}
                onChange={(e) => setEditingRoom({ ...editingRoom, status: e.target.value as any })}
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
          title="Xonani o‘chirishni tasdiqlaysizmi?"
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
            Ushbu xonani o‘chirishni tasdiqlaysizmi?
          </p>
        </Modal>
      )}
    </div>
  );
};
