import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Resume } from '../formTypes';
import { AuthError } from '../../Auth/authTypes';
import apiService from '../../../services/apiService';


export const createResume = createAsyncThunk<any, Resume, { rejectValue: AuthError }>(
    'resume/createResume', 
    async (resumeData, { rejectWithValue }) => {
        try {
            // console.log(resumeData, "@resumeData");
            const data = await apiService.post<any>(`/resume/${resumeData.userId}`, resumeData);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as AuthError);
            }
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);

export const getResumeById = createAsyncThunk<any, any, { rejectValue: AuthError }>(
    'resume/getResumeById', 
    async (resumeId, { rejectWithValue }) => {
        try {
            const data  = await apiService.get<any>(`/resume/${resumeId}/1`);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as AuthError);
            }
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);

export const getAllResumeById = createAsyncThunk<any, any, { rejectValue: AuthError }>(
    'resume/getAllResumeById', 
    async (resumeId, { rejectWithValue }) => {
        try {
            const data  = await apiService.get<any>(`/resume/${resumeId}`);
            // console.log(data, "data from resume");
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as AuthError);
            }
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);

export const updateResume = createAsyncThunk<any, any, { rejectValue: AuthError }>(
    'resume/updateResume', 
    async (resumeData, { rejectWithValue }) => {
        try {
            // console.log(resumeData, "@resumeData");
            const data  = await apiService.patch<any>(`/resume/${resumeData?.resumeId}`, resumeData);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as AuthError);
            }
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);

export const deleteResume = createAsyncThunk<any, any, { rejectValue: AuthError }>(
    'resume/deleteResume', 
    async (resumeId, { rejectWithValue }) => {
        try {
            // console.log(resumeId,"@resumeId");
            const data  = await apiService.delete<any>(`/resume/${resumeId}`);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as AuthError);
            }
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);




