import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../app';
import { Admin } from '../models/Admin';
import { Appointment } from '../models/Appointment';
import { Service } from '../models/Service';
import { WebsiteContent } from '../models/WebsiteContent';
import { WebsiteSettings } from '../models/WebsiteSettings';
import { DEFAULT_CONTENT, DEFAULT_SERVICES } from '../scripts/seedData';
import { getAvailableSlotsForDate } from '../services/slotService';

let mongoServer: MongoMemoryServer;
const app = createApp();

function getNextOpenDateStr(daysFromNow = 7): string {
  const base = new Date();
  for (let offset = daysFromNow; offset < daysFromNow + 14; offset++) {
    const d = new Date(base.getTime() + offset * 86400000);
    const day = d.getUTCDay();
    if (day >= 0 && day <= 4) {
      return d.toISOString().slice(0, 10);
    }
  }
  return '2026-12-01';
}

function getNextClosedDateStr(targetDay: 5 | 6): string {
  const base = new Date();
  for (let offset = 1; offset <= 14; offset++) {
    const d = new Date(base.getTime() + offset * 86400000);
    if (d.getUTCDay() === targetDay) {
      return d.toISOString().slice(0, 10);
    }
  }
  return targetDay === 5 ? '2026-11-13' : '2026-11-14';
}

describe('TaxVat LawAid Backend API Integration Tests', () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    await Appointment.syncIndexes();

    await WebsiteSettings.create({
      key: 'default',
      announcementEnabled: true,
      announcementText:
        'ON PROGRESS – Our website is currently being updated. Thank you for your patience.',
    });
    await WebsiteContent.create(DEFAULT_CONTENT);
    await Service.insertMany(DEFAULT_SERVICES);
    await Admin.create({
      name: 'Test Admin',
      email: 'admin@taxvatlawaid.com',
      passwordHash: 'StrongPass!2026',
      role: 'super_admin',
      isActive: true,
    });
  });

  after(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('returns health status and public CMS data including ON PROGRESS banner', async () => {
    const healthRes = await request(app).get('/api/health');
    assert.equal(healthRes.status, 200);
    assert.equal(healthRes.body.success, true);

    const settingsRes = await request(app).get('/api/settings/public');
    assert.equal(settingsRes.status, 200);
    assert.equal(settingsRes.body.data.announcementEnabled, true);
    assert.match(settingsRes.body.data.announcementText, /ON PROGRESS/);

    const contentRes = await request(app).get('/api/content');
    assert.equal(contentRes.status, 200);
    assert.equal(contentRes.body.data.leadCounselName, 'Hossain Ahmed (Khan)');

    const servicesRes = await request(app).get('/api/services');
    assert.equal(servicesRes.status, 200);
    assert.equal(servicesRes.body.data.length, 6);
  });

  it('blocks Friday, Saturday, past dates, and past time slots in Asia/Dhaka', async () => {
    const friday = getNextClosedDateStr(5);
    const saturday = getNextClosedDateStr(6);

    const friRes = await request(app).get(`/api/appointments/available-slots?date=${friday}`);
    assert.equal(friRes.status, 200);
    assert.equal(friRes.body.data.isAvailableDay, false);
    assert.deepEqual(friRes.body.data.slots, []);

    const satRes = await request(app).get(`/api/appointments/available-slots?date=${saturday}`);
    assert.equal(satRes.status, 200);
    assert.equal(satRes.body.data.isAvailableDay, false);
    assert.deepEqual(satRes.body.data.slots, []);

    const pastRes = await request(app).get('/api/appointments/available-slots?date=2020-01-05');
    assert.equal(pastRes.status, 200);
    assert.equal(pastRes.body.data.isPastDate, true);
    assert.deepEqual(pastRes.body.data.slots, []);

    const openDay = getNextOpenDateStr(3);
    const simulatedTodaySlots = await getAvailableSlotsForDate(openDay, {
      dateStr: openDay,
      minutesSinceMidnight: 16 * 60 + 45,
    });
    const pastSlot = simulatedTodaySlots.slots.find((s) => s.label === '03:00 PM');
    const futureSlot = simulatedTodaySlots.slots.find((s) => s.label === '05:00 PM');
    assert.equal(pastSlot?.available, false);
    assert.equal(pastSlot?.reason, 'past');
    assert.equal(futureSlot?.available, true);
  });

  it('validates mandatory fields, allows optional email, books atomically & prevents double booking', async () => {
    const openDate = getNextOpenDateStr(4);

    const badRes = await request(app).post('/api/appointments').send({
      customerName: 'Rahim Uddin',
      serviceCategory: 'Income Tax',
      appointmentDate: openDate,
      appointmentTime: '03:00 PM',
    });
    assert.equal(badRes.status, 400);

    const friday = getNextClosedDateStr(5);
    const friBook = await request(app).post('/api/appointments').send({
      customerName: 'Rahim Uddin',
      phone: '01711000001',
      serviceCategory: 'Income Tax',
      appointmentDate: friday,
      appointmentTime: '03:00 PM',
    });
    assert.equal(friBook.status, 400);

    const [resA, resB] = await Promise.all([
      request(app).post('/api/appointments').send({
        customerName: 'Customer One',
        phone: '01711000001',
        serviceCategory: 'VAT & Tax',
        appointmentDate: openDate,
        appointmentTime: '04:00 PM',
      }),
      request(app).post('/api/appointments').send({
        customerName: 'Customer Two',
        phone: '01711000002',
        serviceCategory: 'Company Taxation',
        appointmentDate: openDate,
        appointmentTime: '04:00 PM',
      }),
    ]);

    const statuses = [resA.status, resB.status].sort((a, b) => a - b);
    assert.deepEqual(statuses, [201, 409]);

    const winner = resA.status === 201 ? resA : resB;
    assert.equal(
      winner.body.message,
      'Your appointment request has been submitted successfully!'
    );
    assert.equal(winner.body.appointment.status, 'Pending');
    assert.match(winner.body.appointment.bookingReference, /^TVLA-/);

    const slotsAfter = await request(app).get(
      `/api/appointments/available-slots?date=${openDate}`
    );
    const slot4pm = slotsAfter.body.data.slots.find((s: { label: string }) => s.label === '04:00 PM');
    assert.equal(slot4pm.available, false);
    assert.equal(slot4pm.reason, 'booked');

    const refRes = await request(app).get(
      `/api/appointments/reference/${winner.body.appointment.bookingReference}`
    );
    assert.equal(refRes.status, 200);
    assert.equal(refRes.body.appointment.customerName, winner.body.appointment.customerName);
    assert.equal(refRes.body.appointment.phone, undefined);
    assert.equal(refRes.body.appointment.adminNotes, undefined);
  });

  it('enforces admin authentication and supports full admin workflow', async () => {
    const unauth = await request(app).get('/api/admin/appointments');
    assert.equal(unauth.status, 401);

    const badLogin = await request(app).post('/api/auth/login').send({
      email: 'admin@taxvatlawaid.com',
      password: 'WrongPassword',
    });
    assert.equal(badLogin.status, 401);

    const agent = request.agent(app);
    const loginRes = await agent.post('/api/auth/login').send({
      email: 'admin@taxvatlawaid.com',
      password: 'StrongPass!2026',
    });
    assert.equal(loginRes.status, 200);
    assert.match(loginRes.headers['set-cookie']?.[0] || '', /HttpOnly/);

    const meRes = await agent.get('/api/auth/me');
    assert.equal(meRes.status, 200);
    assert.equal(meRes.body.admin.email, 'admin@taxvatlawaid.com');

    const listRes = await agent.get('/api/admin/appointments?status=Pending');
    assert.equal(listRes.status, 200);
    assert.ok(listRes.body.data.length >= 1);
    const appt = listRes.body.data[0];

    const confirmRes = await agent
      .patch(`/api/admin/appointments/${appt._id}/status`)
      .send({ status: 'Confirmed' });
    assert.equal(confirmRes.status, 200);
    assert.equal(confirmRes.body.data.status, 'Confirmed');

    const notesRes = await agent
      .patch(`/api/admin/appointments/${appt._id}/notes`)
      .send({ adminNotes: 'Client bringing TIN & FY2025 statements.' });
    assert.equal(notesRes.status, 200);
    assert.match(notesRes.body.data.adminNotes, /TIN/);

    const cancelRes = await agent
      .patch(`/api/admin/appointments/${appt._id}/status`)
      .send({ status: 'Cancelled' });
    assert.equal(cancelRes.status, 200);

    const rebookRes = await request(app).post('/api/appointments').send({
      customerName: 'Replacement Client',
      phone: '01711000099',
      serviceCategory: 'Tax Return',
      appointmentDate: appt.appointmentDateStr,
      appointmentTime: appt.appointmentTime,
    });
    assert.equal(rebookRes.status, 201);

    const statsRes = await agent.get('/api/admin/dashboard/stats');
    assert.equal(statsRes.status, 200);
    assert.ok(statsRes.body.data.counts.total >= 2);
    assert.equal(statsRes.body.data.counts.cancelled, 1);

    const updateSettingsRes = await agent
      .patch('/api/admin/settings')
      .send({
        announcementEnabled: false,
        announcementText: 'ON PROGRESS – Maintenance complete soon.',
      });
    assert.equal(updateSettingsRes.status, 200);

    const publicAfter = await request(app).get('/api/settings/public');
    assert.equal(publicAfter.body.data.announcementEnabled, false);
    assert.match(publicAfter.body.data.announcementText, /Maintenance complete soon/);

    // Inquiry + Article CRUD flow
    const inquiryRes = await request(app).post('/api/inquiries').send({
      name: 'Farhana Yasmin',
      phone: '01722334455',
      email: 'farhana@example.com',
      subject: 'VAT Audit Notice Inquiry',
      message: 'Received an audit notice and would like an initial document review.',
    });
    assert.equal(inquiryRes.status, 201);

    const adminInquiries = await agent.get('/api/admin/inquiries');
    assert.equal(adminInquiries.status, 200);
    assert.equal(adminInquiries.body.data.length, 1);

    const articleRes = await agent.post('/api/admin/articles').send({
      title: 'Procedural Checklist for Monthly VAT Return Filings',
      category: 'VAT Updates',
      summary: 'Key statutory reconciliation records required under VAT & SD Act, 2012.',
      content: 'Detailed chamber checklist covering Mushak 6.1, 6.2, 6.3, and VDS certificates prior to filing.',
      statutoryReference: 'VAT & SD Act, 2012',
      isPublished: true,
    });
    assert.equal(articleRes.status, 201);

    const publicArticles = await request(app).get('/api/articles');
    assert.equal(publicArticles.status, 200);
    assert.equal(publicArticles.body.data.length, 1);

    await agent.post('/api/auth/logout');
    const afterLogout = await agent.get('/api/auth/me');
    assert.equal(afterLogout.status, 401);
  });
});
