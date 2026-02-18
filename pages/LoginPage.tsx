
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Lock, BrainCircuit, Chrome, ArrowRight, CheckCircle2, UserCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/shared/GlassCard';

type AuthMethod = 'email' | 'phone' | 'google';
type AuthMode = 'signin' | 'signup';

export const LoginPage: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { login, register, loginGoogle, requestOTP, verifyOTP } = useAuth();
  
  const [activeMethod, setActiveMethod] = useState<AuthMethod>('email');
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAutoRegisterMsg, setShowAutoRegisterMsg] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

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
      onSuccess();
    } catch (err: any) {
      if (err.message === 'user-not-found') {
        setShowAutoRegisterMsg(true);
      } else if (err.message === 'email-already-in-use') {
        setError('This email is already associated with an account. Please sign in.');
      } else {
        setError('Verification failed. Please ensure your credentials are correct.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    resetErrors();
    try {
      if (!otpSent) {
        await requestOTP(phone);
        setOtpSent(true);
      } else {
        await verifyOTP(phone, otp);
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message === 'invalid-otp' ? 'Invalid verification code.' : 'Service unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    resetErrors();
    try {
      await loginGoogle();
      onSuccess();
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

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-600/30"
          >
            <BrainCircuit className="text-white w-9 h-9" />
          </motion.div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
            {authMode === 'signin' ? 'Sign In to Participate' : 'Create Forecaster Profile'}
          </h1>
          <p className="text-slate-500 font-medium">
            {authMode === 'signin' ? 'Access your professional forecasting record.' : 'Join the global analytical network.'}
          </p>
        </div>

        <GlassCard className="p-8 border-slate-200/50 bg-white/80 shadow-2xl overflow-visible">
          {/* Main Auth Tabs (Methods) */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
            {(['email', 'phone', 'google'] as AuthMethod[]).map((method) => (
              <button
                key={method}
                onClick={() => { setActiveMethod(method); resetErrors(); }}
                className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMethod === method ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {method}
              </button>
            ))}
          </div>

          {/* Sign In / Sign Up Toggle for Email */}
          {activeMethod === 'email' && (
            <div className="flex gap-4 mb-6 border-b border-slate-100 pb-4">
              <button 
                onClick={() => setAuthMode('signin')}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${authMode === 'signin' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setAuthMode('signup')}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${authMode === 'signup' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Create Account
              </button>
            </div>
          )}

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

          <AnimatePresence mode="wait">
            {activeMethod === 'email' && (
              <motion.form 
                key={`${activeMethod}-${authMode}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleEmailAuth}
                className="space-y-4"
              >
                {authMode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Analytical Professional"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="analyst@foresee.io"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
                <button 
                  disabled={isLoading}
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Processing...' : (authMode === 'signin' ? 'Authenticate' : 'Complete Registration')}
                  <ArrowRight size={16} />
                </button>
              </motion.form>
            )}

            {activeMethod === 'phone' && (
              <motion.form 
                key="phone"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handlePhoneAuth}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 00000 00000"
                      disabled={otpSent}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-50"
                    />
                  </div>
                </div>
                {otpSent && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verification Code</label>
                    <input 
                      required
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-black tracking-[0.5em] text-center focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    />
                  </motion.div>
                )}
                <button 
                  disabled={isLoading}
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Synchronizing...' : (otpSent ? 'Confirm Identity' : 'Request Secure Link')}
                  <ArrowRight size={16} />
                </button>
                {otpSent && (
                  <button type="button" onClick={() => setOtpSent(false)} className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                    Change Phone Number
                  </button>
                )}
              </motion.form>
            )}

            {activeMethod === 'google' && (
              <motion.div 
                key="google"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6 text-center"
              >
                <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 inline-block mb-4">
                  <Chrome className="w-12 h-12 text-indigo-600" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed px-4">
                  Securely link your Google account to automatically synchronize your forecasting profile.
                </p>
                <button 
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="w-full py-5 bg-white border border-slate-200 text-slate-700 hover:border-indigo-500 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-3"
                >
                  {isLoading ? 'Authenticating...' : (
                    <>
                      <Chrome size={18} className="text-indigo-600" />
                      Continue with Google
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <CheckCircle2 size={12} className="text-emerald-500" />
              Institutional-Grade Security
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
