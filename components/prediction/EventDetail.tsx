
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck as VerifiedIcon, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Prediction, UserProfile } from '../../types/index';
import { calculatePotentialReward } from '../../utils/scoring';
import { GlassCard } from '../shared/GlassCard';
import { predictionService } from '../../services/predictionService';

interface EventDetailProps {
  event: Prediction;
  onClose: () => void;
  isAuthenticated: boolean;
  onAuthClick: () => void;
  user: UserProfile;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, onClose, isAuthenticated, onAuthClick, user }) => {
  const [userPrediction, setUserPrediction] = useState<number>(50);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // ESC key support
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const isEarly = useMemo(() => {
    const fortyEightHours = 48 * 60 * 60 * 1000;
    return (Date.now() - event.createdAt.getTime()) < fortyEightHours;
  }, [event]);

  const { total: projectedReward } = calculatePotentialReward(userPrediction, event.probability, user.streak, isEarly);

  const handleVote = async () => {
    if (!isAuthenticated) return onAuthClick();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await predictionService.submitPrediction(user.id, event.id, userPrediction);
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
      className="fixed inset-0 z-[120] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20, opacity: 0 }} 
        animate={{ scale: 1, y: 0, opacity: 1 }} 
        exit={{ scale: 0.95, y: 20, opacity: 0 }} 
        className="max-w-3xl w-full relative"
      >
        {/* High Visibility Close Button */}
        <button 
          onClick={onClose} 
          aria-label="Close"
          className="absolute -top-4 -right-4 w-11 h-11 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-2xl z-20 hover:scale-110 active:scale-95 transition-transform"
        >
          <X size={24} strokeWidth={3} />
        </button>

        <GlassCard className="p-12 relative border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.1)] overflow-visible">
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-400 text-xs font-black uppercase tracking-widest border border-indigo-500/20">{event.category}</span>
              <div className="flex items-center gap-2 text-teal-400 text-xs font-black uppercase tracking-widest"><VerifiedIcon size={14} /> Analytical Accuracy</div>
            </div>
            
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
          </div>

          <h2 className="text-4xl font-black text-white mb-8 leading-[1.1] tracking-tight">{event.question}</h2>
          
          <div className="grid grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Analyst Consensus</div>
              <div className="text-4xl font-black text-teal-400">{event.probability}% Support</div>
            </div>
            <div className="p-8 bg-indigo-600/5 rounded-3xl border border-indigo-500/10 relative overflow-hidden">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Potential Score Impact</div>
              <div className="text-4xl font-black text-indigo-400">+{projectedReward}</div>
            </div>
          </div>

          {submitError && (
            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs font-bold text-center">
              {submitError}
            </div>
          )}

          {!isAuthenticated ? (
            <div className="text-center p-12 bg-indigo-600/10 rounded-[2.5rem] border border-indigo-500/20">
              <h4 className="text-xl font-black text-white mb-4">Sign In Required</h4>
              <button onClick={onAuthClick} className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl">Sign In to Participate</button>
            </div>
          ) : !hasVoted ? (
            <div className="space-y-12">
              <div className="px-4">
                <div className="flex justify-between items-center mb-6"><span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Low Confidence</span><span className="text-5xl font-black text-white">{userPrediction}%</span><span className="text-[11px] font-black text-teal-600 uppercase tracking-widest">High Confidence</span></div>
                <input type="range" min="1" max="99" value={userPrediction} onChange={(e) => setUserPrediction(parseInt(e.target.value))} className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500" />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                onClick={handleVote} 
                disabled={isSubmitting}
                className={`w-full py-6 rounded-3xl font-black text-xl transition-all shadow-3xl ${isSubmitting ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'}`}
              >
                {isSubmitting ? 'Synchronizing...' : 'Submit Forecast'}
              </motion.button>
            </div>
          ) : (
            <div className="text-center py-10 bg-teal-500/10 rounded-[2.5rem] border border-teal-500/20">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="text-white" size={32} /></div>
              <h4 className="text-2xl font-black text-white mb-2">Forecast Recorded</h4>
              <p className="text-teal-400 font-bold">Result Declared on {event.expiresAt.toLocaleDateString()}.</p>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};
