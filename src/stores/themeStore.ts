import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

type ThemeState = {
    mode: ThemeMode;
    toggle: () => void;
    setMode: (mode: ThemeMode) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
    mode: 'light',
    toggle: () => set((s) => ({ 
        mode: s.mode === 'light' ? 'dark' : 'light'  // ← исправлено!
    })),
    setMode: (mode) => set({ mode }),
}));

export type { ThemeMode };