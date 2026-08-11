# AGENTS.md

High-signal context for working on this repo.

## Project

- Next.js 16.2.11 + React 19 + TypeScript, App Router.
- Tailwind CSS v4: theme tokens live in `src/app/globals.css` (`@theme inline`). No `tailwind.config.*`.
- Prisma 6.19.3 + SQLite for local development; schema at `prisma/schema.prisma`.
- Single package, not a monorepo.

## Setup

1. `npm install`
2. Copy `.env.example` → `.env`. The example uses an absolute Windows path to the SQLite file (`file:C:/Users/.../prisma/dev.db`). Update `DATABASE_URL` if the repo is moved.
3. `npx prisma migrate dev`
4. `npx prisma generate`
5. `npm run dev` → http://localhost:3000

## Common commands

- `npm run dev` – dev server.
- `npm run build` – production build; also runs the TypeScript check.
- `npm run start` – production server after a build.
- `npm run lint` – ESLint via `eslint` directly; config in `eslint.config.mjs` extends `eslint-config-next` core-web-vitals + typescript.
- No `test` or `typecheck` scripts.

## Architecture

- Single-page app entry is `src/app/page.tsx`, which renders `HeroSection`, `AboutSection`, `MembersSection`, `GuestbookSection`, `ContactSection`, and `Footer` from `src/components/sections/`.
- Dynamic member pages at `/members/[id]` (`src/app/members/[id]/page.tsx`), pre-rendered via `generateStaticParams` from `src/content/band.ts`.
- Admin moderation UI at `/admin/guestbook` (`src/app/admin/guestbook/page.tsx`).
- API routes:
  - `POST /api/contact` → stores a `ContactMessage` and sends an email notification.
  - `GET /api/guestbook` → returns up to 50 approved `GuestbookEntry` records.
  - `POST /api/guestbook` → creates a `PENDING` entry and sends an email notification.
  - `POST /api/guestbook/[id]/like` → increments likes for an approved entry.
  - Admin routes (require `ADMIN_SECRET` in the JSON body, not a header):
    - `POST /api/admin/guestbook` → returns all entries (including pending/rejected), up to 200.
    - `POST /api/guestbook/[id]/approve` → sets status to `APPROVED`.
    - `POST /api/guestbook/[id]/reject` → sets status to `REJECTED`.
- Prisma client singleton is in `src/lib/prisma.ts`; email helper is in `src/lib/resend.ts`.
- Band content (name, tagline, description, story, contact/social links, members) is in `src/content/band.ts`.
- All UI copy and content is Simplified Chinese; keep new copy in Chinese to match the brand.
- Path alias `@/*` maps to `./src/*`.

## Environment / operational gotchas

- `RESEND_API_KEY` and `RESEND_TO_EMAIL` are optional locally. If either is missing, contact/guestbook submissions log a warning and skip sending email.
- `ADMIN_SECRET` is required for the admin endpoints.
- `prisma.config.ts` imports `dotenv/config`, so the Prisma CLI loads `.env` automatically.
- `next.config.ts` sets `allowedDevOrigins: ["localhost", "172.18.128.1", "192.168.4.29"]`. Requests from other dev hosts/IPs are rejected.
- `prisma/dev.db` is not gitignored; do not commit it if this becomes a tracked repo (`.env` and `.env*` are gitignored).
- The Resend `from` address is hardcoded to `onboarding@resend.dev` in `src/lib/resend.ts`; change it there if sending from a verified domain.
- For production (e.g. Vercel), switch to PostgreSQL and set `DATABASE_URL`, `RESEND_API_KEY`, `RESEND_TO_EMAIL`, and `ADMIN_SECRET`. SQLite cannot be persisted in serverless environments.
