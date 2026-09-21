import type { Path } from './Path';

export class Poi {
  id?: number;
  nome?: string;
  descrizione?: string;
  indirizzo?: string;
  tipo?: string;
  lat?: number;
  lon?: number;
  pathList?: Path[];
}
