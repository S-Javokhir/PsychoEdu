import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  User, 
  BookOpen, 
  CheckCircle2, 
  Settings,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAs } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('madina.usmonova@psychoedu.uz');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const roleProfiles: Record<UserRole, { name: string; email: string; title: string }> = {
    student: {
      name: 'Madina Usmonova',
      email: 'madina.usmonova@psychoedu.uz',
      title: 'Talaba',
    },
    professor_psychologist: {
      name: 'Prof. Dilorom Karimova',
      email: 'dilorom.karimova@psychoedu.uz',
      title: 'Professor',
    },
    supervisor: {
      name: 'Dr. Nigora Toirova',
      email: 'nigora.toirova@psychoedu.uz',
      title: 'Supervisor',
    },
    admin: {
      name: 'Azamat Shokirov',
      email: 'azamat.admin@psychoedu.uz',
      title: 'Admin',
    },
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(roleProfiles[role].email);
  };

  const handleQuickLogin = (role: UserRole) => {
    loginAs(role);
    const targetPath = (location.state as any)?.from?.pathname;
    if (targetPath && targetPath !== '/login') {
      navigate(targetPath);
    } else {
      if (role === 'supervisor') {
        navigate('/supervisor/reviews');
      } else if (role === 'admin') {
        navigate('/admin/faculties');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuickLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#DDEAE5] selection:text-[#182321]">
      
      {/* 1. Top Navigation Bar */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
        {/* Left: Back button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
          <span>Orqaga</span>
        </button>

        {/* Center: Brand Logo */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-[#182321] text-white flex items-center justify-center shadow-sm">
            <GraduationCap className="w-4 h-4 text-[#DDEAE5]" />
          </div>
          <span className="font-serif font-bold text-xl text-[#182321] tracking-tight">
            PsychoEdu
          </span>
        </div>

        {/* Right: Contact support */}
        <a
          href="#faq"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:inline-flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <span>Qo‘llab-quvvatlash</span>
        </a>
      </header>

      {/* 2. Floating Center Form Card */}
      <main className="relative z-20 flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white border border-gray-100/80 rounded-[32px] shadow-[0_25px_60px_-15px_rgba(20,42,37,0.12)] p-8 sm:p-10 max-w-[430px] w-full mx-auto animate-page-enter">
          
          {/* Card Title & Subtitle */}
          <div className="mb-6">
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#182321] tracking-tight">
              PsychoEdu tizimiga kirish
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-sans mt-1.5 font-light">
              Amaliy psixologiya faoliyatingiz shu yerdan boshlanadi
            </p>
          </div>

          {/* 4 Role Quick-Switching Buttons */}
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            {/* Student Role */}
            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              title="Talaba sifatida kirish"
              className={`h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                selectedRole === 'student'
                  ? 'border-gray-900 bg-gray-50 text-gray-900 shadow-sm ring-1 ring-gray-900'
                  : 'border-gray-200 hover:border-gray-400 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4" />
            </button>

            {/* Professor Role */}
            <button
              type="button"
              onClick={() => handleRoleSelect('professor_psychologist')}
              title="Professor / Psixolog sifatida kirish"
              className={`h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                selectedRole === 'professor_psychologist'
                  ? 'border-gray-900 bg-gray-50 text-gray-900 shadow-sm ring-1 ring-gray-900'
                  : 'border-gray-200 hover:border-gray-400 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
            </button>

            {/* Supervisor Role */}
            <button
              type="button"
              onClick={() => handleRoleSelect('supervisor')}
              title="Supervisor sifatida kirish"
              className={`h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                selectedRole === 'supervisor'
                  ? 'border-gray-900 bg-gray-50 text-gray-900 shadow-sm ring-1 ring-gray-900'
                  : 'border-gray-200 hover:border-gray-400 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>

            {/* Admin Role */}
            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              title="Administrator sifatida kirish"
              className={`h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                selectedRole === 'admin'
                  ? 'border-gray-900 bg-gray-50 text-gray-900 shadow-sm ring-1 ring-gray-900'
                  : 'border-gray-200 hover:border-gray-400 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Active Role Label */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4 px-1">
            <span>Tanlangan profil:</span>
            <span className="font-semibold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {roleProfiles[selectedRole].title} ({roleProfiles[selectedRole].name.split(' ')[0]})
            </span>
          </div>

          {/* Divider with 'yoki' */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-xs text-gray-400 font-sans font-light">
              yoki
            </span>
            <div className="border-t border-gray-200 w-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Elektron pochta manzili
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nomi@psychoedu.uz"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-400 bg-white transition-all outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Maxfiy parol
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parol"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-400 bg-white transition-all outline-none font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#182321] hover:bg-[#253733] text-white font-sans font-medium text-sm py-3 rounded-xl shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer"
              >
                Platformaga kirish
              </button>
            </div>
          </form>

          {/* Bottom Sign up Link */}
          <div className="text-center mt-6 text-xs text-gray-500 font-light">
            <span>Profilingiz yo‘qmi? </span>
            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              className="font-semibold text-gray-900 hover:underline cursor-pointer"
            >
              Ro‘yxatdan o‘tish
            </button>
          </div>

        </div>
      </main>

      {/* 3. Bottom Botanical Watercolor Landscape Artwork */}
      <div className="relative w-full h-44 sm:h-64 lg:h-80 overflow-hidden pointer-events-none mt-auto">
        <img
          src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1800&auto=format&fit=crop&q=80"
          alt="Serene Green Botanical Pine Landscape"
          className="w-full h-full object-cover object-bottom opacity-85"
        />
        {/* Soft fade-in gradient from top */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#F8FAF9]/40 to-[#F8FAF9]" />
      </div>

    </div>
  );
};
