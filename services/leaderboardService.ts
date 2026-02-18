
import { LeaderboardEntry } from '../types/index';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  // Added id property to match LeaderboardEntry type
  { id: 'lb1', name: 'FutureSight', acc: '89.2%', rep: 45210, streak: 42, color: 'text-amber-400', tier: 'Oracle' },
  { id: 'lb2', name: 'CrystalBall_01', acc: '87.5%', rep: 38900, streak: 21, color: 'text-slate-300', tier: 'Strategist' },
  { id: 'lb3', name: 'EchoNode', acc: '85.4%', rep: 32400, streak: 15, color: 'text-indigo-400', tier: 'Analyst' },
  { id: 'lb4', name: 'TrendHunter', acc: '84.2%', rep: 28100, streak: 5, color: 'text-slate-400', tier: 'Expert' },
  { id: 'lb5', name: 'WeeklyProphet', acc: '82.5%', rep: 25980, streak: 7, color: 'text-slate-400', tier: 'Expert' }
];

export const leaderboardService = {
  getTopForecasters: async (limit: number = 100) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_LEADERBOARD.slice(0, limit);
  }
};
