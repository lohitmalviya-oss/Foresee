
import React from 'react';
import { motion } from 'framer-motion';
import { THEME_PRESETS, ThemePreset } from '../utils/themePresets';
import { applyTheme } from '../utils/themeApplier';
import { Card } from '../components/shared/Card';
import { Palette, ArrowLeft } from 'lucide-react';

interface ThemeLabProps {
  onBack: () => void;
}

export const ThemeLab: React.FC<ThemeLabProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen pt-32 px-6 max-w-4xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-black text-[var(--text-main)] tracking-tighter uppercase flex items-center gap-4">
            <Palette className="text-[var(--primary)]" size={40} />
            Theme Lab
          </h1>
          <p className="text-[var(--text-muted)] font-medium mt-2">Centralized Color Variable Orchestrator</p>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] font-black text-xs uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={16} /> Exit Lab
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {THEME_PRESETS.map((theme: ThemePreset) => (
          <Card 
            key={theme.name}
            variant="standard"
            hover
            onClick={() => applyTheme(theme)}
            className="p-8 group"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-black text-[var(--text-main)]">{theme.name}</span>
              <div 
                className="w-10 h-10 rounded-xl shadow-lg"
                style={{ backgroundColor: theme.colors.primary }}
              />
            </div>
            
            <div className="flex gap-2 mb-8">
              {Object.values(theme.colors).slice(0, 6).map((color, i) => (
                <div 
                  key={i}
                  className="w-full h-8 rounded-lg border border-slate-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <button 
              className="w-full py-3 bg-[var(--primary-bg)] text-[var(--primary)] rounded-xl font-black text-[10px] uppercase tracking-widest border border-transparent group-hover:border-[var(--primary)] transition-all"
            >
              Apply Preset
            </button>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-8 border border-dashed border-[var(--border-color)] rounded-3xl text-center">
        <p className="text-[var(--text-muted)] text-sm font-medium italic">
          "The centralized theme system maps Tailwind arbitrary values to document-level CSS variables, ensuring atomic updates across all Foresee components."
        </p>
      </div>
    </div>
  );
};
