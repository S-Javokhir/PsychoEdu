import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building, 
  Layers, 
  DoorOpen, 
  Camera, 
  Users, 
  UserCheck, 
  Video, 
  Radio, 
  ArrowRight,
  ShieldAlert,
  Server
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAdminData } from '../../context/AdminDataContext';
import { useProfessorData } from '../../context/ProfessorDataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatCard } from '../../components/domain/StatCard';
import { CameraStatusBadge } from '../../components/status/CameraStatusBadge';

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { faculties, departments, rooms, cameras, users, patients } = useAdminData();
  const { videos } = useProfessorData();
  const navigate = useNavigate();

  const professors = users.filter((u) => u.role === 'professor_psychologist');
  const students = users.filter((u) => u.role === 'student');
  const activeCameras = cameras.filter((c) => c.state === 'Online' || c.state === 'Live' || c.state === 'Recording');
  const liveSessionsCount = cameras.filter((c) => c.state === 'Live' || c.state === 'Recording').length;

  return (
    <div className="space-y-8">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-deep-teal via-teal-900 to-neutral-900 rounded-card p-6 sm:p-8 text-white shadow-card relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-xs text-sage mb-3 border border-white/10">
            <Server className="w-3.5 h-3.5 text-sage" />
            <span>Tizim Boshqaruvi va Infratuzilma • Administrator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Assalomu alaykum, {currentUser.fullName} 👋
          </h1>
          <p className="text-sm sm:text-base text-sage-light/90 leading-relaxed">
            Fakultetlar, xonalar, kuzatuv kameralari, professorlar, talabalar va ta’limiy kontentning markaziy boshqaruv paneli.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-deep-teal hover:bg-sage-light font-semibold shadow-sm"
              icon={<DoorOpen className="w-4 h-4 text-teal-800" />}
              onClick={() => navigate('/admin/rooms')}
            >
              Xonalarni boshqarish
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              icon={<Camera className="w-4 h-4" />}
              onClick={() => navigate('/admin/cameras')}
            >
              Kameralar holati
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              icon={<UserCheck className="w-4 h-4" />}
              onClick={() => navigate('/admin/users/professors')}
            >
              Professorlar
            </Button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none transform translate-x-8" />
      </div>

      {/* Admin Clean Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Professorlar"
          value={professors.length}
          subtext="Psixolog mutaxassislar"
          icon={<UserCheck className="w-4 h-4 text-teal-700" />}
          iconBg="bg-teal-50"
        />

        <StatCard
          title="Talabalar"
          value={students.length}
          subtext="Faol tahsil oluvchilar"
          icon={<Users className="w-4 h-4 text-blue-700" />}
          iconBg="bg-blue-50"
        />

        <StatCard
          title="Faol Kameralar"
          value={`${activeCameras.length}/${cameras.length}`}
          subtext="Infratuzilma signali"
          icon={<Camera className="w-4 h-4 text-emerald-700" />}
          iconBg="bg-emerald-50"
        />

        <StatCard
          title="Live Sessiyalar"
          value={liveSessionsCount}
          subtext="Jonli efirda"
          icon={<Radio className="w-4 h-4 text-rose-600" />}
          iconBg="bg-rose-50"
        />

        <StatCard
          title="Video Arxiv"
          value={videos.length}
          subtext="O‘quv yozuvlari"
          icon={<Video className="w-4 h-4 text-teal-800" />}
          iconBg="bg-sage-light"
        />

        <StatCard
          title="Anonim Bemorlar"
          value={patients.length}
          subtext="Shifrlangan profillar"
          icon={<ShieldAlert className="w-4 h-4 text-amber-700" />}
          iconBg="bg-amber-50"
        />
      </div>

      {/* Infrastructure & Rooms Overview Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Rooms & Cameras Operational Status */}
        <Card padded="lg" className="space-y-4 border-border-ui">
          <div className="flex items-center justify-between border-b border-border-ui pb-3">
            <div>
              <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                <DoorOpen className="w-4 h-4 text-deep-teal" />
                <span>Xonalar va Infratuzilma Holati</span>
              </h3>
              <p className="text-xs text-text-muted">Amaliy konsultatsiya va laboratoriya xonalari</p>
            </div>
            <Link to="/admin/rooms" className="text-xs font-semibold text-deep-teal hover:underline flex items-center gap-1">
              <span>Barchasi ({rooms.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {rooms.slice(0, 4).map((room) => (
              <div
                key={room.id}
                className="p-3 bg-page rounded-xl border border-border-ui flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-main">{room.roomNumber}</span>
                    <span className="text-text-muted">— {room.name}</span>
                  </div>
                  <p className="text-text-soft text-[11px] mt-0.5">{room.purpose}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-text-muted bg-surface px-2 py-0.5 rounded border border-border-ui">
                    {room.cameraCount} ta kamera
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-medium text-[11px] ${
                    room.status === 'Faol'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : room.status === 'Bo‘sh'
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {room.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Cameras Live Signal Status */}
        <Card padded="lg" className="space-y-4 border-border-ui">
          <div className="flex items-center justify-between border-b border-border-ui pb-3">
            <div>
              <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                <Camera className="w-4 h-4 text-deep-teal" />
                <span>Kameralar va Video Oqimlar</span>
              </h3>
              <p className="text-xs text-text-muted">Kuzatuv apparatlari signallari</p>
            </div>
            <Link to="/admin/cameras" className="text-xs font-semibold text-deep-teal hover:underline flex items-center gap-1">
              <span>Kameralar ({cameras.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {cameras.slice(0, 4).map((cam) => (
              <div
                key={cam.id}
                className="p-3 bg-page rounded-xl border border-border-ui flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <p className="font-semibold text-text-main">{cam.roomNumber} — {cam.name}</p>
                  <p className="text-text-muted font-mono text-[11px] mt-0.5">{cam.resolution} • {cam.fps}fps</p>
                </div>
                <CameraStatusBadge state={cam.state} size="sm" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Organization quick cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/admin/faculties" className="block group">
          <Card padded="md" className="group-hover:border-teal-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-200">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-main group-hover:text-deep-teal">Fakultetlar ({faculties.length})</h4>
                <p className="text-xs text-text-muted">Tashkiliy struktura</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/admin/departments" className="block group">
          <Card padded="md" className="group-hover:border-teal-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-200">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-main group-hover:text-deep-teal">Kafedralar ({departments.length})</h4>
                <p className="text-xs text-text-muted">O‘quv kafedralari</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/admin/patients" className="block group">
          <Card padded="md" className="group-hover:border-teal-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-200">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-main group-hover:text-deep-teal">Bemorlar Bazasi ({patients.length})</h4>
                <p className="text-xs text-text-muted">To‘liq anonimlashtirilgan</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};
