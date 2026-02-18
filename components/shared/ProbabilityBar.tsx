
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
        <span className="text-slate-400">Low Probability</span>
        <span className="text-indigo-400 font-bold">High Probability</span>
      </div>
    )}
    <div className={`${compact ? 'h-1.5' : 'h-2.5'} w-full bg-white/10 rounded-full overflow-hidden flex p-0.5 shadow-inner border border-white/5`}>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${probability}%` }}
        transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
        className={`h-full rounded-full relative ${probability > 60 ? 'bg-gradient-to-r from-indigo-500 to-emerald-400' : 'bg-gradient-to-r from-slate-500 to-indigo-500'}`}
      >
        <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
      </motion.div>
    </div>
    <div className="flex justify-between items-center">
      <span className={`${compact ? 'text-lg' : 'text-2xl'} font-black text-white`}>
        <CountUp value={probability} duration={1.5} />% 
        <span className="text-[10px] ml-1 font-bold text-slate-400 uppercase tracking-tighter">Likelihood</span>
      </span>
      {!compact && (
        <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded bg-white/5">
          Analyst Consensus
        </span>
      )}
    </div>
  </div>
);
