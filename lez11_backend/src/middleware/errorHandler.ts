import type { NextFunction, Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { AppError } from '../utils/AppError';

export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(404, `Risorsa non trovata: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message, details: err.details });
    return;
  }

  if (err instanceof QueryFailedError) {
    const message = err.message.toLowerCase();
    if (message.includes('unique constraint')) {
      res.status(400).json({ error: 'Violazione di un vincolo di unicità' });
      return;
    }
  }

  console.error(err);
  res.status(500).json({ error: 'Errore interno del server' });
}
