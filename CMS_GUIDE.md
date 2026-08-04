# SAH Company CMS Guide

A fully data-driven content management system for the SAH Company website. Every page, product, category, and certification is managed from the admin dashboard without code changes.

## Quick Start

### 1. Access Admin Panel
- URL: `http://localhost:3000/admin`
- **Default credentials:**
  - Email: `admin@example.com`
  - Password: `Admin@123456`

**⚠️ Change these in production** by updating `.env`:
```env
ADMIN_EMAIL=your-email@company.com
ADMIN_INITIAL_PASSWORD=YourSecurePassword123!
```

Then reseed the database: `npm run db:reset` (deletes all data and reinitializes)

### 2. Database

**SQLite (Local Development):**
```bash
npm run prisma:migrate    # Apply migrations
npm run prisma:seed       # Seed with initial data
npm run db:reset          # Full reset (DANGER!)
```

**PostgreSQL (Production via Neon):**
Update `.env`:
```env
DATABASE_URL=postgresql://user:password@neon.tech/dbname
```

Then run migrations: `npm run prisma:migrate`

---

## CMS Features

### 📄 Pages Manager

Manage all public pages and their content sections. Each page is composed of editable sections.

**Sections you can add:**
- `hero` — Main heading, subheading, CTAs
- `trust-strip` — Stats: heritage, location, incoterms, categories
- `trading-roots` — Company story/mission section
- `categories-showcase` — Product category cards
- `why-choose-us` — Value propositions (8 items)
- `quality-process` — 10-step sourcing timeline
- `packaging-shipment` — Packaging options, logistics
- `industries-served` — Industries we serve
- `rfq-form` — Request for quote form

**Workflow:**
1. Go to **Admin → Pages**
2. Click **Edit** on the home page (or create a new page)
3. Update title, description, status
4. Click on individual sections to customize their content
5. Changes appear live without redeploying

### 🛍️ Products Manager

Full CRUD for all products across sesame, pulses, and rice categories.

**Create a Product:**
1. **Admin → Products → + New Product**
2. Fill in:
   - **Name**: "White Sesame Seeds"
   - **Slug**: "white-sesame-seeds" (URL identifier)
   - **Category**: Choose from Sesame/Pulses/Rice
   - **Origin**: "Faisalabad, Pakistan"
   - **Specifications**: JSON format (flexible per category)
     ```json
     {
       "purity": "98%",
       "moisture": "12%",
       "oilContent": "52%",
       "color": "Bright white",
       "packaging": "50kg bags",
       "moq": "20 MT"
     }
     ```
   - **Status**: Draft or Published

**Edit Product:**
1. **Admin → Products → [Product Name]**
2. Modify any fields
3. Add/remove images via Cloudinary widget (coming soon)
4. Publish when ready

**Products appear:**
- On category pages (filtered by category)
- In the homepage showcase (if published)
- Via API at `/api/products?category=sesame`

### 📁 Categories Manager

Manage product categories (Sesame, Pulses, Rice + custom).

**Create Category:**
1. **Admin → Categories → + New Category**
2. **Name**: "Organic Sesame"
3. **Slug**: "organic-sesame" (URL-safe identifier)
4. **Icon**: Choose an emoji (🌾, 🫘, 🍚, etc.)

Products automatically filter by category on the frontend.

### ✓ Certifications Manager

Track certifications (ISO, HACCP, Organic, SGS testing, COA, etc.)

**Create Certification:**
1. **Admin → Certifications → + New Certification**
2. **Name**: "ISO 9001:2015"
3. **Description**: "Quality management system certification"
4. **Sort Order**: Controls display order (lower = first)

Display certifications on:
- Homepage trust strip
- Product pages
- About page (coming soon)

### 💬 Enquiries Manager

View all RFQ submissions from the website form.

**Track Enquiry:**
1. **Admin → Enquiries**
2. Click **View** on any enquiry
3. Update **Status**:
   - `NEW` — Just received
   - `IN_PROGRESS` — We're working on it
   - `RESPONDED` — We replied
   - `CLOSED` — Done
4. **Email Sent** badge shows if confirmation was delivered

Enquiries saved to database even if email fails (backup of record).

### ⚙️ Settings

Global site configuration (company info, social links, contact details).

**Available settings:**
- Company name & legal entity name
- Address (office location)
- Phone numbers (primary, secondary)
- Email & WhatsApp
- Social media links (LinkedIn, Facebook, etc.)

Settings load on every page footer + header (WhatsApp CTA).

---

## Data Model (Prisma Schema)

### Product
```prisma
- id (unique)
- categoryId (foreign key to Category)
- name (required)
- slug (unique, URL-safe)
- origin (e.g., "Faisalabad, Pakistan")
- specs (JSON string, flexible per category)
- status (DRAFT | PUBLISHED)
- images (relationship to ProductImage)
- sortOrder (for ordering in lists)
- createdAt, updatedAt
```

### Category
```prisma
- id (unique)
- name (unique)
- slug (unique)
- icon (emoji)
- products (relationship to Product)
- createdAt, updatedAt
```

### Certification
```prisma
- id (unique)
- name (certification name)
- description (optional details)
- iconUrl (optional icon/image)
- sortOrder (display order)
- createdAt, updatedAt
```

### Page
```prisma
- id (unique)
- slug (unique, e.g., "home", "about")
- title (page title for SEO)
- description (meta description)
- ogImage (Open Graph image URL)
- canonical (canonical URL)
- seoData (structured data JSON)
- status (DRAFT | PUBLISHED)
- sections (relationship to PageSection)
- createdAt, updatedAt
```

### PageSection
```prisma
- id (unique)
- pageId (foreign key to Page)
- type (section type: hero, trust-strip, etc.)
- content (JSON string, flexible per type)
- sortOrder (display order within page)
- createdAt, updatedAt
```

### Enquiry
```prisma
- id (unique)
- buyerName, company, country, email, phone
- product (product name requested)
- quantity, packaging, incoterm
- sampleRequest (boolean)
- comments (additional notes)
- attachmentUrl (Cloudinary URL if file uploaded)
- status (NEW | IN_PROGRESS | RESPONDED | CLOSED)
- ipHash (hashed IP for rate limiting)
- emailSent (boolean, confirmation sent?)
- createdAt, updatedAt
```

### AdminUser
```prisma
- id (unique)
- email (unique)
- passwordHash (bcrypt)
- createdAt, updatedAt
```

### SiteSettings
```prisma
- key (unique, e.g., "company.name", "contact.email")
- value (JSON string, any config value)
- updatedAt
```

---

## API Routes

All admin routes require authentication (Admin/Login middleware).

| Method | Route | Purpose |
|--------|-------|---------|
| `GET`  | `/api/pages` | List all pages |
| `GET`  | `/api/pages/[id]` | Get page with sections |
| `PUT`  | `/api/pages/[id]` | Update page metadata |
| `POST` | `/api/products` | Create product |
| `GET`  | `/api/products` | List products |
| `PUT`  | `/api/products/[id]` | Update product |
| `POST` | `/api/categories` | Create category |
| `POST` | `/api/certifications` | Create certification |

**Public API (no auth required):**
| Route | Purpose |
|-------|---------|
| `GET /api/products?category=sesame` | Get products by category |
| `GET /api/categories` | List all categories |
| `GET /api/certifications` | List certifications |

---

## Revalidation Strategy

When you edit content in the admin, pages automatically update **without redeploy**:

1. Admin form submission → API route
2. Prisma database update
3. `revalidatePath()` / `revalidateTag()` triggers
4. Next.js regenerates affected pages
5. Live site reflects changes in ~1 second

**Automatically revalidated:**
- `/admin/pages` → homepage (if "home" page edited)
- `/admin/products` → category pages, product listings
- `/admin/certifications` → pages that display certs
- `/admin/settings` → footer, header (global)

---

## Authentication & Security

### Login Flow
1. Email + password → `/api/auth/[...nextauth]`
2. `lib/auth.ts` uses Credentials provider
3. Bcrypt password hash validation (not plain text)
4. JWT session token (no database session table needed)
5. Middleware protects `/admin/*` routes

### Protected Routes
- `/admin/pages` ✓ requires login
- `/admin/products` ✓ requires login
- `/admin/login` ✗ public (login page itself)
- `/api/pages/[id]` ✓ requires auth for PUT/POST

**Public Routes** (no auth needed):
- `/` (homepage)
- `/admin/login` (login page)
- `/api/categories` (product categories)

---

## Common Tasks

### Change Admin Password
1. Update `.env.local`:
   ```env
   ADMIN_EMAIL=admin@example.com
   ADMIN_INITIAL_PASSWORD=NewPassword123!
   ```
2. Reset database:
   ```bash
   npm run db:reset
   ```
   **⚠️ WARNING:** This deletes ALL data. Seed database after.

### Backup Database
```bash
# SQLite (local)
cp prisma/dev.db prisma/dev.db.backup

# PostgreSQL (production)
pg_dump $DATABASE_URL > backup.sql
```

### Export Products as JSON
```bash
# Via API
curl http://localhost:3000/api/products > products.json

# Via Prisma directly
npx prisma db execute --stdin < script.sql
```

### Add Bulk Products
1. Export current products (above)
2. Create CSV, convert to JSON
3. Write a one-time migration script:
   ```bash
   cat > bulk-import.ts <<'EOF'
   import { prisma } from '@/lib/prisma'
   import products from './products.json'
   
   async function main() {
     await prisma.product.createMany({ data: products })
   }
   main()
   EOF
   
   npx tsx bulk-import.ts
   ```

### Move to Production (Neon Postgres)

1. **Create Neon Postgres database** → copy connection string
2. **Update `.env.production`:**
   ```env
   DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/dbname
   ```
3. **Deploy to Vercel:**
   ```bash
   git push origin main  # auto-deploys
   ```
4. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```
5. **Seed production:**
   ```bash
   ADMIN_EMAIL=prod@company.com \
   ADMIN_INITIAL_PASSWORD=SecurePass123! \
   npx prisma db seed --skip-generate
   ```

---

## Roadmap (Future Features)

- [ ] **Image Upload Widget** — Cloudinary `<CldUploadWidget>` in product editor
- [ ] **SEO Editor** — Per-page title, description, OG images, JSON-LD
- [ ] **Page Section Editor** — Visual editor for hero, trust-strip content
- [ ] **Email Logging** — Resend/retry RFQ confirmation emails
- [ ] **Bulk Import** — CSV → Products importer
- [ ] **Revision History** — Track who changed what and when
- [ ] **Multi-language i18n** — Arabic, Chinese, French, German
- [ ] **Analytics** — Vercel Analytics dashboard in admin
- [ ] **Webhooks** — Notify external systems on new enquiries
- [ ] **Rate Limiting** — Upstash Redis for RFQ spam protection

---

## Troubleshooting

### "Unauthorized" when accessing `/admin`
- Make sure you're logged in: go to `/admin/login`
- Session may have expired, refresh or log in again
- Check middleware in `middleware.ts` — should redirect to login

### Products not appearing on homepage
- Product must have status = `PUBLISHED`
- Homepage `PageSections` must include `type: 'categories-showcase'`
- Clear Next.js cache: `rm -rf .next`

### Database locked error (SQLite)
- SQLite doesn't support concurrent writes
- Close all connections: `npm run dev` (single process)
- Switch to PostgreSQL for production

### Changes not appearing live
- `revalidatePath()` may not have triggered
- Clear cache: `rm -rf .next`
- Check browser cache: hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Admin login not working
- Check `.env` for `NEXTAUTH_SECRET` (required)
- Verify admin user exists: `npx prisma studio` → AdminUser table
- Reseed: `npm run prisma:seed`

---

## File Structure

```
app/
├── admin/
│   ├── login/page.tsx              # Login UI
│   ├── layout.tsx                  # Admin sidebar + layout
│   ├── page.tsx                    # Dashboard
│   ├── pages/
│   │   ├── page.tsx                # Pages list
│   │   ├── create/page.tsx          # New page (coming soon)
│   │   └── [id]/page.tsx            # Edit page
│   ├── products/
│   │   ├── page.tsx                # Products list
│   │   ├── create/page.tsx          # Create product
│   │   └── [id]/page.tsx            # Edit product
│   ├── categories/
│   │   ├── page.tsx                # Categories list
│   │   └── create/page.tsx          # Create category
│   ├── certifications/
│   │   ├── page.tsx                # Certifications list
│   │   └── create/page.tsx          # Create certification
│   ├── enquiries/page.tsx           # Enquiries list
│   └── settings/page.tsx            # Global settings
├── api/
│   ├── auth/[...nextauth]/route.ts # Auth handler
│   ├── pages/[id]/route.ts         # Update page
│   ├── products/route.ts           # Create product
│   ├── products/[id]/route.ts      # Update product
│   ├── categories/route.ts         # Create category
│   └── certifications/route.ts     # Create certification
├── layout.tsx                      # Root layout
└── page.tsx                        # Homepage (reads from DB)

components/
├── admin/
│   ├── AdminSidebar.tsx            # Admin nav
│   └── forms/
│       ├── PageEditForm.tsx         # Edit page UI
│       ├── ProductEditForm.tsx      # Edit product UI
│       └── ProductCreateForm.tsx    # Create product UI
├── marketing/                       # Marketing sections (unchanged)
└── PageRenderer.tsx                 # DB-driven page renderer

lib/
├── auth.ts                         # NextAuth config
└── prisma.ts                       # Prisma client singleton

prisma/
├── schema.prisma                   # Data model
└── seed.ts                         # Initial data

middleware.ts                       # Auth middleware
types/
└── next-auth.d.ts                 # TypeScript types
```

---

## Support & Docs

- **Next.js 14 Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Auth.js v5 Docs:** https://authjs.dev/getting-started
- **Tailwind CSS:** https://tailwindcss.com/docs

For questions about this specific CMS, check the implementation in `components/admin/forms/` and `app/api/`.

---

**Last Updated:** 2026-07-31  
**Status:** ✅ Production Ready
