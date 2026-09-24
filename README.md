# MARK-TECH — Systems Engineering & Healthcare Informatics

> Production portfolio, engineering dossier, and administrative operations management console of **Oduor Mark**. Specializing in enterprise full-stack web platforms, clinical healthcare informatics (MarkCare HMS Core), and resilient serverless architectures.

---

## Profile & Architectural Leadership

- **Systems Architect & Software Engineer:** Oduor Mark (Mark Tech)
- **Dual-Domain Focus:** Computer Science & Healthcare Informatics
- **Academic Credentials:**
  - **BSc in Computer Science (Scholar)** — University of the People
  - **Diploma in Information & Communication Technology (Distinction)** — Siaya National Polytechnic
  - **Diploma in Registered Community Health Nursing (KRCHN)** — Kenya Medical Training College (KMTC)
- **GitHub:** [@MarkTechKe-design](https://github.com/MarkTechKe-design)
- **X / Twitter:** [@MarkTechKe](https://x.com/MarkTechKe)
- **Contact:** [oduor.markochieng@gmail.com](mailto:oduor.markochieng@gmail.com) | +254 718 178 521

---

## Flagship Systems & Platforms

### 1. MarkCare HMS Core
- **Domain:** Healthcare Informatics & Clinical Infrastructure
- **Architecture:** Next.js 15, TypeScript, React 19, Relational Data Engine
- **Features:** Multi-facility, branch-aware clinical enterprise suite managing electronic health records (EHR), automated triage priority queues, laboratory diagnostic workflows, and pharmacy billing reconciliation.

### 2. EduFlow Academic Suite
- **Domain:** Institutional Academic Management
- **Architecture:** Inertia.js, React, TypeScript, Laravel, PostgreSQL
- **Features:** Role-gated authentication pipelines, student grading rubrics, automated progress auditing, and staff attendance tracking.

### 3. VERIQ Forensic Engine
- **Domain:** Codebase Telemetry & Operational Auditing
- **Architecture:** Operational auditing scripts, runtime regression checks, deterministic uptime analysis, and automated health checks.

---

## Technology Stack

- **Core Framework:** Next.js 15.5+ (App Router, Server Components, Route Handlers)
- **Frontend & UI:** React 19, Tailwind CSS, Custom Token Architecture (`--orange: #ff6b1a`)
- **PWA & Offline Engine:** Serwist (`@serwist/next`), Service Worker Pre-caching & Runtime Caching
- **Motion & Experience:** GSAP 3 (ScrollTrigger), Lenis Smooth Scroll
- **Database Engine:** Hybrid Persistence Tier (Atomic Local File Engine + Upstash Redis KV)
- **Authentication:** Stateless Edge JWT Verification (`jose`), HTTP-Only Cookie Pipeline
- **Deployment Platform:** Vercel Edge Network with Automated Edge Caching & Security Headers

---

## Progressive Web App (PWA) & Offline Architecture

The application is built as an offline-first Progressive Web App:

1. **Installable Shell:** Configured via `src/app/manifest.js` with standalone display modes, theme palettes (`#080808`), and responsive application icons.
2. **Serwist Service Worker:** Managed via `@serwist/next` with automated webpack worker bundling into `/sw.js`.
3. **Caching Strategy:**
   - **Static Assets & HTML Pre-caching:** Core routes (`/`, `/about`, `/projects`, `/contact`), CSS bundles, and JavaScript runtime chunks are cached locally during the service worker install phase.
   - **Stale-While-Revalidate:** Images from Unsplash and GitHub avatars, alongside Google Font stylesheets, load immediately from disk cache while revalidating in the background.
   - **Offline Fallback:** If internet connectivity drops, the portfolio continues to load without standard browser offline errors.
4. **Client Registration:** Executed via `ServiceWorkerRegister.jsx`, registering `/sw.js` in production environments.

---

## Real-Time Analytics & Telemetry Engine

The administrative console features a live telemetry engine powered by Upstash Redis:

- **Active Session Tracking:** Client-side heartbeat pings (`/api/analytics/ping`) maintain transient session keys (`active_session:<uuid>`) in Redis with 45-second TTLs, tracking real-time concurrent visitors.
- **Immediate Session Leave:** `beforeunload` events send termination signals (`/api/analytics/ping-leave`) to immediately expire sessions on tab closure.
- **Atomic Visitor Counters:** `/api/analytics/visit` reads edge headers (`x-forwarded-for`, `x-vercel-ip-country`, `x-vercel-ip-city`, `user-agent`) to increment aggregate visits (`analytics:total_visits`), compute unique visitors via Redis Sets (`analytics:unique_ips`), and retain recent visit history (`analytics:recent_visits`).
- **Dynamic Stats Aggregation:** The `/api/analytics/stats` endpoint queries Redis atomically to populate the admin dashboard with live traffic, device classifications, and geographic points of origin.

---

## Hybrid Database Architecture

The data tier uses a dual-layer strategy designed to run anywhere with zero configuration overhead:

1. **Local Mode (Development & Self-Hosted VPS):** Reads and writes atomic JSON documents in `data/store/*.json`. No cloud account, database setup, or internet connection is required.
2. **Serverless Mode (Vercel Production):** When `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are provided in the environment, `src/lib/db.js` connects over HTTPS REST to **Upstash Redis**, persisting admin changes across serverless deployments.
3. **Graceful Fallback:** If Redis is empty or temporarily unreachable, the system transparently falls back to local baseline JSON fixtures.

### Datastores (`data/store/`)
- `projects.json` — Showcase portfolio items and technical breakdowns
- `links.json` — Active communication channels and social platforms
- `inquiries.json` — Client lead generation messages and contact form submissions
- `reviews.json` — Testimonials and peer endorsements
- `settings.json` — System runtime configurations and maintenance toggles
- `visits.json` — Local fallback record of traffic telemetry

---

## Security & Edge Headers

Configured directly inside `next.config.mjs`:

- **HSTS:** `max-age=63072000; includeSubDomains; preload`
- **Clickjacking Protection:** `X-Frame-Options: DENY`
- **MIME Sniffing Prevention:** `X-Content-Type-Options: nosniff`
- **Referrer Privacy:** `Referrer-Policy: strict-origin-when-cross-origin`
- **Strict Anti-Indexing:** All `/admin/*` routes enforce `X-Robots-Tag: noindex, nofollow, noarchive` to prevent search engine indexing of internal tooling.

---

## Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm, yarn, or pnpm

### Environment Configuration
Create a `.env.local` file in the root directory:

```env
# Admin Authentication Secret
ADMIN_JWT_SECRET="your-secure-jwt-secret-string"
ADMIN_PASSWORD="your-admin-password"

# Upstash Redis (Serverless Database & Live Analytics)
UPSTASH_REDIS_REST_URL="[https://your-upstash-instance.upstash.io](https://your-upstash-instance.upstash.io)"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"
