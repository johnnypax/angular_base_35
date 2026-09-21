import type { Poi } from '../models/Poi';
import type { PoiEntity } from '../models/entities';
import { PathRepository } from '../repositories/PathRepository';
import { PoiRepository } from '../repositories/PoiRepository';
import type { PoiPayload } from '../validation/schemas';
import { AppError } from '../utils/AppError';

function toPoi(entity: PoiEntity, full = false): Poi {
  return {
    id: entity.id,
    nome: entity.nome,
    descrizione: entity.descrizione ?? undefined,
    indirizzo: entity.indirizzo ?? undefined,
    tipo: entity.tipo ?? undefined,
    lat: entity.lat ?? undefined,
    lon: entity.lon ?? undefined,
    ...(full ? {
      pathList: (entity.paths ?? []).map((p) => ({
        id: p.id,
        nome: p.nome,
        categorie: (p.categories ?? []).map((c) => c.nome)
      }))
    } : {})
  };
}

export class PoiService {
  constructor(
    private readonly poiRepository = new PoiRepository(),
    private readonly pathRepository = new PathRepository()
  ) {}

  async getAll(): Promise<Poi[]> {
    return (await this.poiRepository.findAll()).map((p) => toPoi(p));
  }

  async getById(id: number, full = false): Promise<Poi> {
    const entity = await this.poiRepository.findById(id, full);
    if (!entity) throw new AppError(404, 'POI non trovato');
    return toPoi(entity, full);
  }

  async create(payload: PoiPayload): Promise<Poi> {
    return toPoi(await this.poiRepository.create(payload));
  }

  async update(id: number, payload: PoiPayload): Promise<Poi> {
    const entity = await this.poiRepository.findById(id);
    if (!entity) throw new AppError(404, 'POI non trovato');
    return toPoi(await this.poiRepository.update(entity, payload));
  }

  async delete(id: number): Promise<void> {
    const entity = await this.poiRepository.findById(id);
    if (!entity) throw new AppError(404, 'POI non trovato');

    const affectedPaths = await this.pathRepository.countPathsWherePoiIsOnlyPoi(id);
    if (affectedPaths > 0) {
      throw new AppError(400, 'Impossibile eliminare il POI: almeno un Path rimarrebbe senza POI');
    }
    await this.poiRepository.remove(entity);
  }
}
