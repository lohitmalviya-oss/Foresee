/**
 * Foresee Reputation Calculation Service
 * Implements the core logic for rewarding accurate predictions
 */
export class ReputationService {
  /**
   * Calculate potential reputation reward based on accuracy and market conditions
   */
  static calculateReward(params: {
    userProbability: number;
    crowdProbability: number;
    outcome: boolean;
    streak: number;
  }) {
    const { userProbability, crowdProbability, outcome, streak } = params;
    
    // Base reward
    const baseRep = 100;

    // Accuracy Factor: How close was the user's prediction to reality?
    // If outcome is true, userProb should be high. If false, userProb should be low.
    const accuracy = outcome ? userProbability / 100 : (100 - userProbability) / 100;
    
    // Contrarian Bonus: Higher rewards for correctly predicting against the crowd
    const crowdDiff = Math.abs(userProbability - crowdProbability) / 100;
    const contrarianMultiplier = 1 + crowdDiff;

    // Streak Multiplier: Reward consistency
    const streakMultiplier = 1 + (Math.floor(streak / 5) * 0.1);

    // Final Calculation
    const reward = Math.floor(baseRep * accuracy * contrarianMultiplier * streakMultiplier);

    return {
      total: reward,
      breakdown: {
        base: baseRep,
        accuracy: accuracy.toFixed(2),
        contrarian: contrarianMultiplier.toFixed(2),
        streak: streakMultiplier.toFixed(2)
      }
    };
  }
}