import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taxvat_lawaid',
  useInMemoryDb: process.env.USE_IN_MEMORY_DB === 'true',
  jwtSecret:
    process.env.JWT_SECRET ||
    (process.env.NODE_ENV === 'production'
      ? ''
      : 'dev_only_taxvat_lawaid_secret_change_in_production_2026'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  timezone: process.env.TIMEZONE || 'Asia/Dhaka',
  seedAdminName: process.env.SEED_ADMIN_NAME || 'Hossain Ahmed (Khan)',
  seedAdminEmail: process.env.SEED_ADMIN_EMAIL || 'admin@taxvatlawaid.com',
  seedAdminPassword: process.env.SEED_ADMIN_PASSWORD || '',
};

if (env.nodeEnv === 'production' && (!env.jwtSecret || env.jwtSecret.length < 32)) {
  throw new Error('JWT_SECRET must be set to a strong secret (32+ chars) in production.');
}

