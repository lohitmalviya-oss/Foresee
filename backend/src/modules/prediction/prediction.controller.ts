import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
import { PredictionService } from './prediction.service';

// Fix: Use 'any' for res to resolve "Property 'status' does not exist" error
export const getPredictions = async (req: any, res: any, next: NextFunction) => {
  try {
    const data = await PredictionService.getAll();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

// Fix: Use 'any' for req and res to bypass type resolution issues for body, user, and status
export const submitVote = async (req: any, res: any, next: NextFunction) => {
  try {
    // The body property is now correctly available as req is typed with any
    const { predictionId, probability } = req.body;
    const userId = req.user!.id;

    const result = await PredictionService.createVote(userId, predictionId, probability);

    res.status(200).json({
      status: 'success',
      message: 'Vote synchronized to network',
      data: result
    });
  } catch (error) {
    next(error);
  }
};