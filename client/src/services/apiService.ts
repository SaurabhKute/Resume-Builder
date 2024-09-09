import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

class ApiService {
  private apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = baseURL || '';
  }

  public async get<T>(endpoint: string, params?: any): Promise<T> {
    try {
      const response = await axios.get<T>(`${this.apiBaseUrl}${endpoint}`, {
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await axios.post<T>(`${this.apiBaseUrl}${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async patch<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await axios.patch<T>(`${this.apiBaseUrl}${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.delete<T>(`${this.apiBaseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ApiService();
