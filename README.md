# Problem-Driven AI

A methodology for building AI products starting from the real problem.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, TypeScript)
- **Styling:** Tailwind CSS 4
- **Database & Auth:** Supabase (Postgres, magic links, Storage)
- **Email:** Resend
- **AI Images:** Replicate (Flux)
- **Analytics:** Umami
- **i18n:** next-intl (ES/EN)
- **Hosting:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Supabase, Resend, and other credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
problem-driven-ai/
├── src/
│   ├── app/
│   │   ├── [locale]/          # i18n public routes (EN/ES)
│   │   ├── admin/             # Admin panel (no i18n)
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── content/           # MDX content components
│   │   ├── layout/            # Navbar, locale switcher, analytics
│   │   ├── admin/             # Admin UI components
│   │   └── ui/                # Shared UI primitives
│   ├── i18n/                  # next-intl config
│   └── lib/                   # Supabase, Resend, utilities
├── content/
│   ├── en/                    # English MDX content
│   └── es/                    # Spanish MDX content
├── supabase/
│   └── migrations/            # SQL migrations
├── messages/                  # i18n message files
└── .instructions/             # Context Engineering system
```

## Content Sections

1. **Vision** — Manifesto and overview
2. **Methodology** — 10 Principles + 5 Phases
3. **Planning** — Step-by-step guides per phase
4. **Operational** — Techniques by area
5. **Resources** — Glossary, changelog, roadmap
6. **Programs** — Workshops, e-book

## License

All rights reserved. Alfonso Morcuende.
