
export const calculatePotentialReward = (userProb: number, crowdProb: number, streak: number, isEarly: boolean): { total: number, breakdown: any } => {
  const baseRep = 100;
  // Confidence scaling (normalized around 50)
  const confidenceMultiplier = 1 + (Math.abs(userProb - 50) / 50); 
  // Contrarian Bonus: Reward for being different from the crowd
  const contrarianBonus = 1 + (Math.abs(userProb - crowdProb) / 100);
  // Early Bird Bonus
  const earlyMultiplier = isEarly ? 1.2 : 1.0;
  // Streak Multiplier: +5% gain for every 5 days of streak
  const streakMultiplier = 1 + (Math.floor(streak / 5) * 0.05);

  const total = Math.floor(baseRep * confidenceMultiplier * contrarianBonus * earlyMultiplier * streakMultiplier);
  
  return {
    total,
    breakdown: {
      confidence: confidenceMultiplier.toFixed(2),
      contrarian: contrarianBonus.toFixed(2),
      early: earlyMultiplier.toFixed(2),
      streak: streakMultiplier.toFixed(2)
    }
  };
};
