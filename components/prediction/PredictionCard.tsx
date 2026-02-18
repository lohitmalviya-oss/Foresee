
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Navigation, Users, Check, X, Lock } from 'lucide-react';
import { Prediction } from '../../types/index';
import { Card } from '../shared/Card';
import { ProbabilityBar } from '../shared/ProbabilityBar';
import { useAuth } from '../../context/AuthContext';

interface PredictionCardProps {
  prediction: Prediction;
  onClick: () => void;
  index: number;
  variant?: 'standard' | 'featured' | 'hero';
  hasParticipated?: boolean;
}

const categoryAccentClasses: Record<string, string> = {
  Politics: 'border-indigo-100 text-indigo-600 bg-indigo-50',
  Science: 'border-emerald-100 text-emerald-600 bg-emerald-50',
  Sports: 'border-amber-100 text-amber-600 bg-amber-50',
  Culture: 'border-rose-100 text-rose-600 bg-rose-50',
  Economy: 'border-sky-100 text-sky-600 bg-sky-50',
  'Stock Market': 'border-blue-100 text-blue-600 bg-blue-50',
};

export const PredictionCard: React.FC<PredictionCardProps> = memo(({ 
  prediction, 
  onClick, 
  index, 
  variant = 'standard', 
  hasParticipated = false 
}) => {
  const { isAuthenticated } = useAuth();
  const accentClass = categoryAccentClasses[prediction.category] || categoryAccentClasses.Politics;
  const isExpired = new Date() > prediction.expiresAt;

  // Derive button label and state
  const getButtonLabel = () => {
    if (isExpired) return 'Forecast Locked';
    if (!isAuthenticated) return 'Sign In to Participate';
    return hasParticipated ? 'Update Forecast' : 'Submit Forecast';
  };

  const buttonLabel = getButtonLabel();

  // Subtle participation indicator
  const ParticipationBadge = () => (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="absolute top-3 right-3 z-10 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border border-white"
    >
      <Check size={14} className="text-white" />
    </motion.div>
  );

  const BackgroundImage = () => (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-inherit">
      <img 
        src={prediction.imageUrl} 
        alt="" 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
    </div>
  );

  if (variant === 'hero') {
    return (
      <Card 
        variant="featured" 
        hover 
        onClick={onClick} 
        className="group relative flex flex-col md:flex-row w-full overflow-hidden border-white/10 shadow-2xl min-h-[500px]"
      >
        <BackgroundImage />
        {hasParticipated && <ParticipationBadge />}
        
        <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
          <div className="w-full md:w-[65%] p-10 md:p-16 flex flex-col justify-end">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md shadow-lg bg-white/90 text-slate-900`}>
                {prediction.category}
              </span>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-[10px] font-black text-white shadow-lg">
                <Users size={12} className="text-indigo-400" />
                {prediction.totalPredictions.toLocaleString()} Forecasts
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8 drop-shadow-2xl font-manrope max-w-2xl line-clamp-3">
              {prediction.question}
            </h2>
            
            <div className="flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest bg-black/40 backdrop-blur-md w-fit px-4 py-2 rounded-xl border border-white/20">
              {isExpired ? <Lock size={16} className="text-rose-400" /> : <Clock size={16} className="text-indigo-400" />}
              {isExpired ? 'Locked — Awaiting Resolution' : `Closes in ${Math.ceil((prediction.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days`}
            </div>
          </div>

          <div className="w-full md:w-[35%] p-10 md:p-16 flex flex-col justify-center bg-white/5 backdrop-blur-xl border-l border-white/10">
            <ProbabilityBar probability={prediction.probability} />
            
            <div className="mt-10 grid grid-cols-2 gap-4 mb-8">
              <div className="flex flex-col items-center justify-center py-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
                <span className="text-emerald-400 font-black text-3xl">{prediction.probability}%</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400/70 flex items-center gap-1 mt-1">
                  <Check size={12} /> Yes
                </span>
              </div>
              <div className="flex flex-col items-center justify-center py-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl">
                <span className="text-rose-400 font-black text-3xl">{100 - prediction.probability}%</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400/70 flex items-center gap-1 mt-1">
                  <X size={12} /> No
                </span>
              </div>
            </div>

            <motion.button 
              whileHover={!isExpired ? { scale: 1.02 } : {}}
              whileTap={!isExpired ? { scale: 0.98 } : {}}
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              disabled={isExpired}
              className={`w-full py-6 rounded-3xl font-black text-sm uppercase tracking-[0.3em] transition-all shadow-xl min-h-[44px] ${isExpired ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-700'}`}
            >
              {buttonLabel}
            </motion.button>
            
            {hasParticipated && (
              <p className="mt-4 text-center text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1">
                <Check size={12} /> You participated in this forecast.
              </p>
            )}
          </div>
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
        className="group relative flex flex-col h-full min-h-[480px] border-white/10 overflow-hidden"
      >
        <BackgroundImage />
        {hasParticipated && <ParticipationBadge />}
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="p-8 pb-4">
            <div className="flex items-center justify-between mb-8">
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg bg-white/90 text-slate-900`}>
                {prediction.category}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/20 text-[9px] font-black text-white shadow-sm uppercase tracking-widest">
                {isExpired ? <Lock size={12} className="text-rose-400" /> : <Clock size={12} className="text-indigo-400" />}
                {isExpired ? 'Locked' : `${Math.ceil((prediction.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}d Left`}
              </div>
            </div>

            <h3 className="text-2xl font-black text-white leading-tight group-hover:text-indigo-200 transition-colors drop-shadow-xl line-clamp-4 font-manrope">
              {prediction.question}
            </h3>
          </div>

          <div className="p-8 pt-auto mt-auto flex flex-col bg-white/5 backdrop-blur-md border-t border-white/10">
            <ProbabilityBar probability={prediction.probability} />
            
            {hasParticipated ? (
               <div className="mt-5 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-6">
                  <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Check size={10} /> You participated in this forecast.
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-white">Analysis Recorded</span>
                    <span className="text-[8px] font-black text-slate-400 uppercase">Closes {prediction.expiresAt.toLocaleDateString()}</span>
                  </div>
               </div>
            ) : (
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 mb-6">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Support Factor</span>
                  <span className="text-emerald-400 font-black text-lg">{prediction.probability}%</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Dissent Factor</span>
                  <span className="text-rose-400 font-black text-lg">{100 - prediction.probability}%</span>
                </div>
              </div>
            )}

            <motion.button 
              whileHover={!isExpired ? { scale: 1.02 } : {}}
              whileTap={!isExpired ? { scale: 0.98 } : {}}
              disabled={isExpired}
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              className={`mt-auto w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg min-h-[44px] ${isExpired ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-700'}`}
            >
              {buttonLabel}
            </motion.button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="standard" hover onClick={onClick} className="flex flex-col group min-h-[340px] relative border-white/10 overflow-hidden">
      <BackgroundImage />
      {hasParticipated && <ParticipationBadge />}
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border bg-white text-slate-900 border-white/20`}>
              {prediction.category}
            </span>
            {isExpired && (
              <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-rose-500/30 bg-rose-500/10 text-rose-400">Locked</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 text-[9px] font-black uppercase tracking-widest">
            {isExpired ? <Lock size={11} className="text-rose-400" /> : <Clock size={11} />}
            {isExpired ? 'Closed' : prediction.expiresAt.toLocaleDateString()}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-8 leading-snug group-hover:text-indigo-300 transition-colors line-clamp-3 font-manrope">
          {prediction.question}
        </h3>
        
        <div className="mt-auto bg-black/20 backdrop-blur-sm p-4 -mx-6 -mb-6 border-t border-white/5">
          <ProbabilityBar probability={prediction.probability} compact />
          
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                  {prediction.totalPredictions.toLocaleString()} Analysts
                </span>
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, x: 3 }} 
                className="text-slate-400 group-hover:text-indigo-400 transition-colors"
              >
                <Navigation size={16} />
              </motion.div>
            </div>
            {hasParticipated ? (
              <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-emerald-500/20">
                <Check size={10} /> {buttonLabel}
              </div>
            ) : (
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                {!isExpired && <Clock size={10} />}
                {isExpired ? 'Final Correctness Pending' : 'May be updated until lock.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
});

PredictionCard.displayName = 'PredictionCard';
