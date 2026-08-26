import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Dashboard as StudentDashboard } from './Dashboard';
import { ProfessorDashboard } from './professor/ProfessorDashboard';
import { SupervisorDashboard } from './supervisor/SupervisorDashboard';
import { AdminDashboard } from './admin/AdminDashboard';

export const DashboardDispatcher: React.FC = () => {
  const { role } = useAuth();

  switch (role) {
    case 'professor_psychologist':
      return <ProfessorDashboard />;
    case 'supervisor':
      return <SupervisorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'student':
    default:
      return <StudentDashboard />;
  }
};
