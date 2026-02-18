
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Navigation, Users, Check, X, Flame } from 'lucide-react';
import { Prediction } from '../../types/index';
import { Card } from '../shared/Card';
import { ProbabilityBar } from '../shared/ProbabilityBar';

interface PredictionCardProps {
  prediction: Prediction;
  onClick: () => void;
  index: number;
  variant?: 'standard' | 'featured' | 'hero';
}

const categoryAccentClasses: Record<string, string> = {
  Politics: 'border-indigo-100 text-indigo-600 bg-indigo-50',
  Science: 'border-emerald-100 text-emerald-600 bg-emerald-50',
  Sports: 'border-amber-100 text-amber-600 bg-amber-50',
  Culture: 'border-rose-100 text-rose-600 bg-rose-50',
  Economy: 'border-sky-100 text-sky-600 bg-sky-50',
};

export const PredictionCard: React.FC<PredictionCardProps> = memo(({ prediction, onClick, index, variant = 'standard' }) => {
  const accentClass = categoryAccentClasses[prediction.category] || categoryAccentClasses.Politics;

  if (variant === 'hero') {
    return (
      <Card 
        variant="featured" 
        hover 
        onClick={onClick} 
        className="group relative flex flex-col md:flex-row w-full overflow-hidden border-[var(--border-color)] shadow-xl"
      >
        <div className="relative w-full md:w-[65%] h-[400px] md:h-auto overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${prediction.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'})` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-6 left-6 flex flex-wrap gap-3">
            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md shadow-lg bg-white/90 text-slate-900`}>
              {prediction.category}
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl border border-white/20 text-[10px] font-black text-slate-800 shadow-lg">
              <Users size={12} className="text-[var(--primary)]" />
              {prediction.totalPredictions.toLocaleString()} analysts
            </div>
            {prediction.predictionsLast24h && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/90 backdrop-blur-md rounded-xl border border-orange-400/20 text-[10px] font-black text-white shadow-lg animate-pulse">
                <Flame size={12} />
                Trending Forecasts
              </div>
            )}
          </div>
          
          <div className="absolute bottom-8 left-8 right-8">
             <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 drop-shadow-2xl font-manrope max-w-2xl">
              {prediction.question}
            </h2>
            <div className="flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest bg-black/40 backdrop-blur-md w-fit px-4 py-2 rounded-xl border border-white/20">
              <Clock size={16} className="text-[var(--primary)]" />
              Submission closes in {Math.ceil((prediction.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
            </div>
          </div>
        </div>

        <div className="w-full md:w-[35%] p-8 md:p-12 flex flex-col justify-center bg-[var(--bg-secondary)] border-l border-[var(--border-color)]">
          <ProbabilityBar probability={prediction.probability} />
          
          <div className="mt-10 grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              className="group/btn flex flex-col items-center justify-center py-6 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/10 rounded-3xl transition-all"
            >
              <span className="text-emerald-600 font-black text-3xl">{prediction.probability}%</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600/70 flex items-center gap-1 mt-1">
                <Check size={12} /> Yes
              </span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              className="group/btn flex flex-col items-center justify-center py-6 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/10 rounded-3xl transition-all"
            >
              <span className="text-rose-600 font-black text-3xl">{100 - prediction.probability}%</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-600/70 flex items-center gap-1 mt-1">
                <X size={12} /> No
              </span>
            </button>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="w-full py-6 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-3xl font-black text-sm uppercase tracking-[0.3em] transition-all shadow-xl shadow-[var(--primary-glow)]"
          >
            Submit Forecast
          </motion.button>
          
          <p className="mt-6 text-center text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
            Early forecasts earn higher credibility.
          </p>
        </div>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card 
        variant="featured" 
        hover 
        onClick={onClick} 
        className="group relative flex flex-col h-full min-h-[480px] bg-[var(--bg-secondary)] border-[var(--border-color)]"
      >
        <div className="relative h-64 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${prediction.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'})` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute top-5 left-5">
            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${accentClass}`}>
              {prediction.category}
            </span>
          </div>
          
          <div className="absolute top-5 right-5">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg border border-white/50 text-[9px] font-black text-slate-800 shadow-sm uppercase tracking-widest">
              <Clock size={12} className="text-[var(--primary)]" />
              {Math.ceil((prediction.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}d Left
            </div>
          </div>

          <div className="absolute bottom-5 left-5 right-5">
             <h3 className="text-2xl font-black text-white leading-tight group-hover:text-indigo-200 transition-colors drop-shadow-xl">
              {prediction.question}
            </h3>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <ProbabilityBar probability={prediction.probability} />
          
          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[var(--border-color)] pt-5 mb-6">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest">Support Factor</span>
              <span className="text-emerald-500 font-black text-lg">{prediction.probability}%</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest">Dissent Factor</span>
              <span className="text-rose-500 font-black text-lg">{100 - prediction.probability}%</span>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-auto w-full py-4 bg-[var(--primary)] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-[var(--primary-glow)]"
          >
            Submit Forecast
          </motion.button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="standard" hover onClick={onClick} className="flex flex-col group min-h-[320px] bg-[var(--bg-secondary)]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${accentClass}`}>
            {prediction.category}
          </span>
          {prediction.probability > 80 && (
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="p-1 rounded bg-emerald-500/10 text-emerald-500">
              <TrendingUp size={12} />
            </motion.span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[9px] font-black uppercase tracking-widest">
          <Clock size={11} />{prediction.expiresAt.toLocaleDateString()}
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-[var(--text-main)] mb-6 leading-snug group-hover:text-[var(--primary)] transition-colors">
        {prediction.question}
      </h3>
      
      <div className="mt-auto">
        <ProbabilityBar probability={prediction.probability} compact />
        
        <div className="mt-6 flex items-center justify-between border-t border-[var(--border-color)] pt-5">
          <div className="flex items-center gap-3">
             <div className="flex -space-x-1.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-5 h-5 rounded-full border border-white bg-slate-50 flex items-center justify-center text-[7px] font-black text-slate-500">
                  {i}
                </div>
              ))}
            </div>
            <span className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest">
              +{(prediction.totalPredictions / 1000).toFixed(1)}k analyses
            </span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1, x: 3 }} 
            className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors"
          >
            <Navigation size={16} />
          </motion.div>
        </div>
      </div>
    </Card>
  );
});

PredictionCard.displayName = 'PredictionCard';
