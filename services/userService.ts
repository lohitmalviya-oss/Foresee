
import { UserProfile, Category } from '../types/index';

const MOCK_USER: UserProfile = {
  id: 'user_123',
  username: 'AlphaForecaster',
  reputation: 15420,
  accuracy: 88,
  accuracyDelta: 2.4,
  percentile: 96,
  contrarianWins: 12,
  streak: 8,
  rank: 42,
  level: 'Strategist',
  tierScore: 65,
  predictionsCount: 145,
  referralCode: 'FORESEE-88',
  expertise: {
    Politics: 92,
    Science: 45,
    Sports: 78,
    Economy: 85,
    Culture: 30
  },
  history: [
    {
      // Added id and category to match UserHistoryItem type
      id: 'h1',
      date: '2024-05-15',
      accuracy: 90,
      question: 'Will BTC exceed $70k by June?',
      prediction: 'Yes',
      status: 'Correct',
      reward: 450,
      category: 'Economy'
    },
    {
      // Added id and category to match UserHistoryItem type
      id: 'h2',
      date: '2024-05-10',
      accuracy: 85,
      question: 'Will India win the ICC Trophy?',
      prediction: 'Yes',
      status: 'Pending',
      reward: 0,
      category: 'Sports'
    }
  ]
};

export const userService = {
  getUserProfile: async (userId: string): Promise<UserProfile | null> => {
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_USER;
  },

  createProfile: async (id: string, username: string) => {
    console.log('Mock: Creating profile for', username);
    return { success: true };
  }
};
