import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  Faculty, 
  Department, 
  Room, 
  Camera, 
  User, 
  AnonymousPatient, 
  ReviewActionLog 
} from '../types';
import { 
  mockFaculties, 
  mockDepartments, 
  mockRooms, 
  mockPatients, 
  mockReviewLogs 
} from '../data/adminData';
import { mockCameras } from '../data/cameras';
import { mockUsers } from '../data/users';

interface AdminDataContextType {
  faculties: Faculty[];
  departments: Department[];
  rooms: Room[];
  cameras: Camera[];
  users: User[];
  patients: AnonymousPatient[];
  reviewLogs: ReviewActionLog[];
  // Faculty CRUD
  addFaculty: (faculty: Omit<Faculty, 'id'>) => void;
  updateFaculty: (id: string, data: Partial<Faculty>) => void;
  deleteFaculty: (id: string) => void;
  // Department CRUD
  addDepartment: (department: Omit<Department, 'id'>) => void;
  updateDepartment: (id: string, data: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;
  // Room CRUD
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (id: string, data: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  // Camera CRUD
  addCamera: (camera: Omit<Camera, 'id'>) => void;
  updateCamera: (id: string, data: Partial<Camera>) => void;
  deleteCamera: (id: string) => void;
  // User CRUD
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  // Patient CRUD
  addPatient: (patient: Omit<AnonymousPatient, 'id'>) => void;
  updatePatient: (id: string, data: Partial<AnonymousPatient>) => void;
  deletePatient: (id: string) => void;
  // Review Logs
  addReviewLog: (log: Omit<ReviewActionLog, 'id'>) => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [faculties, setFaculties] = useState<Faculty[]>(() => {
    const saved = localStorage.getItem('psychoedu_admin_faculties');
    return saved ? JSON.parse(saved) : mockFaculties;
  });

  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem('psychoedu_admin_departments');
    return saved ? JSON.parse(saved) : mockDepartments;
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('psychoedu_admin_rooms');
    return saved ? JSON.parse(saved) : mockRooms;
  });

  const [cameras, setCameras] = useState<Camera[]>(() => {
    const saved = localStorage.getItem('psychoedu_admin_cameras');
    return saved ? JSON.parse(saved) : mockCameras;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('psychoedu_admin_users');
    return saved ? JSON.parse(saved) : mockUsers;
  });

  const [patients, setPatients] = useState<AnonymousPatient[]>(() => {
    const saved = localStorage.getItem('psychoedu_admin_patients');
    return saved ? JSON.parse(saved) : mockPatients;
  });

  const [reviewLogs, setReviewLogs] = useState<ReviewActionLog[]>(() => {
    const saved = localStorage.getItem('psychoedu_admin_review_logs');
    return saved ? JSON.parse(saved) : mockReviewLogs;
  });

  useEffect(() => {
    localStorage.setItem('psychoedu_admin_faculties', JSON.stringify(faculties));
  }, [faculties]);

  useEffect(() => {
    localStorage.setItem('psychoedu_admin_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('psychoedu_admin_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('psychoedu_admin_cameras', JSON.stringify(cameras));
  }, [cameras]);

  useEffect(() => {
    localStorage.setItem('psychoedu_admin_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('psychoedu_admin_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('psychoedu_admin_review_logs', JSON.stringify(reviewLogs));
  }, [reviewLogs]);

  // Faculty Actions
  const addFaculty = (data: Omit<Faculty, 'id'>) => {
    const newFac: Faculty = { ...data, id: `fac-${Date.now()}` };
    setFaculties((prev) => [...prev, newFac]);
  };
  const updateFaculty = (id: string, data: Partial<Faculty>) => {
    setFaculties((prev) => prev.map((f) => (f.id === id ? { ...f, ...data } : f)));
  };
  const deleteFaculty = (id: string) => {
    setFaculties((prev) => prev.filter((f) => f.id !== id));
  };

  // Department Actions
  const addDepartment = (data: Omit<Department, 'id'>) => {
    const newDep: Department = { ...data, id: `dep-${Date.now()}` };
    setDepartments((prev) => [...prev, newDep]);
  };
  const updateDepartment = (id: string, data: Partial<Department>) => {
    setDepartments((prev) => prev.map((d) => (d.id === id ? { ...d, ...data } : d)));
  };
  const deleteDepartment = (id: string) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  // Room Actions
  const addRoom = (data: Omit<Room, 'id'>) => {
    const newRoom: Room = { ...data, id: `room-${Date.now()}` };
    setRooms((prev) => [...prev, newRoom]);
  };
  const updateRoom = (id: string, data: Partial<Room>) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r)));
  };
  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  // Camera Actions
  const addCamera = (data: Omit<Camera, 'id'>) => {
    const newCam: Camera = { ...data, id: `cam-${Date.now()}` };
    setCameras((prev) => [...prev, newCam]);
  };
  const updateCamera = (id: string, data: Partial<Camera>) => {
    setCameras((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  };
  const deleteCamera = (id: string) => {
    setCameras((prev) => prev.filter((c) => c.id !== id));
  };

  // User Actions
  const addUser = (data: Omit<User, 'id'>) => {
    const newUser: User = { ...data, id: `user-${Date.now()}` };
    setUsers((prev) => [...prev, newUser]);
  };
  const updateUser = (id: string, data: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
  };
  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Patient Actions
  const addPatient = (data: Omit<AnonymousPatient, 'id'>) => {
    const newPt: AnonymousPatient = { ...data, id: `pt-${Date.now()}` };
    setPatients((prev) => [newPt, ...prev]);
  };
  const updatePatient = (id: string, data: Partial<AnonymousPatient>) => {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };
  const deletePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  // Review Log Actions
  const addReviewLog = (data: Omit<ReviewActionLog, 'id'>) => {
    const newLog: ReviewActionLog = { ...data, id: `log-${Date.now()}` };
    setReviewLogs((prev) => [newLog, ...prev]);
  };

  return (
    <AdminDataContext.Provider
      value={{
        faculties,
        departments,
        rooms,
        cameras,
        users,
        patients,
        reviewLogs,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        addRoom,
        updateRoom,
        deleteRoom,
        addCamera,
        updateCamera,
        deleteCamera,
        addUser,
        updateUser,
        deleteUser,
        addPatient,
        updatePatient,
        deletePatient,
        addReviewLog,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = (): AdminDataContextType => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
