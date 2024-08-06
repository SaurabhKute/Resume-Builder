import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthResponse, AuthError } from '../authTypes';
import apiService from '../../../services/apiService';

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}


// Register User
export const registerUser = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: AuthError }>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const  data  = await apiService.post<AuthResponse>('/auth/register', userData);
      const { tokens, user } = data;
      localStorage.setItem('authToken', tokens?.access?.token);
      localStorage.setItem('refreshToken', tokens?.refresh?.token);
      return { tokens, user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as AuthError);
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);

// Login User
export const loginUser = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: AuthError }>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const  data  = await apiService.post<AuthResponse>('/auth/login', credentials);
      const { tokens, user } = data;
      localStorage.setItem('authToken', tokens.access.token);
      localStorage.setItem('refreshToken', tokens.refresh.token);
      return { tokens, user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as AuthError);
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);

// Logout User
// Logout User
export const logoutUser = createAsyncThunk<void, void, { rejectValue: AuthError }>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      console.log(refreshToken, "rt");
      await apiService.post('/auth/logout', { refreshToken: refreshToken });
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as AuthError);
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);