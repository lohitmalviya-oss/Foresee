
import { ThemePreset } from './themePresets';

export const applyTheme = (theme: ThemePreset) => {
  const root = document.documentElement;
  const { colors } = theme;

  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--primary-hover', colors.primaryHover);
  root.style.setProperty('--primary-glow', colors.primaryGlow);
  root.style.setProperty('--primary-bg', colors.primaryBg);
  root.style.setProperty('--bg-page', colors.bgPage);
  root.style.setProperty('--bg-card', colors.bgCard);
  root.style.setProperty('--bg-secondary', colors.bgSecondary);
  root.style.setProperty('--text-main', colors.textMain);
  root.style.setProperty('--text-muted', colors.textMuted);
  root.style.setProperty('--border-color', colors.borderColor);
  root.style.setProperty('--shadow-color', colors.shadowColor);
};
