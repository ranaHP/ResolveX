import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, LoginPayload, Role, User } from '../../types';
import { authService } from '../../services/authService';

interface AuthState {
  status: 'idle' | 'loading' | 'failed';
  user: User | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  status: 'idle',
  user: null,
  token: null,
  error: null
};

export const login = createAsyncThunk<AuthResponse, LoginPayload>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unable to login');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) ?? 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'idle';
      });
  }
});

export const { setUser, setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentRole = (state: { auth: AuthState }): Role | null => state.auth.user?.role ?? null;
