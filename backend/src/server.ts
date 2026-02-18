import app from './app';
import { config } from './config/env';

const server = app.listen(config.port, () => {
  console.log(`
  🚀 Foresee Backend Running
  --------------------------
  Port: ${config.port}
  Env:  ${config.nodeEnv}
  Url:  http://localhost:${config.port}/api/v1
  --------------------------
  `);
});

// Fix: Cast process to any to access Node.js event emitter methods when global type definitions are restricted
(process as any).on('unhandledRejection', (err: any) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    // Fix: Cast process to any to bypass typing issues for exit method
    (process as any).exit(1);
  });
});