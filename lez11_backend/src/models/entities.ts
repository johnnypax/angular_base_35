import { EntitySchema } from 'typeorm';

export interface PoiEntity {
  id: number;
  nome: string;
  descrizione: string | null;
  indirizzo: string | null;
  tipo: string | null;
  lat: number | null;
  lon: number | null;
  paths?: PathEntity[];
}

export interface CategoryEntity {
  id: number;
  nome: string;
  paths?: PathEntity[];
}

export interface PathEntity {
  id: number;
  nome: string;
  pois?: PoiEntity[];
  categories?: CategoryEntity[];
}

export const PoiEntitySchema = new EntitySchema<PoiEntity>({
  name: 'PoiEntity',
  tableName: 'poi',
  columns: {
    id: { type: Number, primary: true, generated: true },
    nome: { type: String, unique: true },
    descrizione: { type: String, nullable: true },
    indirizzo: { type: String, nullable: true },
    tipo: { type: String, nullable: true },
    lat: { type: 'real', nullable: true },
    lon: { type: 'real', nullable: true }
  },
  relations: {
    paths: {
      type: 'many-to-many',
      target: 'PathEntity',
      inverseSide: 'pois'
    }
  }
});

export const CategoryEntitySchema = new EntitySchema<CategoryEntity>({
  name: 'CategoryEntity',
  tableName: 'category',
  columns: {
    id: { type: Number, primary: true, generated: true },
    nome: { type: String, unique: true }
  },
  relations: {
    paths: {
      type: 'many-to-many',
      target: 'PathEntity',
      inverseSide: 'categories'
    }
  }
});

export const PathEntitySchema = new EntitySchema<PathEntity>({
  name: 'PathEntity',
  tableName: 'path',
  columns: {
    id: { type: Number, primary: true, generated: true },
    nome: { type: String, unique: true }
  },
  relations: {
    pois: {
      type: 'many-to-many',
      target: 'PoiEntity',
      cascade: false,
      joinTable: {
        name: 'path_poi',
        joinColumn: { name: 'path_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'poi_id', referencedColumnName: 'id' }
      }
    },
    categories: {
      type: 'many-to-many',
      target: 'CategoryEntity',
      cascade: false,
      joinTable: {
        name: 'path_category',
        joinColumn: { name: 'path_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' }
      }
    }
  }
});
