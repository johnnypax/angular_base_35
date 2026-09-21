#!/usr/bin/env bash
set -e
BASE_URL=${BASE_URL:-http://localhost:3000}

curl -s "$BASE_URL/health" | jq .
curl -s "$BASE_URL/poi" | jq .
curl -s "$BASE_URL/poi/1" | jq .
curl -s "$BASE_URL/poi/1/full" | jq .

curl -s -X POST "$BASE_URL/poi" -H 'Content-Type: application/json' -d '{
  "nome":"Belvedere Demo",
  "descrizione":"POI creato via curl",
  "indirizzo":"Roma",
  "tipo":"Belvedere",
  "lat":41.9,
  "lon":12.5
}' | jq .

curl -s -X PUT "$BASE_URL/poi/1" -H 'Content-Type: application/json' -d '{
  "nome":"Colosseo",
  "descrizione":"Anfiteatro romano simbolo di Roma - aggiornato",
  "indirizzo":"Piazza del Colosseo, Roma",
  "tipo":"Monumento",
  "lat":41.8902,
  "lon":12.4922
}' | jq .

curl -s "$BASE_URL/path" | jq .
curl -s "$BASE_URL/path/1" | jq .
curl -s "$BASE_URL/path/1/full" | jq .

curl -s -X POST "$BASE_URL/path" -H 'Content-Type: application/json' -d '{
  "nome":"Percorso Demo",
  "categorie":["Storia","Arte"],
  "poiIds":[1,2,3]
}' | jq .

curl -s -X PUT "$BASE_URL/path/1" -H 'Content-Type: application/json' -d '{
  "nome":"Roma Antica",
  "categorie":["Storia","Arte","Architettura"],
  "poiIds":[1,2,3,14]
}' | jq .

# Sostituire gli ID con risorse eliminabili create per il test.
# curl -i -X DELETE "$BASE_URL/poi/16"
# curl -i -X DELETE "$BASE_URL/path/6"
