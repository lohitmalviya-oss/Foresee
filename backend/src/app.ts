import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import routes from './routes';
import { errorMiddleware } from './middleware/errorMiddleware';
import { apiLimiter } from './middleware/rateLimiter';

const app = express();

// Security Middlewares
// Fix: Cast helmet to any to resolve middleware type compatibility issues
app.use(helmet() as any);
// Fix: Cast cors to any to resolve middleware type compatibility issues
app.use(cors({ origin: config.corsOrigin }) as any);
// Fix: Cast express.json to any to resolve middleware type compatibility issues
app.use(express.json({ limit: '10kb' }) as any);

// Rate Limiting
// Fix: Cast apiLimiter to any to resolve RequestHandler type compatibility issues in app.use
app.use('/api', apiLimiter as any);

// Health Check
app.get('/health', (req, res) => res.status(200).send('OK'));

// API Routes
app.use('/api/v1', routes);

// Global Error Handling
app.use(errorMiddleware);

export default app;