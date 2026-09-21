- ## Obiettivo

  Realizza il **backend REST API** di un'applicazione basata su architettura **3-tier**, dedicata alla gestione di **percorsi (`Path`)** e **punti di interesse (`Poi`)**.

  Il backend deve utilizzare **SQLite** come storage persistente.

  La relazione tra le entità è **many-to-many**:

  - un `Path` contiene uno o più `Poi`;
  - un `Poi` può appartenere a uno o più `Path`.

  Il progetto deve essere progettato in modo chiaro, modulare e facilmente utilizzabile da un frontend separato.

  ------

  ## Modelli applicativi

  Mantieni la struttura concettuale dei seguenti modelli TypeScript.

  ### Poi

  ```typescript
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
  ```

  ### Path

  ```typescript
  export class Path {
      id?: number;
      nome?: string;
      poiList?: Poi[];
      categorie: string[] = [];
  }
  ```

  La struttura del database può essere adattata alle esigenze relazionali, purché le API espongano oggetti compatibili con questi modelli.

  ------

  ## Stack tecnologico

  Utilizza:

  - TypeScript
  - Node.js
  - Express
  - SQLite
  - un ORM/query builder adatto a TypeScript, preferibilmente Prisma, TypeORM oppure una soluzione equivalente
  - API REST con payload JSON
  - Docker
  - Docker Compose

  Configura il progetto affinché possa essere avviato localmente tramite:

  ```bash
  npm install
  npm run dev
  ```

  e anche tramite:

  ```bash
  npm run build
  npm start
  ```

  Il progetto deve inoltre poter essere eseguito completamente tramite Docker.

  ------

  ## Architettura

  Organizza il progetto seguendo una separazione a livelli coerente con una architettura 3-tier.

  Utilizza almeno i seguenti livelli:

  ```text
  Presentation Layer
      Controller / Router REST
  
  Business Layer
      Service
  
  Data Access Layer
      Repository / ORM
  
  Database
      SQLite
  ```

  Evita di inserire direttamente query SQL o logica di persistenza nei controller.

  Una possibile struttura del progetto è:

  ```text
  src/
  ├── controllers/
  ├── services/
  ├── repositories/
  ├── routes/
  ├── models/
  ├── database/
  ├── middleware/
  ├── app.ts
  └── server.ts
  ```

  ------

  ## Modello relazionale

  Implementa almeno le seguenti strutture logiche:

  ```text
  POI
  ---
  id
  nome
  descrizione
  indirizzo
  tipo
  lat
  lon
  
  PATH
  ----
  id
  nome
  
  PATH_POI
  --------
  path_id
  poi_id
  ```

  Dato che `categorie` è una collezione, modellala correttamente nel database.

  Puoi ad esempio utilizzare:

  ```text
  CATEGORY
  --------
  id
  nome
  
  PATH_CATEGORY
  -------------
  path_id
  category_id
  ```

  oppure un'altra soluzione normalizzata equivalente.

  Non memorizzare `categorie` come stringa concatenata se è possibile evitarlo.

  ------

  ## Vincoli di dominio

  Applica i seguenti vincoli:

  1. Un `Path` deve contenere almeno un POI.
  2. Lo stesso POI non deve essere associato due volte allo stesso percorso.
  3. Le associazioni many-to-many devono essere mantenute correttamente durante creazione, aggiornamento e cancellazione.
  4. Se un'entità richiesta non esiste, restituisci HTTP `404`.
  5. In caso di dati non validi, restituisci HTTP `400`.
  6. Le operazioni di creazione devono restituire HTTP `201`.
  7. Le eliminazioni riuscite possono restituire HTTP `204`.
  8. Non permettere la creazione di un Path con `poiList` vuota.

  ------

  ## Inizializzazione database

  Alla prima inizializzazione del database inserisci automaticamente dei dati di esempio.

  Devono essere presenti almeno:

  - 15 POI
  - 5 Path

  Ogni Path deve contenere almeno un POI.

  Almeno alcuni POI devono appartenere a più di un Path, così da dimostrare concretamente la relazione many-to-many.

  Utilizza dati realistici, ad esempio percorsi turistici e culturali con categorie come:

  ```text
  Arte
  Storia
  Musei
  Architettura
  Natura
  Enogastronomia
  ```

  La procedura di seed deve essere idempotente: riavviare l'applicazione non deve duplicare i dati.

  ------

  # API REST

  Implementa tutte le operazioni CRUD per `Poi` e `Path`.

  ## POI

  ### Elenco POI

  ```http
  GET /poi
  ```

  Restituisce tutti i POI.

  Per evitare riferimenti circolari, per default non deve includere `pathList`.

  ### Dettaglio POI

  ```http
  GET /poi/:id
  ```

  Esempio:

  ```http
  GET /poi/2
  ```

  Restituisce il POI richiesto senza includere i percorsi associati.

  ### Dettaglio completo POI

  ```http
  GET /poi/:id/full
  ```

  Esempio:

  ```http
  GET /poi/2/full
  ```

  Restituisce il POI includendo i percorsi ai quali appartiene.

  All'interno di `pathList` non includere nuovamente `poiList`, evitando quindi ricorsioni infinite.

  ### Creazione POI

  ```http
  POST /poi
  ```

  ### Aggiornamento POI

  ```http
  PUT /poi/:id
  ```

  ### Eliminazione POI

  ```http
  DELETE /poi/:id
  ```

  Gestisci correttamente eventuali associazioni esistenti con i Path.

  Un'operazione di cancellazione non deve lasciare relazioni inconsistenti nel database.

  ------

  # PATH

  ### Elenco percorsi

  ```http
  GET /path
  ```

  Restituisce tutti i percorsi senza includere `poiList`.

  ### Dettaglio Path

  ```http
  GET /path/:id
  ```

  Esempio:

  ```http
  GET /path/3
  ```

  Restituisce il percorso senza includere i POI.

  ### Dettaglio completo Path

  ```http
  GET /path/:id/full
  ```

  Esempio:

  ```http
  GET /path/3/full
  ```

  Restituisce il percorso includendo tutti i POI associati.

  All'interno dei POI non includere nuovamente `pathList`.

  ### Creazione Path

  ```http
  POST /path
  ```

  Payload indicativo:

  ```json
  {
    "nome": "Percorso Archeologico",
    "categorie": [
      "Storia",
      "Arte"
    ],
    "poiIds": [
      1,
      2,
      5
    ]
  }
  ```

  Deve essere presente almeno un elemento in `poiIds`.

  Valida che tutti i POI indicati esistano prima di creare il percorso.

  ### Aggiornamento Path

  ```http
  PUT /path/:id
  ```

  Deve permettere di modificare:

  - nome;
  - categorie;
  - POI associati.

  Anche dopo l'aggiornamento il Path deve contenere almeno un POI.

  ### Eliminazione Path

  ```http
  DELETE /path/:id
  ```

  La cancellazione del Path deve eliminare le associazioni con i POI, ma non deve cancellare i POI stessi.

  ------

  # Containerizzazione

  L'intera applicazione deve poter essere eseguita tramite **Docker** e **Docker Compose**.

  Genera sia un `Dockerfile` sia un file `docker-compose.yml`.

  ## Dockerfile

  Il `Dockerfile` deve:

  - utilizzare un'immagine ufficiale Node.js;
  - installare le dipendenze tramite `npm`;
  - compilare il progetto TypeScript;
  - avviare l'applicazione in modalità production;
  - esporre la porta HTTP dell'applicazione;
  - utilizzare una directory di lavoro dedicata;
  - copiare solamente i file necessari;
  - evitare, dove possibile, di includere dipendenze di sviluppo nell'immagine finale.

  Preferisci una build **multi-stage**, ad esempio separando:

  ```text
  builder
  runtime
  ```

  La fase `builder` deve:

  1. installare le dipendenze;
  2. compilare TypeScript;
  3. generare eventuali artefatti ORM necessari.

  La fase `runtime` deve contenere solamente quanto necessario per eseguire il backend.

  ------

  ## Persistenza SQLite in Docker

  Il database SQLite deve essere memorizzato in una directory separata, ad esempio:

  ```text
  /app/data
  ```

  Il file potrebbe essere:

  ```text
  /app/data/database.sqlite
  ```

  La posizione del database deve essere configurabile tramite variabile d'ambiente, ad esempio:

  ```text
  DATABASE_URL
  ```

  oppure:

  ```text
  SQLITE_PATH
  ```

  Il database **non deve essere perso quando il container viene eliminato e ricreato**.

  Per questo motivo configura un **Docker Volume** persistente.

  Ad esempio:

  ```text
  path-data:/app/data
  ```

  Il seed iniziale deve essere eseguito solo se necessario e deve mantenere il comportamento idempotente già richiesto.

  ------

  ## Docker Compose

  Genera un file:

  ```text
  docker-compose.yml
  ```

  che permetta di avviare l'intero backend con:

  ```bash
  docker compose up --build
  ```

  Il servizio applicativo può essere denominato:

  ```text
  api
  ```

  Il `docker-compose.yml` deve configurare almeno:

  - build tramite `Dockerfile`;
  - mapping della porta HTTP;
  - variabili d'ambiente;
  - volume persistente per SQLite;
  - restart policy;
  - eventuale healthcheck.

  Esempio concettuale:

  ```yaml
  services:
    api:
      build:
        context: .
        dockerfile: Dockerfile
      ports:
        - "3000:3000"
      environment:
        NODE_ENV: production
        SQLITE_PATH: /app/data/database.sqlite
      volumes:
        - path-data:/app/data
      restart: unless-stopped
  
  volumes:
    path-data:
  ```

  Adatta la configurazione al codice realmente generato.

  ------

  ## Healthcheck

  Implementa un endpoint:

  ```http
  GET /health
  ```

  che permetta di verificare che l'applicazione sia operativa.

  La risposta può essere ad esempio:

  ```json
  {
    "status": "UP"
  }
  ```

  Il `docker-compose.yml` deve utilizzare questo endpoint per configurare un healthcheck, quando possibile.

  Ad esempio:

  ```text
  GET http://localhost:3000/health
  ```

  L'healthcheck deve verificare almeno che:

  - il server HTTP risponda;
  - l'applicazione sia avviata correttamente;
  - opzionalmente sia possibile accedere al database SQLite.

  ------

  ## File .dockerignore

  Genera anche un file:

  ```text
  .dockerignore
  ```

  che escluda almeno:

  ```text
  node_modules
  dist
  .git
  .gitignore
  *.log
  .env
  coverage
  ```

  e altri file che non devono essere copiati nel build context Docker.

  ------

  ## Modalità di esecuzione

  Il progetto deve poter essere eseguito sia localmente sia tramite container.

  ### Esecuzione locale

  ```bash
  npm install
  npm run dev
  ```

  ### Build locale

  ```bash
  npm run build
  npm start
  ```

  ### Esecuzione Docker

  ```bash
  docker build -t path-api .
  docker run -p 3000:3000 path-api
  ```

  Se il database deve essere persistente anche utilizzando direttamente `docker run`, documenta il comando con volume:

  ```bash
  docker run \
    -p 3000:3000 \
    -v path-data:/app/data \
    path-api
  ```

  ### Esecuzione con Docker Compose

  ```bash
  docker compose up --build
  ```

  Per l'esecuzione in background:

  ```bash
  docker compose up -d --build
  ```

  Per arrestare l'ambiente:

  ```bash
  docker compose down
  ```

  Il comando:

  ```bash
  docker compose down
  ```

  non deve eliminare il database persistente.

  Documenta anche come eliminare volontariamente il volume e quindi azzerare il database:

  ```bash
  docker compose down -v
  ```

  ------

  ## Diagramma UML dei casi d'uso

  Genera anche un **diagramma UML dei casi d'uso** che rappresenti le principali funzionalità del backend.

  Considera come attore principale:

  ```text
  Applicazione Frontend
  ```

  Il diagramma deve includere almeno i seguenti casi d'uso:

  - Visualizzare tutti i POI
  - Visualizzare il dettaglio di un POI
  - Visualizzare il dettaglio completo di un POI con i Path associati
  - Creare un POI
  - Modificare un POI
  - Eliminare un POI
  - Visualizzare tutti i Path
  - Visualizzare il dettaglio di un Path
  - Visualizzare il dettaglio completo di un Path con i POI associati
  - Creare un Path
  - Modificare un Path
  - Eliminare un Path
  - Associare POI a un Path
  - Gestire le categorie di un Path
  - Validare che un Path abbia almeno un POI

  Evidenzia, dove appropriato, relazioni UML di tipo:

  ```text
  <<include>>
  ```

  e:

  ```text
  <<extend>>
  ```

  Ad esempio:

  - `Creare Path` include `Associare POI a Path`
  - `Modificare Path` include `Associare POI a Path`
  - `Creare Path` include `Validare almeno un POI`
  - `Modificare Path` include `Validare almeno un POI`

  Genera il diagramma in formato **PlantUML**, in modo che possa essere copiato e renderizzato direttamente.

  Il diagramma finale deve essere coerente con gli endpoint realmente implementati.

  ------

  ## Requisiti aggiuntivi

  Implementa:

  - gestione centralizzata degli errori;
  - validazione dei payload;
  - utilizzo corretto dei codici HTTP;
  - configurazione CORS;
  - parsing JSON;
  - gestione asincrona tramite `async/await`;
  - tipi TypeScript evitando `any` dove non necessario;
  - configurazione tramite variabili d'ambiente;
  - endpoint `/health`.

  Evita riferimenti circolari nelle risposte JSON.

  ------

  ## Output richiesto

  Genera un progetto **completo e funzionante**, non semplici frammenti di codice.

  Fornisci:

  1. struttura completa delle directory;
  2. `package.json`;
  3. `tsconfig.json`;
  4. configurazione SQLite;
  5. schema/migrazioni del database;
  6. script di inizializzazione e seed;
  7. modelli;
  8. repository;
  9. service;
  10. controller;
  11. router;
  12. middleware per error handling;
  13. file di bootstrap dell'applicazione;
  14. endpoint `/health`;
  15. istruzioni dettagliate per installazione e avvio;
  16. esempi `curl` per testare tutti gli endpoint principali;
  17. diagramma UML dei casi d'uso in PlantUML;
  18. breve spiegazione del diagramma dei casi d'uso;
  19. `Dockerfile`;
  20. `docker-compose.yml`;
  21. `.dockerignore`;
  22. configurazione del volume persistente SQLite;
  23. istruzioni per eseguire il progetto tramite `docker build` e `docker run`;
  24. istruzioni per eseguire il progetto tramite `docker compose`;
  25. istruzioni per verificare lo stato del container e l'healthcheck.

  Prima di terminare, verifica inoltre che:

  - siano presenti almeno 15 POI;
  - siano presenti almeno 5 Path;
  - ogni Path contenga almeno un POI;
  - almeno un POI appartenga a più Path;
  - `/poi/:id` non restituisca `pathList`;
  - `/poi/:id/full` restituisca `pathList`;
  - `/path/:id` non restituisca `poiList`;
  - `/path/:id/full` restituisca `poiList`;
  - le CRUD funzionino;
  - il database venga persistito su file SQLite;
  - il database sopravviva alla ricreazione del container;
  - `docker build` completi senza errori;
  - `docker compose up --build` avvii correttamente l'applicazione;
  - l'API sia raggiungibile dall'host;
  - l'endpoint `/health` funzioni;
  - il diagramma dei casi d'uso sia coerente con le funzionalità effettivamente implementate.