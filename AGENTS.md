# AGENTS.md

High-signal context for working on this repo.

## Project

- Next.js 16.2.11 + React 19 + TypeScript, App Router. Fully static — no database, no API routes, no env-var secrets.
- Tailwind CSS v4: theme tokens live in `src/app/globals.css` (`@theme inline`). No `tailwind.config.*`.
- Single package, not a monorepo.

## Setup

1. `npm install`
2. `npm run dev` → http://localhost:3000

No `.env` or database setup needed.

## Common commands

- `npm run dev` – dev server.
- `npm run build` – production build; also runs the TypeScript check.
- `npm run start` – production server after a build.
- `npm run lint` – ESLint via `eslint` directly; config in `eslint.config.mjs` extends `eslint-config-next` core-web-vitals + typescript.
- No `test` or `typecheck` scripts.

## Architecture

- Single-page app entry is `src/app/page.tsx`, which renders `HeroSection`, `AboutSection`, `MembersSection`, `GuestbookSection`, `AboutUsSection`, `ContactSection`, and `Footer` from `src/components/sections/`.
- The guestbook is fully static (no database): `src/components/sections/Guestbook.tsx` displays a QR code image (`public/qr-placeholder.svg`) that links to an external platform. Replace the image file to swap the QR code.
- `AboutUsSection` (关于我们) shows two QR images — fan group (`public/qr-fan-group.svg`) and Bilibili account (`public/qr-bilibili.svg`). `ContactSection` is email-only with a copy-to-clipboard button; no navigation links.
- Members are displayed as a responsive card grid in `MembersSection`; each card carries an `id={member.id}` anchor (clicking the hero mini avatars smooth-scrolls to the matching card via Lenis `anchors`).
- Band content (name, tagline, description, story, contact/social links, members) is in `src/content/band.ts`.
- All UI copy and content is Simplified Chinese; keep new copy in Chinese to match the brand.
- Path alias `@/*` maps to `./src/*`.
- Animation libs: GSAP/ScrollTrigger + Lenis (smooth scroll), Framer Motion (section reveals). `"use client"` is required in any component using them or browser APIs.

## Operational gotchas

- `next.config.ts` sets `allowedDevOrigins: ["localhost", "172.18.128.1", "192.168.4.29"]`. Requests from other dev hosts/IPs are rejected in dev.
- `next.config.ts` enables `images.dangerouslyAllowSVG` so local SVGs render via `next/image`.
- No runtime environment variables are used; the site builds and runs with zero env config.
