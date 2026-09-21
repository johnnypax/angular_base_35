import { Poi } from "./poi"

export class Path {
    id?: number             // .../percorso/2
    nome?: string
    poiList?: Poi[]
    categorie: string[] = []
}
