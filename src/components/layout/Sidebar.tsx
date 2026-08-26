import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Radio, 
  Video, 
  FileText, 
  FolderGit2, 
  User, 
  X,
  GraduationCap,
  CalendarCheck,
  Disc,
  CheckCircle2,
  Building,
  Layers,
  DoorOpen,
  Camera,
  Users,
  UserCheck,
  ShieldCheck,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentUser, role } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-out active:scale-[0.98] ${
      isActive
        ? 'bg-deep-teal text-white shadow-subtle font-semibold translate-x-0.5'
        : 'text-text-muted hover:text-text-main hover:bg-sage-light hover:translate-x-0.5'
    }`;

  const getSubtext = () => {
    switch (role) {
      case 'student': return 'Amaliy Psixologiya';
      case 'professor_psychologist': return 'Professor / Psixolog';
      case 'supervisor': return 'Kafedra Supervizori';
      case 'admin': return 'Tizim Administratori';
      default: return 'PsychoEdu';
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-text-main/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[260px] bg-surface border-r border-border-ui flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding */}
        <div>
          <div className="h-16 px-5 border-b border-border-ui flex items-center justify-between">
            <NavLink to="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
              <div className="w-8 h-8 rounded-lg bg-deep-teal flex items-center justify-center text-sage">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-deep-teal block leading-tight">
                  PsychoEdu
                </span>
                <span className="text-[10px] text-text-muted tracking-wide font-medium uppercase">
                  {getSubtext()}
                </span>
              </div>
            </NavLink>

            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 text-text-muted hover:text-text-main rounded-md hover:bg-sage-light"
              aria-label="Menyuni yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3.5 space-y-5 overflow-y-auto max-h-[calc(100vh-140px)]">
            {/* Dashboard Link */}
            <div>
              <div className="space-y-1">
                <NavLink to="/dashboard" className={navLinkClass} onClick={onClose}>
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span>Dashboard</span>
                </NavLink>
              </div>
            </div>

            {/* 1. SUPERVISOR NAVIGATION */}
            {role === 'supervisor' && (
              <>
                <div>
                  <p className="px-3 text-[11px] font-semibold tracking-wider text-text-soft uppercase mb-2">
                    Superviziya
                  </p>
                  <div className="space-y-1">
                    <NavLink to="/supervisor/reviews" className={navLinkClass} onClick={onClose}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
                      <div className="flex-1 flex items-center justify-between">
                        <span>Review Center</span>
                        <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.2 rounded border border-blue-200">
                          Ekspertiza
                        </span>
                      </div>
                    </NavLink>
                  </div>
                </div>

                <div>
                  <p className="px-3 text-[11px] font-semibold tracking-wider text-text-soft uppercase mb-2">
                    Ta’limiy Resurslar
                  </p>
                  <div className="space-y-1">
                    <NavLink to="/videos" className={navLinkClass} onClick={onClose}>
                      <Video className="w-4 h-4 shrink-0" />
                      <span>Video Library</span>
                    </NavLink>
                    <NavLink to="/materials" className={navLinkClass} onClick={onClose}>
                      <FileText className="w-4 h-4 shrink-0" />
                      <span>Materiallar</span>
                    </NavLink>
                    <NavLink to="/cases" className={navLinkClass} onClick={onClose}>
                      <FolderGit2 className="w-4 h-4 shrink-0" />
                      <span>Keyslar</span>
                    </NavLink>
                  </div>
                </div>
              </>
            )}

            {/* 2. ADMIN NAVIGATION */}
            {role === 'admin' && (
              <>
                {/* Tashkilot */}
                <div>
                  <p className="px-3 text-[11px] font-semibold tracking-wider text-text-soft uppercase mb-2">
                    Tashkilot
                  </p>
                  <div className="space-y-1">
                    <NavLink to="/admin/faculties" className={navLinkClass} onClick={onClose}>
                      <Building className="w-4 h-4 shrink-0" />
                      <span>Fakultetlar</span>
                    </NavLink>
                    <NavLink to="/admin/departments" className={navLinkClass} onClick={onClose}>
                      <Layers className="w-4 h-4 shrink-0" />
                      <span>Kafedralar</span>
                    </NavLink>
                  </div>
                </div>

                {/* Infratuzilma */}
                <div>
                  <p className="px-3 text-[11px] font-semibold tracking-wider text-text-soft uppercase mb-2">
                    Infratuzilma
                  </p>
                  <div className="space-y-1">
                    <NavLink to="/admin/rooms" className={navLinkClass} onClick={onClose}>
                      <DoorOpen className="w-4 h-4 shrink-0" />
                      <span>Xonalar</span>
                    </NavLink>
                    <NavLink to="/admin/cameras" className={navLinkClass} onClick={onClose}>
                      <Camera className="w-4 h-4 shrink-0" />
                      <span>Kameralar</span>
                    </NavLink>
                  </div>
                </div>

                {/* Foydalanuvchilar */}
                <div>
                  <p className="px-3 text-[11px] font-semibold tracking-wider text-text-soft uppercase mb-2">
                    Foydalanuvchilar
                  </p>
                  <div className="space-y-1">
                    <NavLink to="/admin/users/professors" className={navLinkClass} onClick={onClose}>
                      <UserCheck className="w-4 h-4 shrink-0" />
                      <span>Professorlar</span>
                    </NavLink>
                    <NavLink to="/admin/users/students" className={navLinkClass} onClick={onClose}>
                      <Users className="w-4 h-4 shrink-0" />
                      <span>Talabalar</span>
                    </NavLink>
                    <NavLink to="/admin/users/supervisors" className={navLinkClass} onClick={onClose}>
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Supervisorlar</span>
                    </NavLink>
                    <NavLink to="/admin/patients" className={navLinkClass} onClick={onClose}>
                      <ShieldAlert className="w-4 h-4 shrink-0 text-teal-700" />
                      <div className="flex-1 flex items-center justify-between">
                        <span>Bemorlar</span>
                        <span className="text-[10px] bg-teal-50 text-teal-800 font-mono font-bold px-1.5 py-0.2 rounded border border-teal-200">
                          Anonim
                        </span>
                      </div>
                    </NavLink>
                  </div>
                </div>

                {/* Kontent */}
                <div>
                  <p className="px-3 text-[11px] font-semibold tracking-wider text-text-soft uppercase mb-2">
                    Kontent
                  </p>
                  <div className="space-y-1">
                    <NavLink to="/admin/videos" className={navLinkClass} onClick={onClose}>
                      <Video className="w-4 h-4 shrink-0" />
                      <span>Videolar</span>
                    </NavLink>
                    <NavLink to="/admin/materials" className={navLinkClass} onClick={onClose}>
                      <FileText className="w-4 h-4 shrink-0" />
                      <span>Materiallar</span>
                    </NavLink>
                    <NavLink to="/admin/cases" className={navLinkClass} onClick={onClose}>
                      <FolderGit2 className="w-4 h-4 shrink-0" />
                      <span>Keyslar</span>
                    </NavLink>
                  </div>
                </div>

                {/* Sozlamalar */}
                <div>
                  <p className="px-3 text-[11px] font-semibold tracking-wider text-text-soft uppercase mb-2">
                    Tizim
                  </p>
                  <div className="space-y-1">
                    <NavLink to="/admin/settings" className={navLinkClass} onClick={onClose}>
                      <Settings className="w-4 h-4 shrink-0" />
                      <span>Sozlamalar</span>
                    </NavLink>
                  </div>
                </div>
              </>
            )}

            {/* 3. PROFESSOR NAVIGATION */}
            {role === 'professor_psychologist' && (
              <>
                <div>
                  <p className="px-3 text-[11px] font-semibold tracking-wider text-text-soft uppercase mb-2">
                    Amaliyot
                  </p>
                  <div className="space-y-1">
                    <NavLink to="/live" className={navLinkClass} onClick={onClose}>
                      <Radio className="w-4 h-4 shrink-0 text-emerald-600" />
                      <div className="flex-1 flex items-center justify-between">
                        <span>Live Monitoring</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                    </NavLink>

                    <NavLink to="/professor/sessions" className={navLinkClass} onClick={onClose}>
                      <CalendarCheck className="w-4 h-4 shrink-0" />
                      <span>Mening seanslarim</span>
                    </NavLink>

                    <NavLink to="/professor/recording" className={navLinkClass} onClick={onClose}>
                      <Disc className="w-4 h-4 shrink-0 text-rose-500" />
                      <div className="flex-1 flex items-center justify-between">
                        <span>Recording</span>
                        <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-1.5 py-0.2 rounded border border-rose-200">
                          REC
                        </span>
                      </div>
                    </NavLink>
                  </div>
                </div>

                <div>
                  <p className="px-3 text-[11px] font-semibold tracking-wider text-text-soft uppercase mb-2">
                    Ta’lim
                  </p>
                  <div className="space-y-1">
                    <NavLink to="/professor/videos" className={navLinkClass} onClick={onClose}>
                      <Video className="w-4 h-4 shrink-0" />
                      <span>Video Library</span>
                    </NavLink>

                    <NavLink to="/professor/materials" className={navLinkClass} onClick={onClose}>
                      <FileText className="w-4 h-4 shrink-0" />
                      <span>Materiallar</span>
                    </NavLink>

                    <NavLink to="/professor/cases" className={navLinkClass} onClick={onClose}>
                      <FolderGit2 className="w-4 h-4 shrink-0" />
                      <span>Keyslar</span>
                    </NavLink>
                  </div>
                </div>
              </>
            )}

            {/* 4. STUDENT NAVIGATION */}
            {role === 'student' && (
              <div>
                <p className="px-3 text-[11px] font-semibold tracking-wider text-text-soft uppercase mb-2">
                  O‘rganish
                </p>
                <div className="space-y-1">
                  <NavLink to="/live" className={navLinkClass} onClick={onClose}>
                    <Radio className="w-4 h-4 shrink-0" />
                    <div className="flex-1 flex items-center justify-between">
                      <span>Live Monitoring</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  </NavLink>

                  <NavLink to="/videos" className={navLinkClass} onClick={onClose}>
                    <Video className="w-4 h-4 shrink-0" />
                    <span>Video Library</span>
                  </NavLink>

                  <NavLink to="/materials" className={navLinkClass} onClick={onClose}>
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Materiallar</span>
                  </NavLink>

                  <NavLink to="/cases" className={navLinkClass} onClick={onClose}>
                    <FolderGit2 className="w-4 h-4 shrink-0" />
                    <span>Keyslar</span>
                  </NavLink>
                </div>
              </div>
            )}

            {/* Shaxsiy Section */}
            <div>
              <p className="px-3 text-[11px] font-semibold tracking-wider text-text-soft uppercase mb-2">
                Shaxsiy
              </p>
              <div className="space-y-1">
                <NavLink to="/profile" className={navLinkClass} onClick={onClose}>
                  <User className="w-4 h-4 shrink-0" />
                  <span>Profil</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* User Card Bottom */}
        <div className="p-3.5 border-t border-border-ui bg-page/60">
          <NavLink
            to="/profile"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface border border-transparent hover:border-border-ui transition-all"
            onClick={onClose}
          >
            <Avatar src={currentUser.avatarUrl} name={currentUser.fullName} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-text-main truncate">
                {currentUser.fullName}
              </p>
              <p className="text-[11px] text-text-muted truncate">
                {currentUser.roleLabel}
              </p>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
