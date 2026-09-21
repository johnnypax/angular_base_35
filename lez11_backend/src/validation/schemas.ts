import { z } from 'zod';

const optionalText = z.string().trim().min(1).optional().nullable();

export const poiPayloadSchema = z.object({
  nome: z.string().trim().min(1, 'nome è obbligatorio'),
  descrizione: optionalText,
  indirizzo: optionalText,
  tipo: optionalText,
  lat: z.number().min(-90).max(90).optional().nullable(),
  lon: z.number().min(-180).max(180).optional().nullable()
}).strict();

export const pathPayloadSchema = z.object({
  nome: z.string().trim().min(1, 'nome è obbligatorio'),
  categorie: z.array(z.string().trim().min(1)).default([]),
  poiIds: z.array(z.number().int().positive()).min(1, 'Un Path deve contenere almeno un POI')
}).strict();

export type PoiPayload = z.infer<typeof poiPayloadSchema>;
export type PathPayload = z.infer<typeof pathPayloadSchema>;
