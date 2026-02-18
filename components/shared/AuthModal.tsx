
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BrainCircuit, Mail, Lock, ArrowLeft } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ESC key support
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Mock auth success for:', email);
      onAuthSuccess();
    } catch (err: any) {
      setError('Error authenticating. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

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
          className="fixed inset-0 z-[150] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 20, opacity: 0 }} 
            className="max-w-md w-full relative"
          >
            {/* High Visibility Close Button */}
            <button 
              onClick={onClose} 
              aria-label="Close modal"
              className="absolute -top-4 -right-4 w-11 h-11 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-2xl z-20 hover:scale-110 active:scale-95 transition-transform"
            >
              <X size={24} strokeWidth={3} />
            </button>

            <GlassCard className="p-10 relative border-white/10 overflow-visible">
              <div className="text-center mb-8">
                <button 
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-indigo-400 uppercase tracking-widest mb-6 transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Homepage
                </button>

                <motion.div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/40">
                  <BrainCircuit className="text-white w-9 h-9" />
                </motion.div>
                <h3 className="text-3xl font-black text-white mb-2 leading-none uppercase">
                  {mode === 'login' ? 'Sign In' : 'Join Foresee'}
                </h3>
                <p className="text-slate-500 font-medium">Build your professional forecasting record.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs font-bold text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                {mode === 'register' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Professional Username</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input 
                        type="text" 
                        placeholder="e.g. Analyst_Rahul" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required
                      type="email" 
                      placeholder="node@foresee.io" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Secure Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required
                      type="password" 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  disabled={isLoading}
                  className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all mt-4 ${isLoading ? 'bg-slate-800 text-slate-500' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-600/40'}`}
                >
                  {isLoading ? 'Verifying...' : (mode === 'login' ? 'Sign In' : 'Initialize Account')}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-[10px] font-black text-slate-500 hover:text-indigo-400 uppercase tracking-widest transition-colors"
                >
                  {mode === 'login' ? "New analyst? Create account" : "Existing analyst? Sign In"}
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
