import { createSlice } from '@reduxjs/toolkit';

type ThemeState = 'light' | 'dark';

const getInitialTheme = (): ThemeState => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('fixmate-theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialTheme(),
  reducers: {
    toggleTheme: (state) => {
      const next = state === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('fixmate-theme', next);
      }
      return next;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
export const selectTheme = (state: { theme: ThemeState }) => state.theme;
