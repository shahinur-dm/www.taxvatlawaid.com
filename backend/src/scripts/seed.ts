import { connectDatabase, disconnectDatabase } from '../config/db';
import { env } from '../config/env';
import { Admin } from '../models/Admin';
import { Service } from '../models/Service';
import { WebsiteContent } from '../models/WebsiteContent';
import { WebsiteSettings } from '../models/WebsiteSettings';
import { DEFAULT_CONTENT, DEFAULT_SERVICES } from './seedData';

export async function runSeed(options?: { skipAdminIfMissingPassword?: boolean }) {
  // 1. Seed WebsiteSettings (idempotent)
  const existingSettings = await WebsiteSettings.findOne({ key: 'default' });
  if (!existingSettings) {
    await WebsiteSettings.create({
      key: 'default',
      announcementEnabled: true,
      announcementText:
        'ON PROGRESS – Our website is currently being updated. Thank you for your patience.',
      bookingSlotDurationMinutes: 30,
      bookingStartTime: '15:00',
      bookingEndTime: '20:00',
      availableDays: [0, 1, 2, 3, 4],
      timezone: 'Asia/Dhaka',
      maxAdvanceBookingDays: 60,
      officeHoursText: 'Sunday – Thursday: 3:00 PM – 8:00 PM (Closed Friday & Saturday)',
      whatsappDispatchEnabled: true,
    });
    console.log('[SEED] Created default WebsiteSettings (with ON PROGRESS banner enabled)');
  }

  // 2. Seed WebsiteContent (idempotent)
  const existingContent = await WebsiteContent.findOne({ key: 'default' });
  if (!existingContent) {
    await WebsiteContent.create(DEFAULT_CONTENT);
    console.log('[SEED] Created default WebsiteContent');
  }

  // 3. Seed Services (idempotent per slug)
  for (const svc of DEFAULT_SERVICES) {
    await Service.updateOne(
      { slug: svc.slug },
      { $setOnInsert: svc },
      { upsert: true }
    );
  }
  console.log(`[SEED] Ensured ${DEFAULT_SERVICES.length} default Services exist`);

  // 4. Seed Initial Admin Account (never duplicates)
  const adminEmail = env.seedAdminEmail.toLowerCase();
  const existingAdmin = await Admin.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const password = env.seedAdminPassword;
    if (!password || password.length < 8) {
      if (options?.skipAdminIfMissingPassword) {
        console.warn('[SEED] Skipped admin creation: SEED_ADMIN_PASSWORD not configured.');
        return;
      }
      throw new Error(
        'SEED_ADMIN_PASSWORD must be set in backend/.env (minimum 8 characters) to create the initial admin account.'
      );
    }

    await Admin.create({
      name: env.seedAdminName,
      email: adminEmail,
      passwordHash: password,
      role: 'super_admin',
      isActive: true,
    });
    console.log(`[SEED] Created initial super_admin account: ${adminEmail}`);
  } else {
    console.log(`[SEED] Admin account already exists: ${adminEmail}`);
  }
}

if (require.main === module) {
  (async () => {
    try {
      await connectDatabase();
      await runSeed();
      await disconnectDatabase();
      console.log('[SEED] Database seeding completed successfully.');
      process.exit(0);
    } catch (err) {
      console.error('[SEED] Failed:', err);
      await disconnectDatabase().catch(() => undefined);
      process.exit(1);
    }
  })();
}

