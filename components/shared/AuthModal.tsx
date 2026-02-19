
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BrainCircuit, 
  Mail, 
  Lock, 
  ArrowRight, 
  Chrome, 
  UserCircle2, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type AuthMethod = 'email' | 'google';
type AuthMode = 'signin' | 'signup';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, register, loginGoogle } = useAuth();
  
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAutoRegisterMsg, setShowAutoRegisterMsg] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const resetErrors = () => {
    setError(null);
    setShowAutoRegisterMsg(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    resetErrors();
    try {
      if (authMode === 'signin') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      if (err.message === 'user-not-found') {
        setShowAutoRegisterMsg(true);
      } else if (err.message === 'email-already-in-use') {
        setError('This email is already associated with an account. Please sign in.');
      } else {
        setError('Authentication failed. Please verify your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    resetErrors();
    try {
      await loginGoogle();
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError('Google authentication was interrupted.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchToSignUp = () => {
    setAuthMode('signup');
    resetErrors();
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
          className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-xl flex items-start justify-center p-6 overflow-y-auto"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0, scale: 0.95 }} 
            animate={{ y: 0, opacity: 1, scale: 1 }} 
            exit={{ y: 20, opacity: 0, scale: 0.95 }} 
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="max-w-md w-full relative my-auto"
          >
            <GlassCard className="p-8 md:p-10 bg-white border-slate-200 shadow-2xl relative overflow-hidden">
              <button 
                onClick={onClose} 
                aria-label="Close modal"
                className="absolute top-4 right-4 w-10 h-10 bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full flex items-center justify-center z-20 transition-all"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
              <div className="text-center mb-8">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20"
                >
                  <BrainCircuit className="text-white w-9 h-9" />
                </motion.div>
                <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter leading-none">
                  {authMode === 'signin' ? 'Sign In to Participate' : 'Create Forecaster Profile'}
                </h3>
                <p className="text-slate-500 font-medium text-sm">
                  {authMode === 'signin' ? 'Access your professional forecasting record.' : 'Join the global analytical network.'}
                </p>
              </div>

              {/* Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
                <button
                  onClick={() => { setAuthMode('signin'); resetErrors(); }}
                  className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${authMode === 'signin' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode('signup'); resetErrors(); }}
                  className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${authMode === 'signup' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Create Account
                </button>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-[10px] font-black uppercase text-center flex items-center justify-center gap-2"
                >
                  <AlertCircle size={14} />
                  {error}
                </motion.div>
              )}

              {showAutoRegisterMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 text-[10px] font-black uppercase text-center space-y-3"
                >
                  <p>Account not found. Would you like to create one?</p>
                  <button 
                    onClick={switchToSignUp}
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    One-Click Register
                  </button>
                </motion.div>
              )}

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <AnimatePresence mode="wait">
                  {authMode === 'signup' && (
                    <motion.div 
                      key="name-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          required
                          type="text" 
                          placeholder="Analytical Professional" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="email" 
                      placeholder="analyst@foresee.io" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="password" 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  disabled={isLoading}
                  className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all mt-4 flex items-center justify-center gap-2 ${isLoading ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/20'}`}
                >
                  {isLoading ? 'Verifying...' : (authMode === 'signin' ? 'Authenticate' : 'Initialize Profile')}
                  {!isLoading && <ArrowRight size={16} />}
                </motion.button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-slate-300"><span className="bg-white px-4">Institutional SSO</span></div>
              </div>

              <button 
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full py-4 bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-3"
              >
                <Chrome size={18} className="text-indigo-600" />
                Continue with Google
              </button>

              <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
                <CheckCircle2 size={12} className="text-emerald-500" />
                Institutional-Grade Security
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
