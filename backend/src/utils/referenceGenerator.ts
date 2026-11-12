import crypto from 'crypto';

/**
 * Generates a unique, human-readable booking reference e.g. TVLA-20261112-A8F3
 */
export function generateBookingReference(dateStr: string): string {
  const compactDate = dateStr.replace(/-/g, '');
  const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `TVLA-${compactDate}-${randomSuffix}`;
}

