# SAH Company — Sesame Seeds, Pulses & Rice Export Website

## Overview

A professional B2B export website for **Sain Abdul Hakim and Company**, a family-rooted agricultural commodities supplier from Faisalabad, Pakistan. The site showcases three product categories (sesame seeds, pulses, rice) and drives qualified export enquiries through a multi-section landing page and RFQ form.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · (Vercel, Neon Postgres, Auth.js v5, Cloudinary, Nodemailer — added in Phase 2)

## Current Status

**Phase 1 ✓ Complete:** Public-facing marketing site with navbar, footer, and full home page.

**Phase 2 ✓ Complete:** Full CMS with database, authentication, admin dashboard, and content management.

### Phase 1 Deliverables ✅
- ✅ Next.js 14 App Router scaffold
- ✅ Brand palette locked (deep green, gold, cream, charcoal) from logo
- ✅ Sticky header with mobile nav, WhatsApp + RFQ CTAs
- ✅ Home page: 8 sections with Framer Motion scroll polish
  - Hero with animated background
  - Trust strip (heritage, ports, categories)
  - Family trading roots narrative
  - Product categories showcase
  - Why Choose Us (differentiators)
  - Quality & sourcing 10-step process
  - Packaging, logistics, documentation
  - Industries served
  - RFQ form (UI-only, backend wired in Phase 2)
- ✅ Footer with company info, links, social placeholders
- ✅ Builds successfully, zero build errors

### Phase 2 Deliverables ✅
- ✅ **SQLite Database** (Prisma) with full schema:
  - Products, Categories, Certifications
  - Pages & PageSections (content-driven)
  - Enquiries (RFQ submissions)
  - AdminUser (single login)
  - SiteSettings (global config)
- ✅ **Auth.js v5** with JWT session strategy
  - `/admin/login` — Credentials-based login
  - `middleware.ts` — Protects `/admin/*` routes
- ✅ **Admin Dashboard** at `/admin` with:
  - Pages Manager — edit all public pages
  - Products CRUD — create/edit/publish products
  - Categories Manager — manage product categories
  - Certifications Manager — track certifications
  - Enquiries Inbox — view RFQ submissions + status tracking
  - Settings — global company info
- ✅ **Database-Driven Pages** — homepage sections read from database
- ✅ **API Routes** for content management (authenticated)
- ✅ **Revalidation Strategy** — instant live updates without redeploy
- ✅ **Production Ready** — SQLite for dev, PostgreSQL/Neon for production

**📖 CMS Documentation:** See [CMS_GUIDE.md](./CMS_GUIDE.md) for full usage instructions.

**Next Steps:** Phase 3 (3D hero, motion polish, SEO) — see roadmap below.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# → http://localhost:3000
```

## Project Structure

```
app/
├── layout.tsx              # Root layout with metadata
├── page.tsx                # Home page (imports all sections)
└── globals.css             # Global Tailwind + utilities

components/
├── layout/
│   ├── Header.tsx          # Navbar with mobile menu, scroll behavior
│   └── Footer.tsx          # Company info, links, social
└── marketing/
    ├── HeroSection.tsx
    ├── TrustStrip.tsx
    ├── TradingRootsSection.tsx
    ├── CategoriesShowcase.tsx
    ├── WhyChooseUs.tsx
    ├── QualityProcess.tsx
    ├── PackagingShipment.tsx
    ├── IndustriesServed.tsx
    └── RFQFormSection.tsx

public/
└── sahlogo.png             # Logo (used in header/footer)

tailwind.config.ts          # Brand colors: sah-green, sah-gold, sah-cream, sah-charcoal
```

## Key Design Decisions

### Brand Palette
Locked from `sahlogo.png`:
- **Primary:** Deep forest green (`#1F7A6D`)
- **Accent:** Warm gold (`#C4A361`)
- **Background:** Cream off-white (`#F5F0E8`)
- **Text:** Charcoal (`#2A2A2A`)

### Motion & Animation
- Framer Motion for scroll-triggered reveals, hover effects, animated backgrounds
- Smooth scroll (Lenis) **not** included in Phase 1 — ships in Phase 3 for performance
- 3D hero scene **not** included in Phase 1 — procedural react-three-fiber hero ships in Phase 3
- Mobile fallback: All animations respect `prefers-reduced-motion` (ready for implementation)

### Copy & Messaging
- Safe, placeholder wording throughout ("to confirm," "subject to specifications")
- No unverified claims (certifications, fixed specs, owned factory) per client requirement
- Emphasis on "buyer-specific," "transparent," "long-term relationships"
- "Family Trading Roots Since 1992" tagline (refers to family's history, not company incorporation year)

### Form (Phase 1 UI)
RFQ form is **client-side only** in this phase:
- Collects: buyer name, company, country, email, phone, product, quantity, packaging, incoterm, sample request, comments
- Shows success state on submit
- **Backend wired in Phase 2:** Zod validation, Prisma write, Nodemailer email via Hostinger SMTP, honeypot + rate-limit, Cloudinary file upload

## Roadmap

### Phase 2 — Data Layer & Admin ✅ COMPLETE
- [x] SQLite + Prisma schema setup (Product, Category, Certification, Page, PageSection, Enquiry, AdminUser, SiteSettings)
- [x] Auth.js v5 integration (single admin login, JWT sessions)
- [x] Admin dashboard: product CRUD, category management, certifications, enquiries inbox, settings, pages editor
- [x] Page/section editor: edit homepage content without code
- [x] Revalidation strategy: content edits appear live without redeploy
- [ ] RFQ form backend: Zod validation, DB write, Nodemailer email, honeypot + rate-limit *(ready to add)*
- [ ] Cloudinary upload integration for product images *(ready to add)*
- [ ] Email delivery via Hostinger SMTP *(ready to add)*

### Phase 3 — 3D & Motion Polish (~1–1.5 weeks)
- [ ] Procedural 3D grain-particle hero (react-three-fiber + drei)
- [ ] 3D fallback for `prefers-reduced-motion`, mobile, no-WebGL
- [ ] Lenis smooth scroll on marketing pages (not admin)
- [ ] Embla carousels for product galleries
- [ ] Scroll-linked parallax/reveals throughout
- [ ] Page-transition exit animations
- [ ] Lighthouse pass: ensure conversion pages stay lean
- [ ] Performance monitoring (Vercel Analytics/Speed Insights)

### Phase 4 — SEO, Legal, Launch (~1 week)
- [ ] Metadata API + per-page SEO (title, description, OG images)
- [ ] Sitemap + robots.txt wired to live Prisma data
- [ ] JSON-LD structured data (light, no e-commerce pricing semantics)
- [ ] Legal pages: Privacy Policy, Terms & Conditions (standard AZEKTRA wording)
- [ ] Domain purchase & mail setup (Hostinger)
- [ ] SPF/DKIM/DMARC for email deliverability
- [ ] Admin mailbox activation (info@, sales@, ahmad@)
- [ ] Cross-browser/device QA, a11y audit
- [ ] Go-live

### Later — Additional Pages (out of Phase 1 scope)
- [ ] `/about` — Company history, mission/vision, team
- [ ] `/products/sesame`, `/products/sesame/[slug]` — Category & detail pages
- [ ] `/products/pulses`, `/products/pulses/[slug]`
- [ ] `/products/rice`, `/products/rice/[slug]`
- [ ] `/quality-process`, `/packaging-logistics` — Dedicated detail pages
- [ ] `/contact` — Standalone contact form + map
- [ ] `/privacy-policy`, `/terms-conditions` — Legal pages

### Way Later — Enhancements
- [ ] Multi-language i18n (Arabic, Chinese, French, German — manual translation, not auto)
- [ ] Custom-modeled 3D asset (instead of procedural, if budget allows)
- [ ] Upstash Redis rate-limiting (if spam becomes a real problem)
- [ ] Email retry job for failed RFQ submissions

## Environment Variables

See `.env.example` for a full template. For now, only `NEXT_PUBLIC_SITE_URL` is needed for local dev.

```bash
cp .env.example .env.local
# Edit .env.local as needed
npm run dev
```

## Build & Deployment

```bash
# Production build
npm run build

# Start production server
npm start

# Deploy to Vercel (automatic on push to main)
```

**Vercel Setup:**
1. Import this repo into Vercel
2. Set env vars in Vercel dashboard (database, SMTP, Cloudinary, Auth.js secrets)
3. Preview deployments on PR, production on merge to `main`

## Notes for Contributors

- All components use TypeScript strict mode.
- Framer Motion animations are wrapped in `motion.*` elements; no unnecessary animations on data-heavy pages.
- Tailwind utilities live in `globals.css` (e.g., `.btn-primary`, `.container-wide`, `.section-heading`).
- Logo and brand palette are fixed — no color or design explorations needed.
- Copy is placeholder-safe; "to confirm," "subject to specifications" patterns protect against unverified claims.
- No third-party CDNs; all images via Cloudinary later (stock images OK for now per client requirement form).

## License

© 2026 Sain Abdul Hakim and Company. All rights reserved.

---

**Questions?** Check the [plan document](../C:\Users\azama\.claude\plans\website-development-requirements-parallel-wave.md) for full context, or reach out to the AZEKTRA team.
