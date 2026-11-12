import mongoose from 'mongoose';
import { env } from './env';

let memoryServer: { stop: () => Promise<unknown> } | null = null;
let connectPromise: Promise<void> | null = null;

export async function connectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (connectPromise) {
    return connectPromise;
  }

  mongoose.set('strictQuery', true);

  connectPromise = (async () => {
    let uri = env.mongodbUri;

    if (env.useInMemoryDb && env.nodeEnv !== 'production') {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const server = await MongoMemoryServer.create();
      memoryServer = server;
      uri = server.getUri();
      console.log('[DB] Using in-memory MongoDB instance for local development/testing');
    }

    await mongoose.connect(uri, {
      autoIndex: true,
    });

    console.log(`[DB] Connected to MongoDB (${mongoose.connection.name})`);
  })();

  try {
    await connectPromise;
  } catch (err) {
    connectPromise = null;
    throw err;
  }
}

export async function disconnectDatabase(): Promise<void> {
  connectPromise = null;
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}
