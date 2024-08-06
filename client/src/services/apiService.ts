import axios from 'axios';

// Access environment variables with import.meta.env
const baseURL = import.meta.env.VITE_API_BASE_URL;

class ApiService {
  private apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = baseURL || '';
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

  // Add other methods (GET, PUT, DELETE) as needed
}

export default new ApiService();
