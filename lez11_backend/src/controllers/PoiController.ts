import type { NextFunction, Request, Response } from 'express';
import { PoiService } from '../services/PoiService';
import { AppError } from '../utils/AppError';
import type { PoiPayload } from '../validation/schemas';

function parseId(value: string): number {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) throw new AppError(400, 'ID non valido');
  return id;
}

export class PoiController {
  constructor(private readonly service = new PoiService()) {}

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json(await this.service.getAll()); } catch (e) { next(e); }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Array.isArray(req.params.id)
                    ? req.params.id[0]
                    : req.params.id
    
    try { res.json(await this.service.getById(parseId(id))); } catch (e) { next(e); }
  };

  getFull = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Array.isArray(req.params.id)
                    ? req.params.id[0]
                    : req.params.id
    
    try { res.json(await this.service.getById(parseId(id), true)); } catch (e) { next(e); }
  };

  create = async (req: Request<unknown, unknown, PoiPayload>, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(201).json(await this.service.create(req.body)); } catch (e) { next(e); }
  };

  update = async (req: Request<{ id: string }, unknown, PoiPayload>, res: Response, next: NextFunction): Promise<void> => {
    try { res.json(await this.service.update(parseId(req.params.id), req.body)); } catch (e) { next(e); }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Array.isArray(req.params.id)
                    ? req.params.id[0]
                    : req.params.id
    
    try { await this.service.delete(parseId(id)); res.status(204).send(); } catch (e) { next(e); }
  };
}
