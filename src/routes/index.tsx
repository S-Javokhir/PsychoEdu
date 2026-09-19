import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { LandingPage } from '../pages/marketing/LandingPage';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { DashboardDispatcher } from '../pages/DashboardDispatcher';
import { LiveMonitoring } from '../pages/LiveMonitoring';
import { LiveSessionDetail } from '../pages/LiveSessionDetail';
import { VideoLibrary } from '../pages/VideoLibrary';
import { VideoDetail } from '../pages/VideoDetail';
import { Materials } from '../pages/Materials';
import { MaterialDetail } from '../pages/MaterialDetail';
import { CaseStudies } from '../pages/CaseStudies';
import { CaseDetail } from '../pages/CaseDetail';
import { Profile } from '../pages/Profile';

// Professor Specific Pages
import { RecordingPage } from '../pages/professor/RecordingPage';
import { MySessions } from '../pages/professor/MySessions';
import { MyVideos } from '../pages/professor/MyVideos';
import { MyMaterials } from '../pages/professor/MyMaterials';
import { MyCases } from '../pages/professor/MyCases';

// Supervisor Pages
import { ReviewCenter } from '../pages/supervisor/ReviewCenter';
import { VideoReviewPage } from '../pages/supervisor/VideoReviewPage';

// Admin Pages
import { Faculties } from '../pages/admin/Faculties';
import { Departments } from '../pages/admin/Departments';
import { Rooms } from '../pages/admin/Rooms';
import { Cameras } from '../pages/admin/Cameras';
import { UsersProfessors } from '../pages/admin/UsersProfessors';
import { UsersStudents } from '../pages/admin/UsersStudents';
import { UsersSupervisors } from '../pages/admin/UsersSupervisors';
import { Patients } from '../pages/admin/Patients';
import { AdminVideos } from '../pages/admin/AdminVideos';
import { AdminMaterials } from '../pages/admin/AdminMaterials';
import { AdminCases } from '../pages/admin/AdminCases';
import { AdminSettings } from '../pages/admin/AdminSettings';
import { NotFound } from '../pages/NotFound';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Marketing Homepage */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated Platform Shell */}
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<DashboardDispatcher />} />
        
        {/* Live Monitoring */}
        <Route path="/live" element={<LiveMonitoring />} />
        <Route path="/live/:id" element={<LiveSessionDetail />} />
        
        {/* Video Library */}
        <Route path="/videos" element={<VideoLibrary />} />
        <Route path="/videos/:id" element={<VideoDetail />} />
        
        {/* Materials */}
        <Route path="/materials" element={<Materials />} />
        <Route path="/materials/:id" element={<MaterialDetail />} />
        
        {/* Case Studies */}
        <Route path="/cases" element={<CaseStudies />} />
        <Route path="/cases/:id" element={<CaseDetail />} />
        
        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Professor / Psychologist Routes */}
        <Route path="/professor/recording" element={<RecordingPage />} />
        <Route path="/professor/sessions" element={<MySessions />} />
        <Route path="/professor/videos" element={<MyVideos />} />
        <Route path="/professor/materials" element={<MyMaterials />} />
        <Route path="/professor/cases" element={<MyCases />} />

        {/* Supervisor Routes */}
        <Route path="/supervisor/reviews" element={<ReviewCenter />} />
        <Route path="/supervisor/reviews/:id" element={<VideoReviewPage />} />

        {/* Admin Routes */}
        <Route path="/admin/faculties" element={<Faculties />} />
        <Route path="/admin/departments" element={<Departments />} />
        <Route path="/admin/rooms" element={<Rooms />} />
        <Route path="/admin/cameras" element={<Cameras />} />
        <Route path="/admin/users/professors" element={<UsersProfessors />} />
        <Route path="/admin/users/students" element={<UsersStudents />} />
        <Route path="/admin/users/supervisors" element={<UsersSupervisors />} />
        <Route path="/admin/patients" element={<Patients />} />
        <Route path="/admin/videos" element={<AdminVideos />} />
        <Route path="/admin/materials" element={<AdminMaterials />} />
        <Route path="/admin/cases" element={<AdminCases />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        {/* 404 Inside Shell */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
