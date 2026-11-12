import express, { NextFunction, Request, Response } from 'express';
import { createApp } from './app';
import { connectDatabase, disconnectDatabase } from './config/db';
import { env } from './config/env';
import { Appointment } from './models/Appointment';
import { runSeed } from './scripts/seed';

let indexesSynced = false;

async function ensureDbConnected(_req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    await connectDatabase();
    if (!indexesSynced) {
      await Appointment.syncIndexes();
      indexesSynced = true;
    }
    next();
  } catch (err) {
    next(err);
  }
}

const app = express();
app.use(createApp({ ensureDb: ensureDbConnected }));

async function startServer() {
  try {
    await connectDatabase();
    await Appointment.syncIndexes();
    indexesSynced = true;

    if (env.useInMemoryDb && env.nodeEnv !== 'production') {
      await runSeed({ skipAdminIfMissingPassword: true });
    }

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

if (!process.env.VERCEL) {
  startServer();
}

export default app;
