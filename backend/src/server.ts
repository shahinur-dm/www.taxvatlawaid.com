import { createApp } from './app';
import { connectDatabase, disconnectDatabase } from './config/db';
import { env } from './config/env';
import { Appointment } from './models/Appointment';
import { runSeed } from './scripts/seed';

async function startServer() {
  try {
    await connectDatabase();
    await Appointment.syncIndexes();

    if (env.useInMemoryDb && env.nodeEnv !== 'production') {
      await runSeed({ skipAdminIfMissingPassword: true });
    }

    const app = createApp();

    const server = app.listen(env.port, () => {
      console.log(`[SERVER] TaxVat LawAid backend running on http://localhost:${env.port}`);
    });

    const shutdown = async (signal: string) => {
      console.log(`[SERVER] ${signal} received, shutting down gracefully...`);
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (err) {
    console.error('[SERVER] Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
