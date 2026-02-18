
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Trophy, Target, Flame, Zap, Info } from 'lucide-react';
import { UserProfile } from '../../types/index';
import { getTierInfo } from '../../utils/tierHelpers';
import { Card } from '../shared/Card';
import { CountUp } from '../shared/CountUp';

interface ProfileProps {
  user: UserProfile;
  onShare: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onShare }) => {
  const currentTier = getTierInfo(user.reputation);
  
  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Analyst Info */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="glass" className="p-10 text-center border-white/10 shadow-3xl bg-gradient-to-br from-slate-900 to-indigo-950/20">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-32 h-32 rounded-3xl border-4 border-indigo-500/20 mx-auto mb-8 p-2">
              <div className="w-full h-full rounded-2xl bg-slate-800 flex items-center justify-center text-4xl shadow-inner">
                {currentTier.badge}
              </div>
            </motion.div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">{user.username}</h1>
            <div className={`inline-block px-4 py-1 rounded-xl bg-white/5 ${currentTier.color} text-[10px] font-black border border-white/5 mb-8 uppercase tracking-widest`}>
              {currentTier.name} Status
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[9px] font-black text-slate-600 uppercase tracking-widest">
                <span>Next Milestone: {currentTier.next?.name || 'MAX'}</span>
                <span>{user.tierScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                <motion.div initial={{ width: 0 }} animate={{ width: `${user.tierScore}%` }} className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              </div>
            </div>

            <button 
              onClick={onShare}
              className="w-full py-4 bg-white/5 hover:bg-indigo-600 hover:text-white transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 border border-white/5 flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Share2 size={16} /> Export Track Record
            </button>
          </Card>

          <Card variant="standard" className="p-8 bg-indigo-50/5 border-indigo-500/10">
            <div className="flex items-start gap-4 mb-6">
              <Info className="text-indigo-400 shrink-0" size={16} />
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">About My Score</h3>
            </div>
            <div className="space-y-4 text-[11px] font-medium text-slate-400 leading-relaxed">
              <p>Your Credibility Score increases when your forecasts are correct.</p>
              <p>Low-consensus forecasts earn higher impact.</p>
              <p>Incorrect forecasts may reduce your score slightly.</p>
            </div>
          </Card>

          <Card variant="standard" className="p-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Domain Expertise</h3>
            <div className="space-y-6">
              {Object.entries(user.expertise).map(([cat, val], i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>{cat}</span>
                    <span className="text-white">{val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} className="h-full bg-teal-400/60 shadow-[0_0_10px_rgba(45,212,191,0.2)]" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Analytical History */}
        <div className="lg:col-span-8 space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Forecast Accuracy', val: user.accuracy, icon: <Target className="text-teal-400" size={16}/>, suffix: '%' },
              { label: 'Total Forecasts', val: user.predictionsCount, icon: <Trophy className="text-indigo-400" size={16}/>, suffix: '' },
              { label: 'Active Days', val: user.streak, icon: <Flame className="text-amber-400" size={16}/>, suffix: 'D' },
              { label: 'Credibility Score', val: user.reputation, icon: <Zap className="text-white" size={16}/>, suffix: '' }
            ].map((s, i) => (
              <Card key={i} variant="stat" className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  {s.icon}
                  <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{s.label}</div>
                </div>
                <div className={`text-3xl font-black text-white uppercase tracking-tighter`}>
                  <CountUp value={s.val} />{s.suffix}
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Forecast History</h2>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Historical Record</span>
            </div>
            
            <div className="space-y-4">
              {user.history.map((h, i) => (
                <Card key={i} variant="glass" className="p-7 flex items-center justify-between gap-6 border-l-4 border-l-teal-500 bg-slate-900/40">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-3 leading-tight line-clamp-2">{h.question}</h4>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      <span>Forecast: <span className="text-teal-400">{h.prediction}</span></span>
                      <span>Result: <span className="text-indigo-400">{h.status}</span></span>
                      <span>Score Impact: <span className="text-amber-400">+{h.reward}</span></span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[9px] font-black text-teal-400 uppercase tracking-widest mb-1 border border-teal-500/20 px-2 py-0.5 rounded bg-teal-500/5">Validated</div>
                    <div className="text-[11px] font-bold text-slate-500 mt-2">{h.date}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
