import { ApiResponse, PaginatedResponse } from '@/types';

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
}

class APIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body } = config;

    const token = localStorage.getItem('auth-token');
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers: {
        ...this.defaultHeaders,
        ...authHeaders,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }): Promise<ApiResponse<any>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  }

  async register(userData: { name: string; email: string; password: string; role: string }): Promise<ApiResponse<any>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData,
    });
  }

  async validateToken(): Promise<ApiResponse<any>> {
    return this.request('/auth/validate');
  }

  // Jobs endpoints
  async getJobs(params?: Record<string, any>): Promise<PaginatedResponse<any>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/jobs${queryString}`);
  }

  async getJob(id: string): Promise<ApiResponse<any>> {
    return this.request(`/jobs/${id}`);
  }

  async createJob(jobData: any): Promise<ApiResponse<any>> {
    return this.request('/jobs', {
      method: 'POST',
      body: jobData,
    });
  }

  async updateJob(id: string, jobData: any): Promise<ApiResponse<any>> {
    return this.request(`/jobs/${id}`, {
      method: 'PUT',
      body: jobData,
    });
  }

  async deleteJob(id: string): Promise<ApiResponse<any>> {
    return this.request(`/jobs/${id}`, {
      method: 'DELETE',
    });
  }

  // Applications endpoints
  async submitApplication(applicationData: any): Promise<ApiResponse<any>> {
    return this.request('/applications', {
      method: 'POST',
      body: applicationData,
    });
  }

  async getApplications(params?: Record<string, any>): Promise<PaginatedResponse<any>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/applications${queryString}`);
  }

  async updateApplicationStatus(id: string, status: string): Promise<ApiResponse<any>> {
    return this.request(`/applications/${id}/status`, {
      method: 'PATCH',
      body: { status },
    });
  }

  // User endpoints
  async getUserProfile(): Promise<ApiResponse<any>> {
    return this.request('/users/profile');
  }

  async updateUserProfile(profileData: any): Promise<ApiResponse<any>> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: profileData,
    });
  }

  async updateAccessibilityPreferences(preferences: any): Promise<ApiResponse<any>> {
    return this.request('/users/accessibility-preferences', {
      method: 'PUT',
      body: preferences,
    });
  }

  // Admin endpoints
  async getUsers(params?: Record<string, any>): Promise<PaginatedResponse<any>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/admin/users${queryString}`);
  }

  async getAccessibilityMetrics(): Promise<ApiResponse<any>> {
    return this.request('/admin/accessibility-metrics');
  }

  async getWCAGCompliance(): Promise<ApiResponse<any>> {
    return this.request('/admin/wcag-compliance');
  }
}

export const apiClient = new APIClient(); 