
export type Category = 'Politics' | 'Science' | 'Sports' | 'Culture' | 'Economy' | 'Stock Market';

export interface Prediction {
  id: string;
  question: string;
  description?: string;
  category: Category;
  expiresAt: Date;
  createdAt: Date;
  probability: number; 
  totalPredictions: number;
  predictionsLast24h?: number;
  tags: string[];
  resolved: boolean;
  outcome?: boolean;
  imageUrl?: string;
}

export interface ExpertiseRating {
  category: Category;
  score: number;
}

export interface UserHistoryItem {
  id: string;
  date: string;
  accuracy: number;
  question: string;
  prediction: string;
  status: 'Correct' | 'Incorrect' | 'Pending';
  reward: number;
  category: Category;
}

export interface UserProfile {
  id: string;
  username: string;
  reputation: number;
  accuracy: number;
  accuracyDelta: number;
  percentile: number;
  contrarianWins: number;
  streak: number;
  rank: number;
  level: string;
  tierScore: number; 
  predictionsCount: number;
  referralCode: string;
  expertise: Record<string, number>; 
  history: UserHistoryItem[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  acc: string;
  rep: number;
  streak: number;
  color: string;
  tier: string;
  expertise?: Record<string, number>;
  totalForecasts?: number;
}

export interface Tier {
  name: string;
  min: number;
  color: string;
  badge: string;
}
