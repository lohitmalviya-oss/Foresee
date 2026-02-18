
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added Flame to the imports to resolve the "Cannot find name 'Flame'" error on line 135
import { Zap, Trophy, TrendingUp, Loader2, Star, Flame } from 'lucide-react';
import { Card } from '../shared/Card';
import { CountUp } from '../shared/CountUp';
import { LeaderboardEntry } from '../../types/index';

interface LeaderboardProps {
  onSelectUser: (u: LeaderboardEntry) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onSelectUser }) => {
  const [rankingType, setRankingType] = useState<'weekly' | 'all-time'>('all-time');
  const [limit, setLimit] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const weeklyRankings: LeaderboardEntry[] = [
    { id: 'w1', name: 'TrendHunter_Analyst', acc: '94.2%', rep: 4210, streak: 5, color: 'text-amber-400', tier: 'Senior Forecaster', totalForecasts: 156 },
    { id: 'w2', name: 'Policy_Reviewer', acc: '92.5%', rep: 3980, streak: 7, color: 'text-slate-300', tier: 'Senior Forecaster', totalForecasts: 89 },
    { id: 'w3', name: 'Data_Seer_India', acc: '91.1%', rep: 2840, streak: 3, color: 'text-indigo-400', tier: 'Established Forecaster', totalForecasts: 210 },
    { id: 'w4', name: 'Global_Insight_0', acc: '89.2%', rep: 1720, streak: 2, color: 'text-slate-400', tier: 'Established Forecaster', totalForecasts: 67 },
    { id: 'w5', name: 'Forecaster_Plus', acc: '88.1%', rep: 650, streak: 4, color: 'text-slate-400', tier: 'Active Forecaster', totalForecasts: 45 },
    { id: 'w6', name: 'Analytical_Edge', acc: '87.5%', rep: 610, streak: 1, color: 'text-slate-400', tier: 'Active Forecaster', totalForecasts: 12 }
  ];

  const allTimeRankings: LeaderboardEntry[] = [
    { id: 'at1', name: 'FutureSight_V', acc: '89.2%', rep: 15210, streak: 42, color: 'text-amber-400', tier: 'Elite Forecaster', totalForecasts: 1240 },
    { id: 'at2', name: 'Crystal_Analytical', acc: '87.5%', rep: 8900, streak: 21, color: 'text-slate-300', tier: 'Elite Forecaster', totalForecasts: 890 },
    { id: 'at3', name: 'Institutional_Node', acc: '85.4%', rep: 6400, streak: 15, color: 'text-indigo-400', tier: 'Elite Forecaster', totalForecasts: 560 },
    { id: 'at4', name: 'Alpha_Strategist', acc: '84.1%', rep: 4800, streak: 12, color: 'text-slate-400', tier: 'Senior Forecaster', totalForecasts: 420 },
    { id: 'at5', name: 'Brier_Expert', acc: '83.9%', rep: 3500, streak: 8, color: 'text-slate-400', tier: 'Senior Forecaster', totalForecasts: 310 },
    { id: 'at6', name: 'Delta_Node', acc: '82.5%', rep: 2100, streak: 5, color: 'text-slate-400', tier: 'Established Forecaster', totalForecasts: 150 }
  ];

  const currentRankings = useMemo(() => {
    const base = rankingType === 'weekly' ? weeklyRankings : allTimeRankings;
    return base.slice(0, limit);
  }, [rankingType, limit]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setLimit(prev => prev + 3);
      setIsLoadingMore(false);
    }, 800);
  };

  return (
    <div className="pt-32 px-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-6xl font-black text-white mb-3 tracking-tighter leading-none uppercase">Top Forecasters</h1>
          <p className="text-slate-500 font-medium tracking-tight">Analytical leaders identified by credibility and performance record.</p>
        </div>
        <div className="flex bg-slate-900/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
          <button 
            onClick={() => { setRankingType('weekly'); setLimit(3); }} 
            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${rankingType === 'weekly' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => { setRankingType('all-time'); setLimit(3); }} 
            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${rankingType === 'all-time' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            All-Time
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="hidden md:grid grid-cols-12 px-8 text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] pb-2">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Forecaster Profile</div>
          <div className="col-span-2 text-center">Credibility Tier</div>
          <div className="col-span-2 text-center">Score</div>
          <div className="col-span-2 text-right">Engagement</div>
        </div>

        <AnimatePresence mode="popLayout">
          {currentRankings.map((user, i) => (
            <motion.div 
              key={user.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card 
                variant="leaderboard" 
                hover 
                onClick={() => onSelectUser(user)}
                className="md:grid grid-cols-12 items-center"
              >
                <div className="col-span-1 flex items-center md:block mb-4 md:mb-0">
                  <span className={`text-2xl font-black ${i < 3 ? 'text-indigo-400' : 'text-slate-700'}`}>
                    {i + 1}
                  </span>
                </div>
                
                <div className="col-span-5 flex items-center gap-4 mb-4 md:mb-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-sm font-black text-slate-400">
                    {user.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors leading-none">
                        {user.name}
                      </span>
                      {rankingType === 'weekly' && i < 3 && <Star className="text-amber-500 fill-amber-500" size={14} />}
                    </div>
                    <span className="text-[9px] font-bold text-teal-500 uppercase tracking-widest mt-1">
                      {user.acc} Forecast Accuracy
                    </span>
                  </div>
                </div>

                <div className="col-span-2 text-center mb-4 md:mb-0">
                  <span className={`px-2 py-0.5 rounded-md bg-white/5 text-[8px] font-black uppercase tracking-widest border border-white/5 ${user.tier.includes('Elite') ? 'text-amber-500 border-amber-500/20' : 'text-slate-400'}`}>
                    {user.tier}
                  </span>
                </div>

                <div className="col-span-2 flex items-center justify-center gap-1.5 mb-4 md:mb-0">
                  <Zap size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-base font-black text-white">
                    <CountUp value={user.rep} />
                  </span>
                </div>

                <div className="col-span-2 text-right">
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                    <span className="text-sm font-black text-slate-400">{user.streak}D</span>
                    <Flame size={12} className="text-orange-500" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {limit < (rankingType === 'weekly' ? weeklyRankings.length : allTimeRankings.length) && (
        <div className="mt-12 text-center">
          <button 
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 mx-auto"
          >
            {isLoadingMore ? <Loader2 size={16} className="animate-spin" /> : null}
            {isLoadingMore ? 'Synchronizing Node Data...' : 'Load Additional Forecasters'}
          </button>
        </div>
      )}
    </div>
  );
};
