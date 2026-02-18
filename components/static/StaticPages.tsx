
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, LifeBuoy, ArrowLeft, CheckCircle2, Lock, Globe } from 'lucide-react';
import { Card } from '../shared/Card';

interface StaticPageProps {
  onBack: () => void;
}

export const Methodology: React.FC<StaticPageProps> = ({ onBack }) => (
  <div className="pt-32 px-6 max-w-4xl mx-auto pb-24">
    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black text-xs uppercase tracking-widest mb-12 transition-colors">
      <ArrowLeft size={16} /> Back to Dashboard
    </button>
    
    <div className="mb-16">
      <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none uppercase">Forecasting Methodology</h1>
      <p className="text-xl text-slate-500 font-medium">How we measure and reward analytical accuracy.</p>
    </div>

    <div className="space-y-12">
      <Card variant="glass" className="p-10">
        <div className="flex gap-6 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shrink-0">
            <BookOpen className="text-white" size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Incentive Compatible Scoring</h3>
            <p className="text-slate-500 leading-relaxed">Foresee uses a proprietary scoring algorithm derived from the Brier Score. Our system rewards analysts who express their true beliefs. Hedging or misrepresenting confidence levels results in lower long-term Credibility Scores.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-3">Early Bird Advantage</h4>
            <p className="text-sm text-slate-500 italic">Submit forecasts before the consensus forms to earn a 1.2x Credibility multiplier.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-3">Contrarian Bonus</h4>
            <p className="text-sm text-slate-500 italic">Correctly predicting an event that the general consensus missed provides an additional 1.5x score impact.</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export const Privacy: React.FC<StaticPageProps> = ({ onBack }) => (
  <div className="pt-32 px-6 max-w-4xl mx-auto pb-24">
    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black text-xs uppercase tracking-widest mb-12 transition-colors">
      <ArrowLeft size={16} /> Back to Dashboard
    </button>
    
    <div className="mb-16">
      <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none uppercase">Privacy & Data Policy</h1>
      <p className="text-xl text-slate-500 font-medium">Committed to institutional-grade data protection.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        { icon: <Lock className="text-indigo-600" />, title: "Identity Protection", desc: "Your personal details are never shared with third parties. Your track record is linked only to your username." },
        { icon: <Globe className="text-emerald-600" />, title: "Data Transparency", desc: "Analytical data is used to improve consensus models. We comply with Indian Data Protection standards." },
        { icon: <CheckCircle2 className="text-amber-600" />, title: "Auditability", desc: "Every forecast submission is recorded on an immutable ledger to ensure fairness and transparency." },
        { icon: <Shield className="text-rose-600" />, title: "Secure Access", desc: "Two-factor authentication and session monitoring keep your analytical portfolio safe." }
      ].map((item, i) => (
        <Card key={i} variant="stat" className="p-8">
          <div className="mb-4">{item.icon}</div>
          <h4 className="text-lg font-black text-slate-900 uppercase mb-2">{item.title}</h4>
          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
        </Card>
      ))}
    </div>
  </div>
);

export const Support: React.FC<StaticPageProps> = ({ onBack }) => (
  <div className="pt-32 px-6 max-w-4xl mx-auto pb-24">
    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black text-xs uppercase tracking-widest mb-12 transition-colors">
      <ArrowLeft size={16} /> Back to Dashboard
    </button>
    
    <div className="mb-16">
      <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none uppercase">Analyst Support</h1>
      <p className="text-xl text-slate-500 font-medium">We're here to help you build your track record.</p>
    </div>

    <Card variant="featured" className="p-12 text-center bg-indigo-600 text-white">
      <LifeBuoy size={64} className="mx-auto mb-8 opacity-50" />
      <h2 className="text-4xl font-black uppercase mb-4">Need Assistance?</h2>
      <p className="text-indigo-100 text-lg mb-10 max-w-lg mx-auto">Our support team is available Monday to Friday, 9:00 AM - 6:00 PM IST to assist with account verification, score disputes, or technical issues.</p>
      
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <button className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform">Email Support</button>
        <button className="px-10 py-4 bg-indigo-500 border border-indigo-400 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform">View Documentation</button>
      </div>
    </Card>
  </div>
);
