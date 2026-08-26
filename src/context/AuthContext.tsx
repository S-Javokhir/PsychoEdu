import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../types';
import { 
  currentStudentUser, 
  currentProfessorUser, 
  currentSupervisorUser, 
  currentAdminUser 
} from '../data/users';

interface AuthContextType {
  currentUser: User;
  role: UserRole;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  switchRole: () => void;
}

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
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('psychoedu_auth');
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
