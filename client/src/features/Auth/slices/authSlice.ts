import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from '../actions/authAction';
import { User, AuthError } from '../authTypes';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: AuthError | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ tokens: { access: { token: string }; refresh: { token: string } }; user: User }>) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<AuthError | undefined>) => {
        state.loading = false;
        state.error = action.payload || { message: 'Registration failed' };
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ tokens: { access: { token: string }; refresh: { token: string } }; user: User }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<AuthError | undefined>) => {
        state.loading = false;
        state.error = action.payload || { message: 'Login failed' };
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<AuthError | undefined>) => {
        state.loading = false;
        state.error = action.payload || { message: 'Logout failed' };
      });
  },
});

export default authSlice.reducer;
