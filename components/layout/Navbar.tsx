
import React from 'react';
import { motion } from 'framer-motion';
import { Target, LayoutDashboard, Trophy, User, Zap, LogIn, LogOut } from 'lucide-react';
import { CountUp } from '../shared/CountUp';
import { UserProfile } from '../../types/index';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (t: string) => void;
  isAuthenticated: boolean;
  onAuthClick: () => void;
  user: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isAuthenticated, onAuthClick, user }) => {
  const { logout } = useAuth();
  const navItems = [
    { id: 'dashboard', label: 'Participate', icon: <LayoutDashboard size={16} />, public: true },
    { id: 'leaderboard', label: 'Top Forecasters', icon: <Trophy size={16} />, public: true },
    { id: 'profile', label: 'My Portfolio', icon: <User size={16} />, public: false }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-5 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-xl">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('landing')}>
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.1 }} 
          className="w-10 h-10 bg-[var(--primary)] rounded-2xl flex items-center justify-center shadow-lg transition-transform"
        >
          <Target className="text-white w-6 h-6" />
        </motion.div>
        <span className="text-2xl font-black tracking-tighter text-[var(--text-main)] font-manrope">FORESEE</span>
      </div>
      
      <div className="hidden lg:flex items-center gap-10 text-[var(--text-muted)] font-black text-xs uppercase tracking-widest">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => {
              if (item.public || isAuthenticated) {
                setActiveTab(item.id);
              } else {
                onAuthClick();
              }
            }}
            className={`relative py-2 hover:text-[var(--text-main)] transition-colors flex items-center gap-2 ${activeTab === item.id ? 'text-[var(--primary)]' : ''}`}
          >
            {item.icon}
            {item.label}
            {activeTab === item.id && (
              <motion.div layoutId="navUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-[var(--bg-page)] border border-[var(--border-color)] rounded-2xl">
              <Zap className="text-amber-500 w-4 h-4 fill-amber-500" />
              <span className="text-sm font-black text-[var(--text-main)]"><CountUp value={user?.reputation || 0} /> Credibility</span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }} 
              onClick={() => setActiveTab('profile')} 
              className="w-10 h-10 rounded-2xl bg-[var(--primary-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--primary)] transition-colors group"
            >
              <User className="text-[var(--primary)] group-hover:text-white w-5 h-5" />
            </motion.button>
            <button 
              onClick={() => { logout(); setActiveTab('landing'); }}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={onAuthClick} 
            className="flex items-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-8 py-3 rounded-2xl font-black transition-all shadow-lg text-xs uppercase tracking-widest"
          >
            <LogIn size={18} /> Sign In to Participate
          </motion.button>
        )}
      </div>
    </nav>
  );
};
