import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  HelpCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithCredentials } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setError('Iltimos, elektron pochta va maxfiy parolni kiriting.');
      return;
    }

    setLoading(true);
    const res = await loginWithCredentials(cleanEmail, cleanPass);
    setLoading(false);

    if (!res.success) {
      setError(res.error || 'Elektron pochta yoki maxfiy parol noto‘g‘ri.');
      return;
    }

    // Role based navigation for successfully authenticated user
    const userRole = res.user?.role;
    let targetRoute = '/dashboard';
    if (userRole === 'supervisor') {
      targetRoute = '/supervisor/reviews';
    } else if (userRole === 'admin') {
      targetRoute = '/admin/faculties';
    }

    const redirectPath = (location.state as any)?.from?.pathname;
    if (redirectPath && redirectPath !== '/login') {
      navigate(redirectPath);
    } else {
      navigate(targetRoute);
    }
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
              Universitet psixologiya ta’lim platformasidagi hisobingizga kiring
            </p>
          </div>

          {/* Error alert with icon */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

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
                placeholder="masalan: madina.usmonova@psychoedu.uz"
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
                  placeholder="Parolni kiriting"
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
                disabled={loading}
                className="w-full bg-[#182321] hover:bg-[#253733] disabled:opacity-70 text-white font-sans font-medium text-sm py-3 rounded-xl shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{loading ? 'Tekshirilmoqda...' : 'Platformaga kirish'}</span>
              </button>
            </div>
          </form>

          {/* Bottom Sign up Link */}
          <div className="text-center mt-6 text-xs text-gray-500 font-light">
            <span>Profilingiz yo‘qmi? </span>
            <button
              type="button"
              onClick={() => navigate('/register')}
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
