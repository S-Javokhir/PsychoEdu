import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [facultyOrGroup, setFacultyOrGroup] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const roleLabels: Record<UserRole, { title: string; subtitle: string; placeholderGroup: string }> = {
    student: {
      title: 'Talaba',
      subtitle: 'Amaliy mashg‘ulotlar va darslar',
      placeholderGroup: 'Masalan: Psixologiya fakulteti, 302-guruh',
    },
    professor_psychologist: {
      title: 'Professor / Psixolog',
      subtitle: 'Kafedra professor-o‘qituvchisi',
      placeholderGroup: 'Masalan: Klinik psixologiya kafedrasi',
    },
    supervisor: {
      title: 'Supervisor',
      subtitle: 'Kafedra bosh supervizori',
      placeholderGroup: 'Masalan: Superviziya va ekspertiza markazi',
    },
    admin: {
      title: 'Administrator',
      subtitle: 'Tizim va tashkiliy boshqaruv',
      placeholderGroup: 'Masalan: Universitet AKT departamenti',
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Iltimos, to‘liq ismingizni kiriting');
      return;
    }

    if (!email.trim()) {
      setError('Iltimos, elektron pochta manzilingizni kiriting');
      return;
    }

    if (password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo‘lishi kerak');
      return;
    }

    if (password !== confirmPassword) {
      setError('Kiritilgan parollar mos kelmadi');
      return;
    }

    if (!agreeTerms) {
      setError('Iltimos, foydalanish shartlariga rozilik bildiring');
      return;
    }

    // Register user in auth context
    registerUser({
      fullName: fullName.trim(),
      email: email.trim(),
      password: password.trim(),
      role: selectedRole,
      facultyOrGroup: facultyOrGroup.trim(),
    });

    // Navigate to appropriate dashboard
    if (selectedRole === 'supervisor') {
      navigate('/supervisor/reviews');
    } else if (selectedRole === 'admin') {
      navigate('/admin/faculties');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#DDEAE5] selection:text-[#182321]">
      
      {/* 1. Top Navigation Bar (Consistent with Login) */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
        {/* Left: Back to Login button */}
        <button
          type="button"
          onClick={() => navigate('/login')}
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

      {/* 2. Floating Center Registration Card */}
      <main className="relative z-20 flex-1 flex items-center justify-center px-4 py-6">
        <div className="bg-white border border-gray-100/80 rounded-[32px] shadow-[0_25px_60px_-15px_rgba(20,42,37,0.12)] p-8 sm:p-10 max-w-[460px] w-full mx-auto animate-page-enter">
          
          {/* Card Title & Subtitle */}
          <div className="mb-6">
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#182321] tracking-tight">
              Ro‘yxatdan o‘tish
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-sans mt-1.5 font-light">
              Universitet psixologiya ta’lim platformasida yangi hisob yarating
            </p>
          </div>

          {/* 4 Role Selection Buttons */}
          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {/* Student Role */}
            <button
              type="button"
              onClick={() => setSelectedRole('student')}
              title="Talaba maqomi"
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
              onClick={() => setSelectedRole('professor_psychologist')}
              title="Professor / Psixolog maqomi"
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
              onClick={() => setSelectedRole('supervisor')}
              title="Supervisor maqomi"
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
              onClick={() => setSelectedRole('admin')}
              title="Administrator maqomi"
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
            <span>Tanlangan maqom:</span>
            <span className="font-semibold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {roleLabels[selectedRole].title}
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                F.I.SH (To‘liq ism)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Masalan: Sardor Rustamov"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-400 bg-white transition-all outline-none"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
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

            {/* Faculty / Department / Group */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Fakultet / Kafedra yoki Guruh
              </label>
              <input
                type="text"
                value={facultyOrGroup}
                onChange={(e) => setFacultyOrGroup(e.target.value)}
                placeholder={roleLabels[selectedRole].placeholderGroup}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-400 bg-white transition-all outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Maxfiy parol
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kamida 6 ta belgi"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-400 bg-white transition-all outline-none"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Parolni tasdiqlash
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Parolni qayta kiriting"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-400 bg-white transition-all outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  aria-label={showConfirmPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Agreement checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#182321] focus:ring-0 cursor-pointer accent-[#182321]"
                />
                <span className="leading-snug">
                  Foydalanish qoidalari va talabalar uchun akademik maxfiylik mezonlariga roziman
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#182321] hover:bg-[#253733] text-white font-sans font-medium text-sm py-3 rounded-xl shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer"
              >
                Ro‘yxatdan o‘tish
              </button>
            </div>
          </form>

          {/* Back to Login Link */}
          <div className="text-center mt-6 text-xs text-gray-500 font-light">
            <span>Hisobingiz bormi? </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-semibold text-gray-900 hover:underline cursor-pointer"
            >
              Tizimga kirish
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
