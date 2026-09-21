import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { DataSource } from 'typeorm';
import { CategoryEntitySchema, PathEntitySchema, PoiEntitySchema } from '../models/entities';

function resolveDatabasePath(): string {
  const configured = process.env.SQLITE_PATH ?? './data/database.sqlite';
  return path.isAbsolute(configured) ? configured : path.resolve(process.cwd(), configured);
}

const databasePath = resolveDatabasePath();
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  synchronize: true,
  logging: false,
  entities: [PoiEntitySchema, PathEntitySchema, CategoryEntitySchema]
});

export { databasePath };
