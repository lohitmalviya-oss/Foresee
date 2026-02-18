
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Target, Flame, Zap, ArrowLeft, Filter, ArrowUpDown, TrendingUp, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { LeaderboardEntry, UserHistoryItem, Category } from '../../types/index';
import { Card } from '../shared/Card';
import { CountUp } from '../shared/CountUp';
import { GlassCard } from '../shared/GlassCard';

interface ForecasterProfileProps {
  forecaster: LeaderboardEntry;
  onClose: () => void;
}

const MOCK_CATEGORIES: Category[] = ['Politics', 'Economy', 'Science', 'Sports', 'Stock Market'];

// Simple SVG Line Chart for performance visualization
const PerformanceChart = ({ data }: { data: number[] }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - ((val - min) / range) * 100,
  }));

  const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

  return (
    <div className="w-full h-24 relative mt-4">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
          </linearGradient>
        </defs>
        <motion.path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-indigo-500"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <path
          d={`${pathD} L 100,100 L 0,100 Z`}
          fill="url(#gradient)"
        />
      </svg>
    </div>
  );
};

export const ForecasterProfile: React.FC<ForecasterProfileProps> = ({ forecaster, onClose }) => {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'impact' | 'correct'>('recent');

  // Mock progression data for the chart
  const performanceHistory = [12000, 15000, 14200, 18500, 21000, forecaster.rep];

  // Generate mock history for this forecaster
  const history: UserHistoryItem[] = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const cat = MOCK_CATEGORIES[Math.floor(Math.random() * MOCK_CATEGORIES.length)];
      const status: 'Correct' | 'Incorrect' | 'Pending' = Math.random() > 0.3 ? (Math.random() > 0.5 ? 'Correct' : 'Incorrect') : 'Pending';
      return {
        id: `${forecaster.id}_h_${i}`,
        date: new Date(Date.now() - (i * 2 + Math.random() * 5) * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        accuracy: 70 + Math.floor(Math.random() * 25),
        question: `Analytical forecast regarding ${cat} market movement for ${new Date().getFullYear()}`,
        prediction: Math.random() > 0.5 ? 'YES' : 'NO',
        status,
        reward: status === 'Correct' ? 200 + Math.floor(Math.random() * 600) : (status === 'Incorrect' ? -50 : 0),
        category: cat
      };
    });
  }, [forecaster.id]);

  const stats = useMemo(() => {
    const correct = history.filter(h => h.status === 'Correct').length;
    const incorrect = history.filter(h => h.status === 'Incorrect').length;
    const pending = history.filter(h => h.status === 'Pending').length;
    return { correct, incorrect, pending, total: history.length };
  }, [history]);

  const filteredHistory = useMemo(() => {
    let result = filter === 'All' ? history : history.filter(h => h.category === filter);
    
    if (sortBy === 'impact') {
      result = [...result].sort((a, b) => b.reward - a.reward);
    } else if (sortBy === 'correct') {
      result = [...result].sort((a, b) => (a.status === 'Correct' ? -1 : 1));
    }
    return result;
  }, [history, filter, sortBy]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[160] bg-slate-950/98 backdrop-blur-3xl overflow-y-auto"
    >
      <div className="min-h-screen py-24 px-6 max-w-6xl mx-auto">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 font-black text-xs uppercase tracking-widest mb-12 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Analysts
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Analyst Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-10 text-center border-white/10 bg-gradient-to-br from-slate-900 to-indigo-950/20 shadow-2xl relative">
              <div className="absolute top-4 right-4 text-xs font-black text-indigo-500/50 uppercase tracking-widest">Global Rank #{Math.floor(Math.random() * 50) + 1}</div>
              
              <div className="w-32 h-32 rounded-3xl bg-slate-800 border-4 border-indigo-500/20 mx-auto mb-8 flex items-center justify-center text-4xl shadow-2xl">
                {forecaster.tier.includes('Elite') || forecaster.tier.includes('Master') ? '🔮' : '📊'}
              </div>

              <h1 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">{forecaster.name}</h1>
              <div className="inline-block px-4 py-1 rounded-xl bg-indigo-500/10 text-indigo-400 text-[10px] font-black border border-indigo-500/20 mb-8 uppercase tracking-widest">
                {forecaster.tier}
              </div>

              <div className="flex items-center justify-center gap-3 p-4 bg-indigo-600/10 rounded-2xl border border-indigo-500/20 mb-6">
                <Zap size={20} className="text-amber-400 fill-amber-400" />
                <div className="text-left">
                  <div className="text-[9px] font-black text-slate-500 uppercase">Credibility Score</div>
                  <div className="text-2xl font-black text-white leading-none"><CountUp value={forecaster.rep} /></div>
                </div>
              </div>

              {/* Performance Visualization */}
              <div className="text-left border-t border-white/5 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Credibility Trend</span>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase">+14% Growth</span>
                </div>
                <PerformanceChart data={performanceHistory} />
                <div className="flex justify-between text-[8px] font-bold text-slate-600 mt-2 uppercase tracking-widest">
                  <span>6 Months Ago</span>
                  <span>Present</span>
                </div>
              </div>
            </GlassCard>

            <Card variant="standard" className="p-8 border-white/10 bg-white/5">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Accuracy Breakdown</h3>
              <div className="space-y-4">
                {[
                  { label: 'Correct', count: stats.correct, color: 'bg-emerald-500', icon: <CheckCircle2 size={12} className="text-emerald-500" /> },
                  { label: 'Incorrect', count: stats.incorrect, color: 'bg-rose-500', icon: <AlertCircle size={12} className="text-rose-500" /> },
                  { label: 'Pending', count: stats.pending, color: 'bg-amber-500', icon: <Clock size={12} className="text-amber-500" /> }
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-1.5">
                        {item.icon}
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                      </div>
                      <span className="text-[9px] font-black text-white">{Math.round((item.count / stats.total) * 100)}%</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / stats.total) * 100}%` }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Forecast History List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Analytical Portfolio</h2>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-slate-900 border border-white/5 p-1.5 rounded-xl">
                  <Filter size={14} className="text-slate-500 ml-2" />
                  <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="bg-transparent text-[10px] font-black text-slate-300 uppercase outline-none cursor-pointer pr-4"
                  >
                    <option value="All">All Categories</option>
                    {MOCK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-slate-900 border border-white/5 p-1.5 rounded-xl">
                  <ArrowUpDown size={14} className="text-slate-500 ml-2" />
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-[10px] font-black text-slate-300 uppercase outline-none cursor-pointer pr-4"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="impact">Highest Impact</option>
                    <option value="correct">Correct Only</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredHistory.length > 0 ? filteredHistory.map((h, i) => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card variant="glass" className="p-7 flex items-center justify-between gap-6 border-l-4 border-l-teal-500 bg-slate-900/40 hover:bg-slate-900/60 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest border border-indigo-400/20 px-2 py-0.5 rounded-md bg-indigo-400/5">{h.category}</span>
                          <span className="text-[9px] font-bold text-slate-500">{h.date}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-3 leading-tight">{h.question}</h4>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          <span>Decision: <span className="text-white">{h.prediction}</span></span>
                          <span>Status: <span className={h.status === 'Correct' ? 'text-teal-400' : (h.status === 'Incorrect' ? 'text-rose-400' : 'text-amber-400')}>{h.status}</span></span>
                          {h.reward !== 0 && (
                            <span>Score Impact: <span className={h.reward > 0 ? 'text-emerald-400' : 'text-rose-400'}>{h.reward > 0 ? '+' : ''}{h.reward}</span></span>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${h.status === 'Correct' ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' : (h.status === 'Incorrect' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-slate-800 border-white/5 text-slate-500')}`}>
                          {h.status === 'Correct' ? <Target size={20} /> : <TrendingUp size={20} />}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )) : (
                  <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <p className="text-slate-500 font-bold">No forecasts matching your filters were found.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
