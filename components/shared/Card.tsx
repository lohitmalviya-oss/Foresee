
import React from 'react';
import { motion } from 'framer-motion';

export type CardVariant = 'featured' | 'standard' | 'leaderboard' | 'stat' | 'glass';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  hover?: boolean;
  layoutId?: string;
  onClick?: () => void;
  category?: string;
}

const variantStyles: Record<CardVariant, string> = {
  featured: "rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-[0_20px_50px_-15px_var(--shadow-color)] overflow-hidden",
  standard: "rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm p-6",
  leaderboard: "rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-page)] transition-colors px-6 py-4 shadow-sm",
  stat: "rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 shadow-sm",
  glass: "rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-xl shadow-lg"
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'glass', 
  className = "", 
  hover = false, 
  layoutId, 
  onClick 
}) => {
  const baseStyles = variantStyles[variant];
  
  return (
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
      whileHover={hover ? { 
        y: -6, 
        scale: 1.005, 
        boxShadow: '0 30px 60px -12px var(--shadow-color)',
        borderColor: 'var(--primary)' 
      } : {}}
      whileTap={hover ? { scale: 0.99 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${baseStyles} transition-all ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ color: 'var(--text-main)' }}
    >
      {children}
    </motion.div>
  );
};