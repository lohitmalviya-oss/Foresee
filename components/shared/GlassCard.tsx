
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  layoutId?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hover = false, layoutId, onClick }) => (
  <motion.div 
    layoutId={layoutId}
    onClick={onClick}
    onKeyDown={(e) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    }}
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    whileHover={hover ? { y: -8, scale: 1.01, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)', borderColor: '#e2e8f0' } : {}}
    whileTap={hover ? { scale: 0.98 } : {}}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl overflow-hidden transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </motion.div>
);