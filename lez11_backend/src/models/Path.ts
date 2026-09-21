import type { Poi } from './Poi';

export class Path {
  id?: number;
  nome?: string;
  poiList?: Poi[];
  categorie: string[] = [];
}
