import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ProfessorSession, Video, Material, CaseStudy, VideoState } from '../types';
import { mockProfessorSessions } from '../data/professorData';
import { mockVideos } from '../data/videos';
import { mockMaterials } from '../data/materials';
import { mockCases } from '../data/cases';

interface ProfessorDataContextType {
  sessions: ProfessorSession[];
  videos: Video[];
  materials: Material[];
  cases: CaseStudy[];
  addSession: (session: Omit<ProfessorSession, 'id'>) => string;
  updateSessionStatus: (id: string, status: VideoState) => void;
  updateSession: (id: string, data: Partial<ProfessorSession>) => void;
  addVideo: (video: Omit<Video, 'id'>) => string;
  updateVideoStatus: (id: string, status: VideoState) => void;
  updateVideo: (id: string, data: Partial<Video>) => void;
  addMaterial: (material: Omit<Material, 'id'>) => string;
  updateMaterial: (id: string, data: Partial<Material>) => void;
  deleteMaterial: (id: string) => void;
  addCase: (caseStudy: Omit<CaseStudy, 'id'>) => string;
  updateCase: (id: string, data: Partial<CaseStudy>) => void;
  deleteCase: (id: string) => void;
}

const ProfessorDataContext = createContext<ProfessorDataContextType | undefined>(undefined);

export const ProfessorDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ProfessorSession[]>(() => {
    const saved = localStorage.getItem('psychoedu_prof_sessions');
    return saved ? JSON.parse(saved) : mockProfessorSessions;
  });

  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('psychoedu_prof_videos');
    return saved ? JSON.parse(saved) : mockVideos;
  });

  const [materials, setMaterials] = useState<Material[]>(() => {
    const saved = localStorage.getItem('psychoedu_prof_materials');
    return saved ? JSON.parse(saved) : mockMaterials;
  });

  const [cases, setCases] = useState<CaseStudy[]>(() => {
    const saved = localStorage.getItem('psychoedu_prof_cases');
    return saved ? JSON.parse(saved) : mockCases;
  });

  useEffect(() => {
    localStorage.setItem('psychoedu_prof_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('psychoedu_prof_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('psychoedu_prof_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('psychoedu_prof_cases', JSON.stringify(cases));
  }, [cases]);

  // Session Actions
  const addSession = (newSessionData: Omit<ProfessorSession, 'id'>): string => {
    const newId = `psess-${Date.now()}`;
    const newSession: ProfessorSession = {
      ...newSessionData,
      id: newId,
    };
    setSessions((prev) => [newSession, ...prev]);

    // Also add to videos catalogue as corresponding state if submitted/draft
    const newVideo: Video = {
      id: `vid-${Date.now()}`,
      title: newSession.title,
      description: newSession.educationalObjective,
      thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
      duration: newSession.duration || '45:00',
      activityType: newSession.activityType,
      method: newSession.method,
      professor: 'Prof. Dilorom Karimova',
      professorTitle: 'Psixologiya fanlari doktori, Professor',
      professorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      department: 'Klinik va amaliy psixologiya kafedrasi',
      recordedDate: newSession.date,
      viewCount: 0,
      status: newSession.status,
      appliedMethods: [
        {
          title: newSession.method,
          description: newSession.educationalObjective,
          timestamp: '02:15'
        }
      ],
      relatedMaterialIds: [],
    };
    setVideos((prev) => [newVideo, ...prev]);

    return newId;
  };

  const updateSessionStatus = (id: string, status: VideoState) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const updateSession = (id: string, data: Partial<ProfessorSession>) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
  };

  // Video Actions
  const addVideo = (newVideoData: Omit<Video, 'id'>): string => {
    const newId = `vid-${Date.now()}`;
    const newVid: Video = {
      ...newVideoData,
      id: newId,
    };
    setVideos((prev) => [newVid, ...prev]);
    return newId;
  };

  const updateVideoStatus = (id: string, status: VideoState) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
  };

  const updateVideo = (id: string, data: Partial<Video>) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...data } : v))
    );
  };

  // Material Actions
  const addMaterial = (newMatData: Omit<Material, 'id'>): string => {
    const newId = `mat-${Date.now()}`;
    const newMat: Material = {
      ...newMatData,
      id: newId,
    };
    setMaterials((prev) => [newMat, ...prev]);
    return newId;
  };

  const updateMaterial = (id: string, data: Partial<Material>) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...data } : m))
    );
  };

  const deleteMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  // Case Actions
  const addCase = (newCaseData: Omit<CaseStudy, 'id'>): string => {
    const newId = `case-${Date.now()}`;
    const newCase: CaseStudy = {
      ...newCaseData,
      id: newId,
    };
    setCases((prev) => [newCase, ...prev]);
    return newId;
  };

  const updateCase = (id: string, data: Partial<CaseStudy>) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
  };

  const deleteCase = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ProfessorDataContext.Provider
      value={{
        sessions,
        videos,
        materials,
        cases,
        addSession,
        updateSessionStatus,
        updateSession,
        addVideo,
        updateVideoStatus,
        updateVideo,
        addMaterial,
        updateMaterial,
        deleteMaterial,
        addCase,
        updateCase,
        deleteCase,
      }}
    >
      {children}
    </ProfessorDataContext.Provider>
  );
};

export const useProfessorData = (): ProfessorDataContextType => {
  const context = useContext(ProfessorDataContext);
  if (!context) {
    throw new Error('useProfessorData must be used within a ProfessorDataProvider');
  }
  return context;
};
