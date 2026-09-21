import cors from 'cors';
import express from 'express';
import { AppDataSource } from './database/dataSource';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { pathRouter } from './routes/pathRoutes';
import { poiRouter } from './routes/poiRoutes';

export function createApp() {
  const app = express();
  const origin = process.env.CORS_ORIGIN ?? '*';

  app.use(cors({ origin: origin === '*' ? true : origin.split(',').map((v) => v.trim()) }));
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', async (_req, res, next) => {
    try {
      await AppDataSource.query('SELECT 1');
      res.json({ status: 'UP', database: 'UP' });
    } catch (error) {
      next(error);
    }
  });

  app.use('/poi', poiRouter);
  app.use('/path', pathRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
