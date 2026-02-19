
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck as VerifiedIcon, CheckCircle2, ArrowLeft, RefreshCcw, Lock } from 'lucide-react';
import { Prediction, UserProfile } from '../../types/index';
import { calculatePotentialReward } from '../../utils/scoring';
import { GlassCard } from '../shared/GlassCard';
import { predictionService } from '../../services/predictionService';
import { useAuth } from '../../context/AuthContext';

interface EventDetailProps {
  event: Prediction;
  onClose: () => void;
  isAuthenticated: boolean;
  onAuthClick: () => void;
  user: UserProfile;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, onClose, isAuthenticated, onAuthClick, user }) => {
  const { recordParticipation } = useAuth();
  const existingVote = isAuthenticated && user ? predictionService.getUserPrediction(user.id, event.id) : null;
  const [userPrediction, setUserPrediction] = useState<number>(existingVote ? existingVote.probability : 50);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const isExpired = new Date() > event.expiresAt;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const { total: projectedGain, loss: projectedLoss } = calculatePotentialReward(userPrediction, event.probability, user.streak);

  const handleVote = async () => {
    if (!isAuthenticated) return onAuthClick();
    if (isExpired) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await predictionService.submitPrediction(user.id, event.id, userPrediction);
      recordParticipation(event.id);
      setHasVoted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Error recording your forecast.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[120] bg-slate-950/95 backdrop-blur-2xl flex items-start justify-center overflow-y-auto p-4 md:p-8"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20, opacity: 0 }} 
        animate={{ scale: 1, y: 0, opacity: 1 }} 
        exit={{ scale: 0.95, y: 20, opacity: 0 }} 
        className="max-w-3xl w-full relative my-auto"
      >
        <GlassCard className="p-6 md:p-12 relative border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.1)] overflow-hidden">
          <button 
            onClick={onClose} 
            aria-label="Close"
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 text-slate-400 hover:text-white hover:bg-white/20 rounded-full flex items-center justify-center z-[130] transition-all"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
          <div className="mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-400 text-[10px] md:text-xs font-black uppercase tracking-widest border border-indigo-500/20">{event.category}</span>
              <div className="flex items-center gap-2 text-teal-400 text-[10px] md:text-xs font-black uppercase tracking-widest"><VerifiedIcon size={14} /> Analytical Accuracy</div>
            </div>
            
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors min-h-[44px]"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 leading-[1.1] tracking-tight line-clamp-4">{event.question}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
            <div className="p-6 md:p-8 bg-white/5 rounded-3xl border border-white/5">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Analyst Consensus</div>
              <div className="text-xl md:text-2xl font-black text-teal-400">{event.probability}% Yes / {100 - event.probability}% No</div>
            </div>
            <div className="p-6 md:p-8 bg-indigo-600/5 rounded-3xl border border-indigo-500/10 relative overflow-hidden">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Estimated Outcome Impact</div>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-2xl md:text-3xl font-black text-emerald-400">+{projectedGain}</div>
                  <div className="text-[8px] font-black text-slate-500 uppercase">Correct</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <div className="text-2xl md:text-3xl font-black text-rose-400">-{projectedLoss}</div>
                  <div className="text-[8px] font-black text-slate-500 uppercase">Incorrect</div>
                </div>
              </div>
            </div>
          </div>

          {isExpired && (
            <div className="mb-8 p-6 bg-slate-900 border border-slate-700 rounded-3xl text-center">
              <div className="flex items-center justify-center gap-3 text-slate-400 font-black uppercase tracking-[0.2em] mb-2">
                <Lock size={18} /> Forecast locked — awaiting resolution.
              </div>
              <p className="text-slate-500 text-[10px] md:text-xs font-medium">Submission closed on {event.expiresAt.toLocaleDateString()}. Final correctness will determine Credibility Score impact.</p>
            </div>
          )}

          {submitError && (
            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs font-bold text-center">
              {submitError}
            </div>
          )}

          {!isAuthenticated ? (
            <div className="text-center p-8 md:p-12 bg-indigo-600/10 rounded-[2.5rem] border border-indigo-500/20">
              <h4 className="text-lg md:text-xl font-black text-white mb-4">Account Required</h4>
              <button onClick={onAuthClick} className="px-8 md:px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl min-h-[44px]">Sign In to Participate</button>
            </div>
          ) : !hasVoted && !isExpired ? (
            <div className="space-y-8 md:space-y-12">
              <div className="px-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[9px] md:text-[11px] font-black text-slate-600 uppercase tracking-widest">Low Confidence</span>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">{userPrediction}%</span>
                    <span className="text-[9px] md:text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{userPrediction >= 50 ? 'FORECAST: YES' : 'FORECAST: NO'}</span>
                  </div>
                  <span className="text-[9px] md:text-[11px] font-black text-teal-600 uppercase tracking-widest">High Confidence</span>
                </div>
                <input type="range" min="1" max="99" value={userPrediction} onChange={(e) => setUserPrediction(parseInt(e.target.value))} className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500" />
              </div>
              
              <div className="flex flex-col gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  onClick={handleVote} 
                  disabled={isSubmitting}
                  className={`w-full py-5 md:py-6 rounded-3xl font-black text-lg md:text-xl transition-all shadow-3xl min-h-[44px] ${isSubmitting ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'}`}
                >
                  {isSubmitting ? 'Synchronizing Node...' : (existingVote ? 'Update Forecast' : 'Submit Initial Forecast')}
                </motion.button>
                <p className="text-center text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  You may update your analysis until {event.expiresAt.toLocaleDateString()}.
                </p>
              </div>
            </div>
          ) : hasVoted ? (
            <div className="text-center py-8 md:py-10 bg-teal-500/10 rounded-[2.5rem] border border-teal-500/20">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="text-white" size={28} /></div>
              <h4 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tighter">Forecast Synchronized</h4>
              <p className="text-teal-400 font-bold mb-6 text-sm">Your analysis has been updated. Result expected to resolve after closing.</p>
              <button onClick={() => setHasVoted(false)} className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-black uppercase text-[10px] tracking-widest transition-colors">
                <RefreshCcw size={14} /> Modify Selection
              </button>
            </div>
          ) : isExpired && existingVote ? (
            <div className="text-center py-8 md:py-10 bg-slate-800/50 rounded-[2.5rem] border border-white/5">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Your Final Forecast</div>
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{existingVote.probability >= 50 ? 'YES' : 'NO'} ({existingVote.probability}%)</div>
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Locked at closing</div>
            </div>
          ) : null}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};
