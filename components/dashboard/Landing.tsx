
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Target, BrainCircuit, Trophy, Zap, Activity, BarChart3, Star } from 'lucide-react';
import { Prediction } from '../../types/index';
import { PredictionCard } from '../prediction/PredictionCard';
import { Card } from '../shared/Card';

interface LandingProps {
  onStart: () => void;
  featuredPredictions: Prediction[];
  onSelectEvent: (p: Prediction) => void;
  setActiveTab?: (tab: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart, featuredPredictions, onSelectEvent, setActiveTab }) => {
  const heroPrediction = featuredPredictions[0];
  
  const mockTopForecasters = [
    { name: 'Rohan_Analyst', accuracy: '98.2%', rank: 1, avatar: 'R', rep: 12540, tier: 'Elite Forecaster' },
    { name: 'Priya_Macro', accuracy: '94.5%', rank: 2, avatar: 'P', rep: 8900, tier: 'Elite Forecaster' },
    { name: 'Amit_Foresee', accuracy: '92.1%', rank: 3, avatar: 'A', rep: 7200, tier: 'Elite Forecaster' },
  ];

  const recentActivity = [
    { user: 'Sanjay_V', action: 'forecasted NO', target: 'Economic Policy Shift', time: '2m ago' },
    { user: 'Deepa_Forecaster', action: 'forecasted YES', target: 'Digital Rupee Expansion', time: '5m ago' },
    { user: 'Institutional_Node', action: 'reached Senior Forecaster status', target: '', time: '12m ago' },
    { user: 'Vikas_Insight', action: 'forecasted YES', target: 'Aerospace Milestone', time: '15m ago' },
    { user: 'Pooja_Market', action: 'earned 450 Credibility Score', target: 'Fiscal Analysis', time: '22m ago' },
  ];

  const topMonthlyGainers = [
    { name: 'Sidharth_Alpha', gain: '+2,450', accuracy: '96.4%', avatar: 'S' },
    { name: 'Meera_Insights', gain: '+1,980', accuracy: '94.1%', avatar: 'M' },
    { name: 'Varun_Trade', gain: '+1,820', accuracy: '92.8%', avatar: 'V' }
  ];

  return (
    <div className="flex flex-col items-center w-full bg-slate-50">
      {/* 1. HERO SECTION */}
      <section className="w-full pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.25em] mb-12 shadow-sm"
        >
          <Target size={14} className="animate-pulse" /> India's Premier Forecasting Platform
        </motion.div>
        
        <div className="w-full">
          {heroPrediction && (
            <PredictionCard 
              prediction={heroPrediction} 
              index={0} 
              variant="hero" 
              onClick={() => onSelectEvent(heroPrediction)}
            />
          )}
        </div>
      </section>

      {/* 2. ANALYST & ACTIVITY SECTION */}
      <section className="w-full bg-white border-y border-slate-100 py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Top Forecasters This Month */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="text-amber-500 fill-amber-500" size={20} />
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Monthly Recognition</span>
              </div>
              <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Top Forecasters This Month</h3>
              <p className="text-slate-500 font-medium">Leading analysts by credibility score gain in the last 30 days.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {topMonthlyGainers.map((user, i) => (
                <Card key={i} className="p-6 bg-slate-50/50 border-slate-100 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center font-black text-indigo-600 mb-4 shadow-sm">
                    {user.avatar}
                  </div>
                  <div className="text-xs font-black text-slate-900 mb-1">{user.name}</div>
                  <div className="text-emerald-500 font-black text-lg mb-2">{user.gain}</div>
                  <div className="px-2 py-0.5 rounded-md bg-white text-[8px] font-black text-slate-400 border border-slate-100 uppercase tracking-widest">
                    Top Performer
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-4 pt-12 border-t border-slate-100">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Top Analysts Ranking</h4>
              {mockTopForecasters.map((user, i) => (
                <Card 
                  key={i} 
                  variant="leaderboard" 
                  className="flex items-center justify-between p-6 bg-slate-50/50 border-slate-100"
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-2xl font-black ${i === 0 ? 'text-amber-500' : 'text-slate-300'}`}>0{user.rank}</span>
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black border border-indigo-100">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="text-slate-900 font-black uppercase text-sm">{user.name}</div>
                      <div className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mt-0.5">{user.tier}</div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-amber-600 font-black mb-1">
                      <Zap size={14} fill="currentColor" />
                      {user.rep.toLocaleString()}
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Credibility Score</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Analytical Activity Feed */}
          <div className="lg:col-span-5 space-y-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">Recent Forecast Activity</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Analytical Stream</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-500 animate-pulse">
                <Activity size={16} />
              </div>
            </div>

            <Card variant="glass" className="bg-slate-50/30 p-2 overflow-hidden border-slate-100 shadow-sm">
              <div className="divide-y divide-slate-100">
                {recentActivity.map((act, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="p-5 flex items-start gap-4 group hover:bg-white transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-600">
                        <span className="text-slate-900 font-black">{act.user}</span> {act.action}
                      </p>
                      {act.target && (
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">
                          {act.target}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{act.time}</span>
                  </motion.div>
                ))}
              </div>
              <button onClick={() => setActiveTab?.('dashboard')} className="w-full py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-t border-slate-100 hover:text-indigo-600 hover:bg-white transition-all">
                Browse More Insights
              </button>
            </Card>

            {/* Performance Metric Showcase */}
            <div className="pt-8">
              <Card className="p-8 bg-indigo-600 text-white border-none overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <BarChart3 className="mb-4 opacity-50" size={32} />
                <h4 className="text-xl font-black uppercase mb-2">Institutional Insight</h4>
                <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                  Contribute your analytical data to help build a transparent global forecasting record.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xl font-black">150K+</div>
                    <div className="text-[8px] font-black uppercase tracking-widest opacity-70">Submissions</div>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div className="text-center">
                    <div className="text-xl font-black">88.4%</div>
                    <div className="text-[8px] font-black uppercase tracking-widest opacity-70">Avg. Accuracy</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE ANALYTICS & CTA SECTION */}
      <section className="w-full bg-slate-50 border-b border-slate-100 py-32 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-indigo-100/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24 relative z-10">
          <div className="flex-1">
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 mb-10 tracking-tighter leading-none font-manrope">
              ANALYZE.<br /><span className="text-indigo-600">FORECAST.</span><br />CREDIBILITY.
            </h2>
            <div className="space-y-10 mb-14">
              {[
                { icon: <Target className="text-emerald-500" />, title: "Forecast Accuracy", desc: "Every correct forecast validates your analytical capability." },
                { icon: <BrainCircuit className="text-indigo-500" />, title: "Expert Insights", desc: "Demonstrate deep domain expertise in Finance, Tech, and Policy." },
                { icon: <Trophy className="text-amber-500" />, title: "Professional Status", desc: "Rise from Emerging Forecaster to Elite status as your credibility grows." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm">{item.icon}</div>
                  <div>
                    <h4 className="text-slate-900 font-black uppercase text-base tracking-widest mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              onClick={onStart}
              className="px-14 py-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-600/30 transition-all"
            >
              Start Forecasting
            </motion.button>
          </div>
          
          <div className="flex-1 w-full max-w-lg">
             <div className="grid grid-cols-1 gap-8">
                {featuredPredictions.slice(1, 3).map((p, idx) => (
                  <PredictionCard 
                    key={p.id} 
                    prediction={p} 
                    index={idx} 
                    variant="standard" 
                    onClick={() => onSelectEvent(p)} 
                  />
                ))}
             </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-24 px-6 bg-white border-t border-slate-100 text-center">
        <div className="flex flex-col items-center gap-10">
          <div className="text-4xl font-black text-slate-900 font-manrope uppercase tracking-tighter">FORESEE</div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span onClick={() => setActiveTab?.('methodology')} className="hover:text-indigo-600 cursor-pointer transition-colors">Forecasting Methodology</span>
            <span onClick={() => setActiveTab?.('leaderboard')} className="hover:text-indigo-600 cursor-pointer transition-colors">Top Forecasters</span>
            <span onClick={() => setActiveTab?.('privacy')} className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy & Data</span>
            <span onClick={() => setActiveTab?.('support')} className="hover:text-indigo-600 cursor-pointer transition-colors">Support</span>
          </div>
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.5em] mt-10">Professional Insight Network • Data-Driven Foresight</p>
        </div>
      </footer>
    </div>
  );
};
