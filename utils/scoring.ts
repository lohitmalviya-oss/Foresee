
export const calculatePotentialReward = (userProb: number, crowdProb: number, streak: number): { total: number, loss: number, breakdown: any } => {
  const baseRep = 100;
  
  // Confidence scaling (normalized around 50)
  // Higher confidence = higher stakes (more gain, more potential loss)
  const confidenceMultiplier = 1 + (Math.abs(userProb - 50) / 50); 
  
  // Contrarian factor: Reward for being correct when the crowd is wrong
  const contrarianFactor = 1 + (Math.abs(userProb - crowdProb) / 100);
  
  // Streak Multiplier: Small consistency bonus remains for correct outcomes
  const streakMultiplier = 1 + (Math.floor(streak / 5) * 0.05);

  const potentialGain = Math.floor(baseRep * confidenceMultiplier * contrarianFactor * streakMultiplier);
  
  // Potential loss is a percentage of the potential gain, or a flat penalty scaled by confidence
  const potentialLoss = Math.floor(baseRep * 0.5 * confidenceMultiplier);
  
  return {
    total: potentialGain,
    loss: potentialLoss,
    breakdown: {
      confidence: confidenceMultiplier.toFixed(2),
      contrarian: contrarianFactor.toFixed(2),
      streak: streakMultiplier.toFixed(2)
    }
  };
};
