# Technical Architecture - Problem-Driven AI

## 1. Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js | 15+ | App Router, Server Components, Server Actions |
| Language | TypeScript | 5+ | Strict mode enabled |
| Styles | Tailwind CSS | 4+ | Utility-first CSS |
| Database | Supabase Postgres | - | Free tier, RLS enabled |
| Auth | Supabase Auth | - | Magic links, admin-only, no public users |
| Storage | Supabase Storage | - | Buckets: images, documents, illustrations |
| Email | Resend | - | Free tier 3,000/month |
| AI Image | Replicate Flux | - | Pay-per-use via API |
| Analytics | Umami | - | Self-hosted on Vercel |
| Hosting | Vercel | - | Free tier |
| Content | MDX | @next/mdx | React components in markdown |
| Internationalization | next-intl | latest | Bilingual ES/EN |

## 2. Directory Structure

```
problem-driven-ai/
├── app/
│   ├── [locale]/              # i18n: /en/... and /es/...
│   │   ├── page.tsx           # Home
│   │   ├── vision/
│   │   ├── methodology/
│   │   │   ├── principles/
│   │   │   ├── phases/
│   │   │   └── faq/
│   │   ├── planning/
│   │   │   ├── problem-phase/
│   │   │   ├── context-phase/
│   │   │   ├── root-cause-phase/
│   │   │   ├── solution-phase/
│   │   │   └── market-phase/
│   │   ├── operational/
│   │   │   ├── problem/
│   │   │   ├── context/
│   │   │   ├── root-cause/
│   │   │   ├── solution/
│   │   │   └── market/
│   │   ├── resources/
│   │   ├── programs/
│   │   │   ├── workshops/
│   │   │   └── ebook/
│   │   └── layout.tsx
│   ├── admin/                 # Admin panel (no i18n)
│   │   ├── content/
│   │   ├── workshops/
│   │   ├── companies/
│   │   ├── events/
│   │   ├── crm/
│   │   ├── illustrations/
│   │   ├── analytics/
│   │   └── layout.tsx         # Admin auth middleware
│   ├── api/                   # API routes
│   │   ├── auth/
│   │   ├── email/
│   │   ├── illustrations/
│   │   └── webhooks/
│   └── layout.tsx             # Root layout
├── components/
│   ├── ui/
│   ├── content/
│   ├── admin/
│   └── layout/
├── content/                   # MDX content files
│   ├── en/                    # English content (mirror structure of sections)
│   └── es/                    # Spanish content (same structure)
├── lib/
│   ├── supabase/
│   ├── resend/
│   ├── replicate/
│   └── utils/
├── public/
│   └── img/
├── styles/
│   └── globals.css
├── .instructions/             # Context Engineering system
│   ├── rules/
│   ├── skills/
│   ├── agents/
│   └── templates/
└── supabase/
    ├── migrations/
    └── seed.sql
```

## 3. Code Conventions

### Naming Conventions
- **Files/folders**: `kebab-case`
- **React components**: `PascalCase`
- **Functions/variables**: `camelCase`
- **Types/interfaces**: `PascalCase` with descriptive prefix
- **Global constants**: `SCREAMING_SNAKE_CASE`
- **Supabase tables**: `snake_case`
- **URL routes**: English with kebab-case as canonical

### Component Architecture
- **Server Components** by default
- **Client Components** only for: event handlers, state hooks, effects, browser APIs
- Mark with `'use client'` on first line when needed
- Prefer composition over inheritance
- Props typed with explicit interfaces

### Data & Validation
- Zod validation on all user inputs
- Server Actions for form mutations
- RLS enabled on ALL Supabase tables
- Never expose `service_role` key to client
- MDX files read from `content/` directory
- Mermaid rendered client-side with wrapper component

## 4. Database Schema

### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('admin')) NOT NULL DEFAULT 'admin',
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### contacts
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  source TEXT CHECK (source IN ('ebook', 'workshop', 'empresa', 'evento', 'manual')),
  source_detail TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### workshops
```sql
CREATE TABLE workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  is_online BOOLEAN DEFAULT FALSE,
  price NUMERIC(10, 2),
  max_seats INTEGER,
  status TEXT CHECK (status IN ('draft', 'published', 'past', 'cancelled')) DEFAULT 'draft',
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### workshop_registrations
```sql
CREATE TABLE workshop_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### companies
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  sector TEXT,
  logo_url TEXT,
  notes TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### company_services
```sql
CREATE TABLE company_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  service_type TEXT CHECK (service_type IN ('taller', 'consultoria', 'otro')),
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### testimonials
```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_role TEXT,
  content TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### events
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  event_type TEXT CHECK (event_type IN ('conferencia', 'meetup', 'webinar', 'otro')),
  external_url TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### illustrations
```sql
CREATE TABLE illustrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt TEXT NOT NULL,
  image_url TEXT,
  svg_url TEXT,
  section TEXT,
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### ebook_downloads
```sql
CREATE TABLE ebook_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  referrer TEXT
);
```

### communications
```sql
CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_provider_id TEXT
);
```

### site_settings
```sql
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 5. Migration from Docusaurus

### Preserved Assets
- 124 .mdx files content
- Mermaid diagrams
- Frontmatter (adapted)

### Structural Changes
| Aspect | Before | After |
|--------|--------|-------|
| Content depth | 5 levels | 6 sections |
| Router | Docusaurus | Next.js App Router |
| Styling | CSS modules | Tailwind CSS |
| Build | `docusaurus build` | `next build` |
| Languages | Spanish only | Bilingual ES/EN |

### Components to Migrate
- `PhaseCardList`
- `SaturationChart`
- `RadarChart`
- `StepAccordion`
- Section hero divs
- Mermaid code blocks

### New Content to Create
- Human Thinking
- FAQ (Frequently Asked Questions)
- Discovery Bias
- Problem Paths
- Operating Cadences
