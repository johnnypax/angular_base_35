import type { Path } from '../models/Path';
import type { PathEntity } from '../models/entities';
import { PathRepository } from '../repositories/PathRepository';
import type { PathPayload } from '../validation/schemas';
import { AppError } from '../utils/AppError';

function toPath(entity: PathEntity, full = false): Path {
  return {
    id: entity.id,
    nome: entity.nome,
    categorie: (entity.categories ?? []).map((c) => c.nome),
    ...(full ? {
      poiList: (entity.pois ?? []).map((p) => ({
        id: p.id,
        nome: p.nome,
        descrizione: p.descrizione ?? undefined,
        indirizzo: p.indirizzo ?? undefined,
        tipo: p.tipo ?? undefined,
        lat: p.lat ?? undefined,
        lon: p.lon ?? undefined
      }))
    } : {})
  };
}

export class PathService {
  constructor(private readonly repository = new PathRepository()) {}

  async getAll(): Promise<Path[]> {
    return (await this.repository.findAll()).map((p) => toPath(p));
  }

  async getById(id: number, full = false): Promise<Path> {
    const entity = await this.repository.findById(id, full);
    if (!entity) throw new AppError(404, 'Path non trovato');
    return toPath(entity, full);
  }

  private async resolveRelations(payload: PathPayload) {
    const uniquePoiIds = [...new Set(payload.poiIds)];
    if (uniquePoiIds.length === 0) {
      throw new AppError(400, 'Un Path deve contenere almeno un POI');
    }

    const pois = await this.repository.findPoisByIds(uniquePoiIds);
    if (pois.length !== uniquePoiIds.length) {
      const found = new Set(pois.map((p) => p.id));
      const missing = uniquePoiIds.filter((id) => !found.has(id));
      throw new AppError(400, `POI inesistenti: ${missing.join(', ')}`);
    }

    const categories = await this.repository.findOrCreateCategories(payload.categorie);
    return { pois, categories };
  }

  async create(payload: PathPayload): Promise<Path> {
    const { pois, categories } = await this.resolveRelations(payload);
    return toPath(await this.repository.create(payload.nome, pois, categories), true);
  }

  async update(id: number, payload: PathPayload): Promise<Path> {
    const entity = await this.repository.findById(id, true);
    if (!entity) throw new AppError(404, 'Path non trovato');
    const { pois, categories } = await this.resolveRelations(payload);
    return toPath(await this.repository.update(entity, payload.nome, pois, categories), true);
  }

  async delete(id: number): Promise<void> {
    const entity = await this.repository.findById(id, true);
    if (!entity) throw new AppError(404, 'Path non trovato');
    await this.repository.remove(entity);
  }
}
