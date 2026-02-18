
import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Flame, ShieldCheck as VerifiedIcon, Activity, Sparkles, LogIn } from 'lucide-react';
import { UserProfile, Prediction, Category } from '../types/index';
import { Card } from '../components/shared/Card';
import { PredictionCard } from '../components/prediction/PredictionCard';
import { useAuth } from '../context/AuthContext';

interface DashboardProps {
  user?: UserProfile;
  predictions: Prediction[];
  filter: Category | 'All';
  setFilter: (c: Category | 'All') => void;
  onSelectEvent: (p: Prediction) => void;
}

export const Dashboard: React.FC<DashboardProps> = memo(({ user, predictions, filter, setFilter, onSelectEvent }) => {
  const { userForecasts } = useAuth();
  
  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto pb-24">
      {user ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="glass" className="p-8 bg-indigo-50 border-indigo-100 flex items-center justify-between">
            <div>
              <h4 className="text-slate-900 font-black text-xl mb-2 tracking-tighter uppercase">Peer Ranking: {user.percentile}th Percentile</h4>
              <p className="text-indigo-600 text-sm font-bold uppercase tracking-tight">Accuracy growth: <span className="text-indigo-700">+{user.accuracyDelta}%</span></p>
            </div>
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20"><Activity className="text-white" size={28} /></div>
          </Card>
          <Card variant="glass" className="p-8 bg-emerald-50 border-emerald-100 flex items-center justify-between">
            <div>
              <h4 className="text-slate-900 font-black text-xl mb-2 tracking-tighter uppercase">Divergent Insight Reward</h4>
              <p className="text-emerald-600 text-sm font-bold uppercase tracking-tight">Superior consensus divergence: <span className="text-emerald-700">{user.contrarianWins}</span> events.</p>
            </div>
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20"><Sparkles className="text-white" size={28} /></div>
          </Card>
        </motion.div>
      ) : (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-12">
          <Card variant="glass" className="p-10 bg-gradient-to-r from-indigo-600 to-indigo-800 border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Build Your Analytical Record</h2>
              <p className="text-indigo-100 opacity-80 max-w-md">Join a network of professional analysts. Sign in to track your forecast accuracy and grow your global Credibility Score.</p>
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}
              className="px-10 py-5 bg-white text-indigo-700 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform min-h-[44px]"
            >
              <LogIn size={18} /> Sign In to Participate
            </button>
          </Card>
        </motion.div>
      )}

      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } } as any} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { 
            title: 'Global Standing', 
            val: user ? `Top ${100 - user.percentile}%` : '---', 
            desc: user ? 'High percentile among all professional forecasters.' : 'Sign in to analyze your global ranking.', 
            icon: <TrendingUp size={20} className="text-emerald-500" />
          },
          { 
            title: 'Engagement Streak', 
            val: user ? `${user.streak} Days` : 'Consistency', 
            desc: user ? "Consistent participation grants analytical multipliers." : "Maintain daily engagement to enhance score impact.", 
            icon: <Flame size={20} className="text-orange-500" />
          },
          { 
            title: 'Forecaster Rank', 
            val: user ? `#${user.rank}` : 'Unranked', 
            desc: user ? 'Your position on the top forecasters list.' : 'Establish a track record to achieve a global rank.', 
            icon: <VerifiedIcon size={20} className="text-indigo-600" />
          }
        ].map((card, idx) => (
          <motion.div key={idx} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <Card variant="stat" className="h-full bg-white border-slate-100">
              <div className="flex items-center gap-3 mb-4">{card.icon}<span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{card.title}</span></div>
              <div className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{card.val}</div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{card.desc}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h1 className="text-6xl font-black text-slate-900 mb-4 tracking-tighter leading-none uppercase">Trending Forecasts</h1>
          <p className="text-slate-500 font-medium tracking-tight">Contribute your analysis to active global events.</p>
        </motion.div>
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {['All', 'Politics', 'Economy', 'Science', 'Sports', 'Stock Market'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat as any)} 
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'} min-h-[44px]`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {predictions.map((p, idx) => (
            <PredictionCard 
              key={p.id} 
              prediction={p} 
              onClick={() => onSelectEvent(p)} 
              index={idx} 
              variant="standard"
              hasParticipated={userForecasts.includes(p.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-20 p-8 border border-dashed border-slate-200 rounded-3xl text-center max-w-3xl mx-auto">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
          Foresee does not involve money, betting, or trading. It is a professional forecasting and analytical performance platform. Content does not constitute financial or investment advice.
        </p>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
