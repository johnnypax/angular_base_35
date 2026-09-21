# Path / POI REST API

Backend Node.js + TypeScript + Express + TypeORM + SQLite conforme al DOC REQ. Implementa una separazione 3-tier (Controller/Router → Service → Repository/ORM → SQLite), CRUD per POI e Path, relazioni many-to-many, categorie normalizzate, seed idempotente, validazione, CORS, healthcheck e containerizzazione.

## Struttura

```text
src/
├── controllers/
├── database/
├── middleware/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── validation/
├── app.ts
└── server.ts
docs/
├── curl-examples.sh
└── use-cases.puml
Dockerfile
docker-compose.yml
```

## Avvio locale

```bash
cp .env.example .env
npm install
npm run dev
```

Build production locale:

```bash
npm run build
npm start
```

Il DB viene creato in `./data/database.sqlite` per default. La posizione è configurabile con `SQLITE_PATH`.

## Seed

Al primo avvio vengono inseriti almeno 15 POI e 5 Path realistici. Il seed è idempotente e usa nomi univoci per evitare duplicazioni. Alcuni POI, come Pantheon e Piazza Navona, appartengono a più Path.

## Endpoint

| Metodo | Endpoint | Descrizione |
|---|---|---|
| GET | `/health` | Stato API e accesso DB |
| GET | `/poi` | Elenco POI senza `pathList` |
| GET | `/poi/:id` | Dettaglio POI senza `pathList` |
| GET | `/poi/:id/full` | POI con `pathList`, senza ricorsione |
| POST | `/poi` | Crea POI |
| PUT | `/poi/:id` | Aggiorna POI |
| DELETE | `/poi/:id` | Elimina POI, se non viola l'invariante Path ≥ 1 POI |
| GET | `/path` | Elenco Path senza `poiList` |
| GET | `/path/:id` | Dettaglio Path senza `poiList` |
| GET | `/path/:id/full` | Path con `poiList`, senza ricorsione |
| POST | `/path` | Crea Path |
| PUT | `/path/:id` | Aggiorna Path, categorie e POI |
| DELETE | `/path/:id` | Elimina Path e sole associazioni |

### Esempio POST Path

```bash
curl -X POST http://localhost:3000/path \
  -H 'Content-Type: application/json' \
  -d '{"nome":"Percorso Archeologico","categorie":["Storia","Arte"],"poiIds":[1,2,5]}'
```

Il backend rifiuta `poiIds: []`, rimuove duplicati in `poiIds`, verifica l'esistenza di tutti i POI e restituisce `400` se il payload viola i vincoli.

## Docker

Build e run diretto:

```bash
docker build -t path-api .
docker run --rm -p 3000:3000 -v path-data:/app/data path-api
```

Con Docker Compose:

```bash
docker compose up --build
```

In background:

```bash
docker compose up -d --build
```

Stop senza eliminare il DB:

```bash
docker compose down
```

Reset volontario del DB e del volume:

```bash
docker compose down -v
```

Verifica container e healthcheck:

```bash
docker compose ps
docker inspect --format='{{json .State.Health}}' $(docker compose ps -q api)
curl http://localhost:3000/health
```

Il volume `path-data` è montato in `/app/data`, quindi la ricreazione del container non elimina il database SQLite.

## Casi d'uso UML

Il file `docs/use-cases.puml` contiene il diagramma PlantUML. `Creare Path` e `Modificare Path` includono l'associazione dei POI, la gestione categorie e la validazione di almeno un POI. I casi d'uso “full” estendono i rispettivi casi di dettaglio.

## Esempi curl

`docs/curl-examples.sh` raccoglie i principali test manuali. Richiede `jq` solo per formattare le risposte.

## Note sui vincoli

- `Path` deve avere sempre almeno un POI.
- La join table `path_poi` impedisce duplicazioni della stessa associazione.
- L'eliminazione di un Path non elimina i POI.
- L'eliminazione di un POI viene bloccata se lascerebbe un Path senza POI.
- Le risposte JSON “full” sono sagomate dal Service per evitare riferimenti circolari.
- `synchronize: true` è usato per rendere il laboratorio auto-contenuto. In un progetto enterprise si consiglierebbero migrazioni TypeORM versionate.
