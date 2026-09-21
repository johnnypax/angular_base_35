import { Router } from 'express';
import { PoiController } from '../controllers/PoiController';
import { validateBody } from '../middleware/validate';
import { poiPayloadSchema } from '../validation/schemas';

const controller = new PoiController();
export const poiRouter = Router();

poiRouter.get('/', controller.getAll);
poiRouter.get('/:id/full', controller.getFull);
poiRouter.get('/:id', controller.getById);
poiRouter.post('/', validateBody(poiPayloadSchema), controller.create);
poiRouter.put('/:id', validateBody(poiPayloadSchema), controller.update);
poiRouter.delete('/:id', controller.delete);
