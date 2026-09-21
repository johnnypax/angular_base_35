## Obiettivo
Realizzare una componente backend di una architettura 3 tier, con SQLite storage per la gestione di percorsi. Ogni percorso (path) è caratterizzato da uno o più POI ed un POI può essere incluso in uno o più percorsi.

I modelli a cui ti devi attenere sono:

export class Poi {
    id?: number
    nome?: string
    descrizione?: string
    indirizzo?: string
    tipo?: string
    lat?: number
    lon?: number
    pathList?: Path[]
}

e 

export class Path {
    id?: number
    nome?: string
    poiList?: Poi[]
    categorie: string[] = []
}

## Tecnologia
- Linguaggio di programmazione: TypeScript
- Engine: NodeJS
- Database SQLite

## Specifiche

- Voglio che all'interno del DB, alla prima inizializzazione siano presenti almeno 5 percorsi e 15 POI.

## Vincoli
- Un path deve avere almeno un Poi

## Gli endpoint che voglio sono:
- TUtte le CRUD
- GET - /poi/2 -> dettaglio del POI senza includere i percorsi
- GET - /poi/2/full -> dettaglio del POI includendo i percorsi
- GET - /path/3 -> dettaglio del Path senza includere i POI
- GET - /path/3/full -> dettaglio del Path includendo i POI