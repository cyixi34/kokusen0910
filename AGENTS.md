# AGENTS.md

High-signal context for working on this repo.

## Project

- Next.js 16.2.11 + React 19 + TypeScript, App Router. Single-page, fully static site — no database, no API routes, no env-var secrets.
- `next.config.ts` sets `output: "export"` and `basePath: "/kokusen0910"`: no server or dynamic features allowed (don't add API routes, SSG/ISR, `generateStaticParams`, etc.), and all URLs are prefixed `/kokusen0910`.
- Tailwind CSS v4: theme tokens live in `src/app/globals.css` (`@theme inline`). No `tailwind.config.*`.
- Single package, not a monorepo.

## Setup

1. `npm install`
2. `npm run dev` → http://localhost:3000

No `.env` or database setup needed.

## Common commands

- `npm run dev` – dev server.
- `npm run build` – production build; also runs the TypeScript check. With `output: "export"`, the static site is written to `out/`.
- `npm run start` – production server after a build.
- `npm run lint` – ESLint via `eslint` directly; config in `eslint.config.mjs` extends `eslint-config-next` core-web-vitals + typescript.
- No `test` or `typecheck` scripts.

## Architecture

- Single-page app entry is `src/app/page.tsx`, which renders `HeroSection`, `AboutSection`, `MembersSection`, `GuestbookSection`, `AboutUsSection`, `ContactSection`, and `Footer` from `src/components/sections/`.
- The guestbook is fully static (no database): `src/components/sections/Guestbook.tsx` displays a QR code image (`public/qanda.png`) that links to an external platform. Replace the image file to swap the QR code.
- `AboutUsSection` (关于我们) shows two QR images — fan group (`public/fans.jpg`) and Bilibili account (`public/bfans.png`). `ContactSection` is email-only with a copy-to-clipboard button; no navigation links.
- `MembersSection` is a horizontal snap-scrolling carousel (mouse-drag + arrow buttons), not a grid; each card carries `id={member.id}`. Clicking a hero mini avatar is intercepted by a document-level click listener in `Members.tsx` that scrolls the carousel to that card. Lenis `anchors: true` handles only section anchors (`#about`, `#members`, etc.).
- Band content (name, tagline, description, story, contact/social links, members) is in `src/content/band.ts`.
- All UI copy and content is Simplified Chinese; keep new copy in Chinese to match the brand.
- Path alias `@/*` maps to `./src/*`.
- Animation libs: GSAP/ScrollTrigger + Lenis (smooth scroll), Framer Motion (section reveals). `"use client"` is required in any component using them or browser APIs.

## Operational gotchas

- `next.config.ts` sets `allowedDevOrigins: ["localhost", "172.18.128.1", "192.168.4.29"]`. Requests from other dev hosts/IPs are rejected in dev.
- `next.config.ts` sets `turbopack.root: __dirname` purely to silence a workspace-root lockfile warning caused by a stray `C:\Users\28211\package-lock.json` on this machine; don't remove it as cruft.
- `next.config.ts` enables `images.dangerouslyAllowSVG` and `images.unoptimized: true` so local SVGs render via `next/image`; there is no remote image optimization.
- `docx/development.md` is stale — it describes a retired Prisma/SQLite/API-routes/member-detail-page architecture that no longer exists. `README.md` (Simplified Chinese) and the code are current; trust those over `docx/`.
- `<body>` in `src/app/layout.tsx` carries `suppressHydrationWarning` because browser extensions inject attributes into it; keep it.
- No runtime environment variables are used; the site builds and runs with zero env config.
