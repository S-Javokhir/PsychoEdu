import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../types';
import { 
  currentStudentUser, 
  currentProfessorUser, 
  currentSupervisorUser, 
  currentAdminUser 
} from '../data/users';
import { api, ApiError } from '../services/api';

interface AuthContextType {
  currentUser: User;
  role: UserRole;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  loginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  registerUser: (userData: { fullName: string; email: string; password?: string; role: UserRole; facultyOrGroup?: string }) => void;
  logout: () => void;
  switchRole: () => void;
}

const SYSTEM_ACCOUNTS = [
  {
    email: 'madina.usmonova@psychoedu.uz',
    password: 'password123',
    role: 'student' as UserRole,
    user: currentStudentUser,
  },
  {
    email: 'dilorom.karimova@psychoedu.uz',
    password: 'password123',
    role: 'professor_psychologist' as UserRole,
    user: currentProfessorUser,
  },
  {
    email: 'nigora.toirova@psychoedu.uz',
    password: 'password123',
    role: 'supervisor' as UserRole,
    user: currentSupervisorUser,
  },
  {
    email: 'azamat.admin@psychoedu.uz',
    password: 'password123',
    role: 'admin' as UserRole,
    user: currentAdminUser,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('psychoedu_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('psychoedu_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return currentStudentUser;
      }
    }
    return currentStudentUser;
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('psychoedu_auth', 'true');
      localStorage.setItem('psychoedu_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('psychoedu_auth');
    }
  }, [currentUser, isAuthenticated]);

  const loginAs = (role: UserRole) => {
    switch (role) {
      case 'student':
        setCurrentUser(currentStudentUser);
        break;
      case 'professor_psychologist':
        setCurrentUser(currentProfessorUser);
        break;
      case 'supervisor':
        setCurrentUser(currentSupervisorUser);
        break;
      case 'admin':
        setCurrentUser(currentAdminUser);
        break;
      default:
        setCurrentUser(currentStudentUser);
    }
    setIsAuthenticated(true);
    localStorage.setItem('psychoedu_auth', 'true');
    // Synchronize JWT with backend
    api.auth.quickLogin(role).catch(() => {});
  };

  const loginWithCredentials = async (emailInput: string, passwordInput: string) => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: 'Elektron pochta va maxfiy parolni kiriting.' };
    }

    // 1. Try Backend API first if running
    try {
      const apiRes = await api.auth.login(cleanEmail, cleanPass);
      if (apiRes?.user && apiRes?.accessToken) {
        let baseUser = currentStudentUser;
        const resRole = (apiRes.user.role || '').toLowerCase();
        if (resRole.includes('professor')) baseUser = currentProfessorUser;
        else if (resRole.includes('supervisor')) baseUser = currentSupervisorUser;
        else if (resRole.includes('admin')) baseUser = currentAdminUser;

        const authenticatedUser: User = {
          ...baseUser,
          id: apiRes.user.id || baseUser.id,
          fullName: apiRes.user.fullName || baseUser.fullName,
          email: apiRes.user.email || baseUser.email,
          role: baseUser.role,
          roleLabel: baseUser.roleLabel,
        };

        setCurrentUser(authenticatedUser);
        setIsAuthenticated(true);
        localStorage.setItem('psychoedu_auth', 'true');
        localStorage.setItem('psychoedu_user', JSON.stringify(authenticatedUser));
        return { success: true, user: authenticatedUser };
      }
    } catch (err: any) {
      // If backend responded with an error (e.g. 401 Unauthorized, 400 Bad Request)
      if (err instanceof ApiError) {
        return {
          success: false,
          error: err.message || 'Elektron pochta yoki maxfiy parol noto‘g‘ri.',
        };
      }
      // If network failed / server offline, fall through to strict local credentials check
    }

    // 2. Strict verification against registered accounts
    const storedAccountsRaw = localStorage.getItem('psychoedu_registered_accounts');
    let registeredAccounts: any[] = [];
    if (storedAccountsRaw) {
      try {
        registeredAccounts = JSON.parse(storedAccountsRaw);
      } catch {}
    }

    const allAccounts = [...SYSTEM_ACCOUNTS, ...registeredAccounts];
    const matched = allAccounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

    if (!matched) {
      return {
        success: false,
        error: 'Ushbu elektron pochta manzili bilan foydalanuvchi topilmadi.',
      };
    }

    if (matched.password !== cleanPass) {
      return {
        success: false,
        error: 'Kiritilgan maxfiy parol noto‘g‘ri. Iltimos, tekshirib qaytadan kiriting.',
      };
    }

    // Successful authentication
    setCurrentUser(matched.user);
    setIsAuthenticated(true);
    localStorage.setItem('psychoedu_auth', 'true');
    localStorage.setItem('psychoedu_user', JSON.stringify(matched.user));
    return { success: true, user: matched.user };
  };

  const registerUser = (userData: { fullName: string; email: string; password?: string; role: UserRole; facultyOrGroup?: string }) => {
    let baseUser = currentStudentUser;
    if (userData.role === 'professor_psychologist') baseUser = currentProfessorUser;
    else if (userData.role === 'supervisor') baseUser = currentSupervisorUser;
    else if (userData.role === 'admin') baseUser = currentAdminUser;

    const newUser: User = {
      ...baseUser,
      id: `user-${Date.now()}`,
      fullName: userData.fullName || baseUser.fullName,
      email: userData.email || baseUser.email,
      role: userData.role,
      roleLabel: baseUser.roleLabel,
    };

    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('psychoedu_auth', 'true');
    localStorage.setItem('psychoedu_user', JSON.stringify(newUser));

    // Save into registered accounts so user can log in later
    const storedAccountsRaw = localStorage.getItem('psychoedu_registered_accounts');
    let registeredAccounts: any[] = [];
    if (storedAccountsRaw) {
      try {
        registeredAccounts = JSON.parse(storedAccountsRaw);
      } catch {}
    }
    registeredAccounts.push({
      email: userData.email.toLowerCase(),
      password: userData.password || 'password123',
      role: userData.role,
      user: newUser,
    });
    localStorage.setItem('psychoedu_registered_accounts', JSON.stringify(registeredAccounts));

    // Register on backend
    api.auth.register({
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password || 'password123',
      role: userData.role,
      facultyOrGroup: userData.facultyOrGroup,
    }).catch(() => {});
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('psychoedu_auth');
    api.auth.logout();
  };

  const switchRole = () => {
    if (currentUser.role === 'student') {
      setCurrentUser(currentProfessorUser);
    } else if (currentUser.role === 'professor_psychologist') {
      setCurrentUser(currentSupervisorUser);
    } else if (currentUser.role === 'supervisor') {
      setCurrentUser(currentAdminUser);
    } else {
      setCurrentUser(currentStudentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser.role,
        isAuthenticated,
        loginAs,
        loginWithCredentials,
        registerUser,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
