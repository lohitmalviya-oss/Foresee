import { AppError } from '../../middleware/errorMiddleware';

export class PredictionService {
  private static mockPredictions = [
    { id: '1', question: 'Will BTC hit 100k in 2024?', category: 'Economy', probability: 45 },
    { id: '2', question: 'Will India win the T20 World Cup?', category: 'Sports', probability: 60 },
  ];

  static async getAll() {
    return this.mockPredictions;
  }

  static async createVote(userId: string, predictionId: string, probability: number) {
    const prediction = this.mockPredictions.find(p => p.id === predictionId);
    if (!prediction) throw new AppError(404, 'Prediction node not found');

    // Here you would normally save to DB
    return {
      userId,
      predictionId,
      userProbability: probability,
      timestamp: new Date().toISOString()
    };
  }
}