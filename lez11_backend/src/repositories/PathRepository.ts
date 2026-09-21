import { In } from 'typeorm';
import { AppDataSource } from '../database/dataSource';
import { CategoryEntity, PathEntity, PoiEntity } from '../models/entities';

export class PathRepository {
  private readonly pathRepo = AppDataSource.getRepository<PathEntity>('PathEntity');
  private readonly poiRepo = AppDataSource.getRepository<PoiEntity>('PoiEntity');
  private readonly categoryRepo = AppDataSource.getRepository<CategoryEntity>('CategoryEntity');

  findAll(): Promise<PathEntity[]> {
    return this.pathRepo.find({ relations: { categories: true }, order: { id: 'ASC' } });
  }

  findById(id: number, full = false): Promise<PathEntity | null> {
    return this.pathRepo.findOne({
      where: { id },
      relations: full ? { pois: true, categories: true } : { categories: true }
    });
  }

  findPoisByIds(ids: number[]): Promise<PoiEntity[]> {
    return this.poiRepo.findBy({ id: In(ids) });
  }

  async findOrCreateCategories(names: string[]): Promise<CategoryEntity[]> {
    const uniqueNames = [...new Set(names)];
    const categories: CategoryEntity[] = [];
    for (const nome of uniqueNames) {
      let category = await this.categoryRepo.findOne({ where: { nome } });
      if (!category) {
        category = await this.categoryRepo.save(this.categoryRepo.create({ nome }));
      }
      categories.push(category);
    }
    return categories;
  }

  create(nome: string, pois: PoiEntity[], categories: CategoryEntity[]): Promise<PathEntity> {
    return this.pathRepo.save(this.pathRepo.create({ nome, pois, categories }));
  }

  async update(entity: PathEntity, nome: string, pois: PoiEntity[], categories: CategoryEntity[]): Promise<PathEntity> {
    entity.nome = nome;
    entity.pois = pois;
    entity.categories = categories;
    return this.pathRepo.save(entity);
  }

  remove(entity: PathEntity): Promise<PathEntity> {
    return this.pathRepo.remove(entity);
  }

  async countPathsWherePoiIsOnlyPoi(poiId: number): Promise<number> {
    const rows = await AppDataSource.query(
      `SELECT COUNT(*) AS count
       FROM path_poi pp
       WHERE pp.poi_id = ?
         AND (SELECT COUNT(*) FROM path_poi pp2 WHERE pp2.path_id = pp.path_id) = 1`,
      [poiId]
    ) as Array<{ count: number }>;
    return Number(rows[0]?.count ?? 0);
  }
}
