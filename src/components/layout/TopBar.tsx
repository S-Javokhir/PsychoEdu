import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  Search, 
  LogOut, 
  User as UserIcon, 
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import { NotificationFlyout } from './NotificationFlyout';

interface TopBarProps {
  onToggleMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleMobileMenu }) => {
  const navigate = useNavigate();
  const { currentUser, role, logout, loginAs } = useAuth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/videos?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-surface border-b border-border-ui px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-sage-light"
          aria-label="Menyu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-72 lg:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Platformadan qidirish (videolar, keyslar, materiallar)..."
            className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-page border border-border-ui rounded-input text-text-main placeholder-text-soft focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-surface transition-all"
          />
        </form>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-sage-light relative transition-colors"
            aria-label="Xabarnomalar"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-600 ring-2 ring-surface" />
          </button>

          <NotificationFlyout
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-border-ui" />

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-sage-light transition-colors"
          >
            <Avatar src={currentUser.avatarUrl} name={currentUser.fullName} size="sm" />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-text-main leading-tight">
                {currentUser.fullName}
              </p>
              <p className="text-[11px] text-text-muted">
                {currentUser.roleLabel}
              </p>
            </div>
          </button>

          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsUserMenuOpen(false)}
              />
              <div className="absolute right-0 top-12 w-72 bg-surface border border-border-ui rounded-card shadow-dropdown z-50 p-2 divide-y divide-border-ui animate-page-enter">
                <div className="px-3 py-2.5">
                  <p className="text-xs font-bold text-text-main">{currentUser.fullName}</p>
                  <p className="text-[11px] text-text-muted truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1.5 text-[10px] font-medium bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                    {currentUser.roleLabel}
                  </span>
                </div>

                {/* Profile Links */}
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-text-main hover:bg-sage-light rounded-md transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-text-muted" />
                    <span>Mening profilim</span>
                  </button>

                  {role === 'admin' && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate('/admin/settings');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-text-main hover:bg-sage-light rounded-md transition-colors"
                    >
                      <Settings className="w-4 h-4 text-text-muted" />
                      <span>Tizim sozlamalari</span>
                    </button>
                  )}
                </div>

                {/* Quick Role Switcher Buttons */}
                <div className="py-1.5">
                  <p className="px-3 text-[10px] font-semibold tracking-wider text-text-soft uppercase mb-1">
                    Rolni almashtirish (Demo):
                  </p>
                  <div className="grid grid-cols-2 gap-1 px-1">
                    <button
                      type="button"
                      onClick={() => {
                        loginAs('student');
                        setIsUserMenuOpen(false);
                        navigate('/dashboard');
                      }}
                      className={`px-2 py-1.5 text-[11px] rounded text-left font-medium transition-colors ${
                        role === 'student' ? 'bg-deep-teal text-white font-bold' : 'hover:bg-sage-light text-text-main'
                      }`}
                    >
                      Talaba
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        loginAs('professor_psychologist');
                        setIsUserMenuOpen(false);
                        navigate('/dashboard');
                      }}
                      className={`px-2 py-1.5 text-[11px] rounded text-left font-medium transition-colors ${
                        role === 'professor_psychologist' ? 'bg-deep-teal text-white font-bold' : 'hover:bg-sage-light text-text-main'
                      }`}
                    >
                      Professor
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        loginAs('supervisor');
                        setIsUserMenuOpen(false);
                        navigate('/dashboard');
                      }}
                      className={`px-2 py-1.5 text-[11px] rounded text-left font-medium transition-colors ${
                        role === 'supervisor' ? 'bg-deep-teal text-white font-bold' : 'hover:bg-sage-light text-text-main'
                      }`}
                    >
                      Supervisor
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        loginAs('admin');
                        setIsUserMenuOpen(false);
                        navigate('/dashboard');
                      }}
                      className={`px-2 py-1.5 text-[11px] rounded text-left font-medium transition-colors ${
                        role === 'admin' ? 'bg-deep-teal text-white font-bold' : 'hover:bg-sage-light text-text-main'
                      }`}
                    >
                      Admin
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                      navigate('/', { replace: true });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Tizimdan chiqish</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
