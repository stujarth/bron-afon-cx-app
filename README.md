# Hafan — Modern Tenant Experience Platform

**Hafan** (Welsh: "haven") is a world-class self-service platform for social housing tenants. Built as a multi-tenant SaaS, it empowers residents to manage repairs, pay rent, communicate with their housing association, and more — in English and Welsh.

> **Demo tenant:** Bron Afon Community Housing (bronafon.org.uk)

## Apps

| App | Port | Description |
|-----|------|-------------|
| `apps/tenant` | 3000 | Tenant self-service portal (i18n, Capacitor-ready) |
| `apps/admin` | 3001 | Staff admin dashboard |
| `apps/web` | 3002 | Marketing website for the Hafan product |

## Shared Packages

| Package | Description |
|---------|-------------|
| `@hafan/ui` | Shared UI components (shadcn/ui-based) |
| `@hafan/api` | tRPC routers and type-safe API |
| `@hafan/auth` | NextAuth v5 with Microsoft Entra ID |
| `@hafan/db` | Drizzle ORM schema and database client |
| `@hafan/config-typescript` | Shared TypeScript configs |
| `@hafan/config-eslint` | Shared ESLint configs |
| `@hafan/config-tailwind` | Theme tokens (Hafan base + Bron Afon brand) |

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **API:** tRPC v11
- **Auth:** NextAuth v5 + Microsoft Entra ID
- **Database:** Drizzle ORM + PostgreSQL (Neon)
- **i18n:** next-intl (English + Welsh)
- **Mobile:** Capacitor (hybrid native wrapper)
- **Monorepo:** Turborepo + pnpm
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
pnpm install

# Run all apps in development
pnpm dev

# Build all apps
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

## Key Features

- **Repair tracking** — Domino's pizza tracker-style repair progress
- **Rent management** — View balance, payment history, make payments
- **AI chatbot** — Intelligent support with call centre escalation
- **Diagnostic tool** — Photo upload + AI triage before dispatching engineers
- **Welsh language** — Full Cymraeg support with one-click toggle
- **Gamification** — Points, badges, and levels for tenant engagement
- **WCAG 2.1 AA** — Fully accessible across all apps
- **Microsoft integration** — Dynamics 365 + Microsoft 365
- **Multi-platform** — Web, iOS, Android from single codebase
