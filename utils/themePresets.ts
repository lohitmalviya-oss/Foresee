
export interface ThemePreset {
  name: string;
  colors: {
    primary: string;
    primaryHover: string;
    primaryGlow: string;
    primaryBg: string;
    bgPage: string;
    bgCard: string;
    bgSecondary: string;
    textMain: string;
    textMuted: string;
    borderColor: string;
    shadowColor: string;
  };
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    name: 'Indigo Pro',
    colors: {
      primary: '#4f46e5',
      primaryHover: '#4338ca',
      primaryGlow: 'rgba(79, 70, 229, 0.3)',
      primaryBg: '#eff6ff',
      bgPage: '#f8fafc',
      bgCard: 'rgba(255, 255, 255, 0.75)',
      bgSecondary: '#ffffff',
      textMain: '#1e293b',
      textMuted: '#64748b',
      borderColor: 'rgba(226, 232, 240, 0.8)',
      shadowColor: 'rgba(0, 0, 0, 0.05)',
    },
  },
  {
    name: 'Emerald Edge',
    colors: {
      primary: '#059669',
      primaryHover: '#047857',
      primaryGlow: 'rgba(5, 150, 105, 0.3)',
      primaryBg: '#ecfdf5',
      bgPage: '#f0fdf4',
      bgCard: 'rgba(255, 255, 255, 0.85)',
      bgSecondary: '#ffffff',
      textMain: '#064e3b',
      textMuted: '#475569',
      borderColor: 'rgba(167, 243, 208, 0.5)',
      shadowColor: 'rgba(5, 150, 105, 0.08)',
    },
  },
  {
    name: 'Midnight Elite',
    colors: {
      primary: '#6366f1',
      primaryHover: '#818cf8',
      primaryGlow: 'rgba(99, 102, 241, 0.4)',
      primaryBg: 'rgba(99, 102, 241, 0.15)',
      bgPage: '#020617',
      bgCard: 'rgba(15, 23, 42, 0.7)',
      bgSecondary: '#0f172a',
      textMain: '#f8fafc',
      textMuted: '#94a3b8',
      borderColor: 'rgba(30, 41, 59, 0.8)',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
  {
    name: 'Amber Pulse',
    colors: {
      primary: '#d97706',
      primaryHover: '#b45309',
      primaryGlow: 'rgba(217, 119, 6, 0.3)',
      primaryBg: '#fffbeb',
      bgPage: '#fffbeb',
      bgCard: 'rgba(255, 255, 255, 0.9)',
      bgSecondary: '#ffffff',
      textMain: '#78350f',
      textMuted: '#71717a',
      borderColor: 'rgba(251, 191, 36, 0.3)',
      shadowColor: 'rgba(217, 119, 6, 0.1)',
    },
  },
  {
    name: 'Rose Insight',
    colors: {
      primary: '#e11d48',
      primaryHover: '#be123c',
      primaryGlow: 'rgba(225, 29, 72, 0.3)',
      primaryBg: '#fff1f2',
      bgPage: '#fff1f2',
      bgCard: 'rgba(255, 255, 255, 0.8)',
      bgSecondary: '#ffffff',
      textMain: '#881337',
      textMuted: '#52525b',
      borderColor: 'rgba(254, 205, 211, 0.5)',
      shadowColor: 'rgba(225, 29, 72, 0.1)',
    },
  },
];
