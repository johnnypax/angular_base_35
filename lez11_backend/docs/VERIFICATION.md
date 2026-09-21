# Verifica del pacchetto

Sono stati eseguiti controlli strutturali automatici sul contenuto del progetto:

- seed con 15 POI;
- seed con 5 Path;
- presenza di controller, service, repository, router e middleware;
- presenza di `/health`;
- presenza delle route `/poi/:id/full` e `/path/:id/full`;
- volume Compose `path-data:/app/data`;
- diagramma PlantUML con relazioni `<<include>>`;
- schema SQL di riferimento.

## Nota sull'ambiente di generazione

Il comando `npm install` non ha potuto completarsi nell'ambiente di generazione perché l'accesso al registry npm è scaduto per timeout. Per questo motivo non è stato possibile eseguire qui una build Node/Docker completa con dipendenze scaricate. Il progetto è predisposto per installare le dipendenze con `npm install` sia localmente sia nello stage builder del Dockerfile.

Per la verifica completa nell'ambiente target:

```bash
npm install
npm run build
npm start
curl http://localhost:3000/health
```

oppure:

```bash
docker compose up --build
docker compose ps
curl http://localhost:3000/health
```
