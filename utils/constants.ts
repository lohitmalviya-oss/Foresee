
import { Tier } from '../types/index';

export const APP_CONFIG = {
  NAME: 'Foresee',
  VERSION: '1.2.0',
  TICKER_SPEED: 1.5,
  BASE_REP_REWARD: 100,
};

export const TIERS: Tier[] = [
  { name: 'Emerging Forecaster', min: 0, color: 'text-slate-400', badge: '🌱' },
  { name: 'Active Forecaster', min: 500, color: 'text-blue-500', badge: '📈' },
  { name: 'Established Forecaster', min: 1500, color: 'text-indigo-500', badge: '🛡️' },
  { name: 'Senior Forecaster', min: 3000, color: 'text-violet-600', badge: '🏛️' },
  { name: 'Elite Forecaster', min: 6000, color: 'text-amber-500', badge: '💎' },
];
