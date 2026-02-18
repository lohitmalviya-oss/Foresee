
import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundMesh: React.FC = () => (
  <div className="fixed inset-0 -z-50 overflow-hidden bg-[#f8fafc]">
    <motion.div 
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-200/40 blur-[150px] rounded-full" 
    />
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-emerald-200/30 blur-[150px] rounded-full" 
    />
  </div>
);