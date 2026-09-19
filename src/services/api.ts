const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

class ApiClient {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('psychoedu_access_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = Array.isArray(errorData.message)
        ? errorData.message.join(', ')
        : errorData.message || `Request failed with status ${response.status}`;
      throw new ApiError(message, response.status);
    }

    return await response.json();
  }

  private async safeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    try {
      return await this.request<T>(endpoint, options);
    } catch (error) {
      console.warn(`[ApiClient] ${endpoint} request failed:`, (error as Error).message);
      return null;
    }
  }

  // 1. Authentication
  auth = {
    login: async (email: string, pass: string) => {
      const res = await this.request<{ accessToken: string; refreshToken: string; user: any }>(
        '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({ email, password: pass }),
        },
      );
      if (res?.accessToken) {
        localStorage.setItem('psychoedu_access_token', res.accessToken);
        localStorage.setItem('psychoedu_refresh_token', res.refreshToken);
      }
      return res;
    },

    register: async (data: { fullName: string; email: string; password: string; role?: string; facultyOrGroup?: string }) => {
      const res = await this.request<{ accessToken: string; refreshToken: string; user: any }>(
        '/auth/register',
        {
          method: 'POST',
          body: JSON.stringify(data),
        },
      );
      if (res?.accessToken) {
        localStorage.setItem('psychoedu_access_token', res.accessToken);
        localStorage.setItem('psychoedu_refresh_token', res.refreshToken);
      }
      return res;
    },

    quickLogin: async (role: string) => {
      const res = await this.request<{ accessToken: string; refreshToken: string; user: any }>(
        '/auth/quick-login',
        {
          method: 'POST',
          body: JSON.stringify({ role }),
        },
      );
      if (res?.accessToken) {
        localStorage.setItem('psychoedu_access_token', res.accessToken);
        localStorage.setItem('psychoedu_refresh_token', res.refreshToken);
      }
      return res;
    },

    getMe: async () => {
      return this.request<any>('/auth/me');
    },

    logout: () => {
      localStorage.removeItem('psychoedu_access_token');
      localStorage.removeItem('psychoedu_refresh_token');
    },
  };

  // 2. Cameras & Live Sessions
  cameras = {
    getAll: async () => this.safeRequest<any[]>('/cameras'),
    getById: async (id: string) => this.safeRequest<any>(`/cameras/${id}`),
    updateState: async (id: string, state: string) =>
      this.safeRequest<any>(`/cameras/${id}/state`, {
        method: 'PATCH',
        body: JSON.stringify({ state }),
      }),
  };

  sessions = {
    getLive: async () => this.safeRequest<any[]>('/sessions/live'),
    getById: async (id: string) => this.safeRequest<any>(`/sessions/${id}`),
  };

  // 3. Videos
  videos = {
    getAll: async (status?: string) =>
      this.safeRequest<any[]>(`/videos${status ? `?status=${status}` : ''}`),
    getById: async (id: string) => this.safeRequest<any>(`/videos/${id}`),
    incrementViews: async (id: string) =>
      this.safeRequest<any>(`/videos/${id}/view`, { method: 'PATCH' }),
    getStreamUrl: (id: string) => `${API_BASE_URL}/videos/${id}/stream`,
  };

  // 4. Materials
  materials = {
    getAll: async (category?: string) =>
      this.safeRequest<any[]>(`/materials${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    getById: async (id: string) => this.safeRequest<any>(`/materials/${id}`),
    incrementDownloads: async (id: string) =>
      this.safeRequest<any>(`/materials/${id}/download`, { method: 'PATCH' }),
  };

  // 5. Case Studies
  cases = {
    getAll: async (method?: string) =>
      this.safeRequest<any[]>(`/cases${method ? `?method=${encodeURIComponent(method)}` : ''}`),
    getById: async (id: string) => this.safeRequest<any>(`/cases/${id}`),
  };

  // 6. Reviews
  reviews = {
    getQueue: async () => this.safeRequest<any[]>('/reviews'),
    makeDecision: async (id: string, action: string, comment: string, supervisorName?: string) =>
      this.safeRequest<any>(`/reviews/${id}/decision`, {
        method: 'PATCH',
        body: JSON.stringify({ action, comment, supervisorName }),
      }),
  };

  // 7. Admin
  admin = {
    getStats: async () => this.safeRequest<any>('/admin/stats'),
    getFaculties: async () => this.safeRequest<any[]>('/admin/faculties'),
    getDepartments: async () => this.safeRequest<any[]>('/admin/departments'),
    getRooms: async () => this.safeRequest<any[]>('/admin/rooms'),
  };
}

export const api = new ApiClient();
