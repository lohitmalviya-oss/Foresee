import { Router } from 'express';
import * as authController from '../modules/auth/auth.controller';
import * as predictionController from '../modules/prediction/prediction.controller';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Prediction Routes
router.get('/predictions', predictionController.getPredictions);
router.post('/predict', protect, predictionController.submitVote);

// Leaderboard Mock
router.get('/leaderboard', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { rank: 1, username: 'Oracle_01', accuracy: 98, reputation: 15000 },
      { rank: 2, username: 'QuantMaster', accuracy: 95, reputation: 12000 },
    ]
  });
});

export default router;