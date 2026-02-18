
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, ArrowLeft } from 'lucide-react';
import { UserProfile } from '../../types/index';
import { getTierInfo } from '../../utils/tierHelpers';
import { GlassCard } from './GlassCard';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, user }) => {
  const currentTier = getTierInfo(user.reputation);
  
  // ESC key support
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.9, y: 20 }} 
            className="max-w-md w-full relative" 
            onClick={e => e.stopPropagation()}
          >
            {/* High Visibility Close Button */}
            <button 
              onClick={onClose} 
              aria-label="Close"
              className="absolute -top-4 -right-4 w-11 h-11 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-2xl z-20 hover:scale-110 active:scale-95 transition-transform"
            >
              <X size={24} strokeWidth={3} />
            </button>

            <GlassCard className="p-8 relative border-white/10 shadow-3xl bg-gradient-to-br from-slate-900 to-indigo-950/40 overflow-visible">
              <div className="text-center mb-8">
                <button 
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-indigo-400 uppercase tracking-widest mb-6 transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Home
                </button>

                <div className="text-4xl mb-4">{currentTier.badge}</div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">My Player Card</h3>
                <div className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">{currentTier.name} Level</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-xs font-bold text-slate-500 uppercase">My Rank</span>
                  <span className="text-lg font-black text-white">#{user.rank}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-xs font-bold text-slate-500 uppercase">Success Rate</span>
                  <span className="text-lg font-black text-teal-400">{user.accuracy}%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-xs font-bold text-slate-500 uppercase">Top Percentage</span>
                  <span className="text-lg font-black text-indigo-400">Top {100 - user.percentile}%</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                  <Share2 size={16} /> Share Card
                </button>
                <button 
                  onClick={() => { navigator.clipboard.writeText(`Join me on Foresee! Use code: ${user.referralCode}`); alert('Link copied!'); }}
                  className="p-4 bg-white/5 hover:bg-white/10 text-slate-400 rounded-2xl transition-all"
                >
                  <Copy size={20} />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
