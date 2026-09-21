-- Schema logico equivalente a quello creato automaticamente da TypeORM.
-- Nel progetto didattico l'avvio usa synchronize=true per creare/aggiornare lo schema.

CREATE TABLE poi (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR NOT NULL UNIQUE,
  descrizione VARCHAR NULL,
  indirizzo VARCHAR NULL,
  tipo VARCHAR NULL,
  lat REAL NULL,
  lon REAL NULL
);

CREATE TABLE path (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR NOT NULL UNIQUE
);

CREATE TABLE category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR NOT NULL UNIQUE
);

CREATE TABLE path_poi (
  path_id INTEGER NOT NULL,
  poi_id INTEGER NOT NULL,
  PRIMARY KEY (path_id, poi_id),
  FOREIGN KEY (path_id) REFERENCES path(id) ON DELETE CASCADE,
  FOREIGN KEY (poi_id) REFERENCES poi(id) ON DELETE CASCADE
);

CREATE TABLE path_category (
  path_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (path_id, category_id),
  FOREIGN KEY (path_id) REFERENCES path(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);
