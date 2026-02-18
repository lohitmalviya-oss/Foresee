
import React from 'react';
import { motion } from 'framer-motion';
import { CountUp } from './CountUp';

interface ProbabilityBarProps {
  probability: number;
  compact?: boolean;
}

export const ProbabilityBar: React.FC<ProbabilityBarProps> = ({ probability, compact = false }) => (
  <div className={`space-y-3 ${compact ? 'space-y-1.5' : 'space-y-3'}`}>
    {!compact && (
      <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-[0.15em]">
        <span className="text-[var(--text-muted)]">Low Probability</span>
        <span className="text-[var(--primary)] font-bold">High Probability</span>
      </div>
    )}
    <div className={`${compact ? 'h-1.5' : 'h-2.5'} w-full bg-slate-100/50 rounded-full overflow-hidden flex p-0.5 shadow-inner`}>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${probability}%` }}
        transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
        className={`h-full rounded-full relative ${probability > 60 ? 'bg-gradient-to-r from-[var(--primary)] to-emerald-400' : 'bg-gradient-to-r from-slate-300 to-[var(--primary)]'}`}
      >
        <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
      </motion.div>
    </div>
    <div className="flex justify-between items-center">
      <span className={`${compact ? 'text-lg' : 'text-2xl'} font-black text-[var(--text-main)]`}>
        <CountUp value={probability} duration={1.5} />% 
        <span className="text-[10px] ml-1 font-bold text-[var(--text-muted)] uppercase tracking-tighter">Likelihood</span>
      </span>
      {!compact && (
        <span className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest border border-[var(--border-color)] px-2 py-0.5 rounded bg-[var(--bg-page)]">
          Analyst Consensus
        </span>
      )}
    </div>
  </div>
);
