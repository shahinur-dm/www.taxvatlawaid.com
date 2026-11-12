# TaxVat LawAid — Full-Stack Legal Consultancy Website, Appointment Booking & Admin System

Production-ready full-stack web application for **TaxVat LawAid** (*Associated Practice: TaxAid*), Dhaka, Bangladesh.

Built strictly with:
- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide React, React Hook Form, Zod, Axios, Sonner, Recharts
- **Backend**: Node.js, Express.js, TypeScript, JWT (HTTP-only cookies), bcryptjs, Zod validation, Helmet, CORS, Rate Limiting
- **Database**: MongoDB + Mongoose ODM (with atomic partial unique index protection against double-booking race conditions)

---

## Project Architecture

```text
taxvat-lawaid/
├── package.json
├── README.md
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   └── src/
│       ├── app.ts
│       ├── server.ts
│       ├── config/
│       │   ├── db.ts
│       │   └── env.ts
│       ├── controllers/
│       │   ├── adminAppointmentController.ts
│       │   ├── appointmentController.ts
│       │   ├── authController.ts
│       │   ├── contentController.ts
│       │   ├── serviceController.ts
│       │   └── settingsController.ts
│       ├── middleware/
│       │   ├── auth.ts
│       │   ├── errorHandler.ts
│       │   ├── rateLimiter.ts
│       │   ├── sanitize.ts
│       │   └── validate.ts
│       ├── models/
│       │   ├── Admin.ts
│       │   ├── Appointment.ts
│       │   ├── Service.ts
│       │   ├── WebsiteContent.ts
│       │   └── WebsiteSettings.ts
│       ├── routes/
│       │   ├── adminRoutes.ts
│       │   ├── appointmentRoutes.ts
│       │   ├── authRoutes.ts
│       │   └── publicRoutes.ts
│       ├── scripts/
│       │   ├── seed.ts
│       │   └── seedData.ts
│       ├── services/
│       │   └── slotService.ts
│       ├── tests/
│       │   └── api.test.ts
│       ├── utils/
│       │   ├── appError.ts
│       │   └── referenceGenerator.ts
│       └── validators/
│           └── schemas.ts
└── frontend/
    ├── .env.example
    ├── next.config.mjs
    ├── package.json
    ├── tailwind.config.ts
    ├── public/images/
    │   └── taxvat-logo.svg
    └── src/
        ├── app/
        │   ├── page.tsx                  # Public landing page
        │   ├── about/page.tsx            # Vision, Mission, Process, Industries
        │   ├── services/page.tsx         # Practice areas & document checklists
        │   ├── booking/page.tsx          # Appointment booking & reference tracker
        │   ├── contact/page.tsx          # Chamber details & consultation hours
        │   └── admin/
        │       ├── login/page.tsx        # Secure admin login
        │       ├── page.tsx              # Dashboard overview & Recharts analytics
        │       ├── appointments/page.tsx # Search, filter, status, notes, delete
        │       ├── services/page.tsx     # Practice division CRUD
        │       ├── content/page.tsx      # Public website CMS editor
        │       └── settings/page.tsx     # ON PROGRESS banner & slot configuration
        ├── components/
        │   ├── admin/AdminShell.tsx
        │   └── public/                   # Header, AnnouncementBanner, Hero, LeadCounselCard, BookingSection, PracticeAreas, AboutProcess, Expertise, FAQ, Contact, Footer
        ├── lib/
        │   ├── api.ts
        │   ├── defaults.ts
        │   └── serverData.ts
        └── types/index.ts
```

---

## Installation Guide

### 1. Prerequisites
- Node.js 20+ (tested on Node v26.13.0)
- MongoDB 6+ (Local MongoDB service or MongoDB Atlas URI)

### 2. Install Dependencies
```bash
npm --prefix backend install
npm --prefix frontend install
```

### 3. Configure Environment Variables
Copy the example environment files and fill in your values:

**Backend (`backend/.env`):**
```bash
cp backend/.env.example backend/.env
```
Important variables in `backend/.env`:
- `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb://127.0.0.1:27017/taxvat_lawaid` or MongoDB Atlas URI)
- `JWT_SECRET`: A strong random 32+ character string
- `CORS_ORIGIN`: Frontend origin (e.g., `http://localhost:3000` or your production domain)
- `SEED_ADMIN_EMAIL` & `SEED_ADMIN_PASSWORD`: Initial administrator credentials used **only** when running `npm run seed`

**Frontend (`frontend/.env.local`):**
```bash
cp frontend/.env.example frontend/.env.local
```
- `NEXT_PUBLIC_API_URL=/api` (uses Next.js rewrite proxy so HTTP-only cookies work seamlessly same-origin)
- `BACKEND_INTERNAL_URL=http://localhost:5000`

---

## Initial Admin Setup & Seeding

Public users can **never** self-register as administrators. Create the initial `super_admin` account and default website content/services/settings safely using the idempotent seed command:

```bash
npm run seed
```
This script:
1. Creates default `WebsiteSettings` (with the **ON PROGRESS** announcement enabled and `Asia/Dhaka` Sun–Thu 3:00 PM–8:00 PM slot schedule).
2. Creates default `WebsiteContent` and 6 core `Services` divisions.
3. Creates the initial admin user from `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` (hashed with bcrypt cost 12) if it does not already exist.

> **Security note:** Change `SEED_ADMIN_PASSWORD` before running `seed` in production, and remove `SEED_ADMIN_PASSWORD` from `.env` afterward.

---

## Running Locally

Start both servers in separate terminals:

```bash
# Terminal 1 — Backend API (http://localhost:5000)
npm run dev:backend

# Terminal 2 — Frontend Next.js App (http://localhost:3000)
npm run dev:frontend
```

- Public Website: `http://localhost:3000`
- Admin Login: `http://localhost:3000/admin/login`
- Admin Dashboard: `http://localhost:3000/admin`

---

## Appointment Booking & Concurrency Guarantees

- **Timezone**: `Asia/Dhaka` (computed deterministically via `Intl.DateTimeFormat`, independent of server OS timezone).
- **Schedule**: Sunday – Thursday, `3:00 PM` to `8:00 PM` (30-minute configurable slots).
- **Blocked**: Fridays, Saturdays, past dates, and past time slots for the current day.
- **Race-Condition Protection**: `Appointment` defines a partial unique compound index on `{ appointmentDateStr: 1, appointmentTime: 1 }` where `status ∈ ['Pending', 'Confirmed', 'Completed']`. Simultaneous requests for the exact same slot result in `201 Created` for the winner and `409 Conflict` for the duplicate. Cancelling an appointment frees the slot automatically.

---

## Running Automated Tests

```bash
npm run test:backend
npm run build
```

---

## Production Deployment Guide

1. **Database**: Provision a MongoDB Atlas cluster and obtain the `MONGODB_URI`.
2. **Backend (Node.js / Render / Railway / VPS)**:
   - Build: `npm --prefix backend install && npm --prefix backend run build`
   - Start: `npm --prefix backend start`
   - Set `NODE_ENV=production`, strong `JWT_SECRET`, `MONGODB_URI`, and `CORS_ORIGIN=https://your-domain.com`.
   - Run `npm --prefix backend run seed` once against the production database.
3. **Frontend (Vercel / Node Server)**:
   - Set `NEXT_PUBLIC_API_URL=/api` and `BACKEND_INTERNAL_URL=https://your-backend-api.com` (Next.js proxies `/api/*` to the Express backend so HTTP-only auth cookies remain first-party).
   - Build & Start: `npm --prefix frontend run build && npm --prefix frontend start`.

