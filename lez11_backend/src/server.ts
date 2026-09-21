import 'dotenv/config';
import { createApp } from './app';
import { AppDataSource, databasePath } from './database/dataSource';
import { seedDatabase } from './database/seed';

async function bootstrap(): Promise<void> {
  await AppDataSource.initialize();
  await seedDatabase();

  const port = Number(process.env.PORT ?? 3000);
  const app = createApp();
  app.listen(port, '0.0.0.0', () => {
    console.log(`API in ascolto su http://0.0.0.0:${port}`);
    console.log(`SQLite: ${databasePath}`);
  });
}

bootstrap().catch((error) => {
  console.error('Avvio fallito:', error);
  process.exit(1);
});
