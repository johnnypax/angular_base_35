import { AppDataSource } from '../database/dataSource';
import { PoiEntity } from '../models/entities';
import type { PoiPayload } from '../validation/schemas';

export class PoiRepository {
  private readonly repo = AppDataSource.getRepository<PoiEntity>('PoiEntity');

  findAll(): Promise<PoiEntity[]> {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  findById(id: number, full = false): Promise<PoiEntity | null> {
    return this.repo.findOne({
      where: { id },
      relations: full ? { paths: { categories: true } } : undefined
    });
  }

  create(payload: PoiPayload): Promise<PoiEntity> {
    return this.repo.save(this.repo.create({
      nome: payload.nome,
      descrizione: payload.descrizione ?? null,
      indirizzo: payload.indirizzo ?? null,
      tipo: payload.tipo ?? null,
      lat: payload.lat ?? null,
      lon: payload.lon ?? null
    }));
  }

  async update(entity: PoiEntity, payload: PoiPayload): Promise<PoiEntity> {
    entity.nome = payload.nome;
    entity.descrizione = payload.descrizione ?? null;
    entity.indirizzo = payload.indirizzo ?? null;
    entity.tipo = payload.tipo ?? null;
    entity.lat = payload.lat ?? null;
    entity.lon = payload.lon ?? null;
    return this.repo.save(entity);
  }

  remove(entity: PoiEntity): Promise<PoiEntity> {
    return this.repo.remove(entity);
  }
}
