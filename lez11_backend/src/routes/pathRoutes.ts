import { Router } from 'express';
import { PathController } from '../controllers/PathController';
import { validateBody } from '../middleware/validate';
import { pathPayloadSchema } from '../validation/schemas';

const controller = new PathController();
export const pathRouter = Router();

pathRouter.get('/', controller.getAll);
pathRouter.get('/:id/full', controller.getFull);
pathRouter.get('/:id', controller.getById);
pathRouter.post('/', validateBody(pathPayloadSchema), controller.create);
pathRouter.put('/:id', validateBody(pathPayloadSchema), controller.update);
pathRouter.delete('/:id', controller.delete);
