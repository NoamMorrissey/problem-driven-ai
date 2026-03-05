# RULES-project.md
Strategic Constitution of Problem-Driven AI

> **READ THIS FIRST**: This document defines the complete strategic framework for the Problem-Driven AI project. All decisions, architecture, and product definitions are settled and should not be revisited. Reference this document for project direction and scope validation.

## 1. Project Identity

**Name**: Problem-Driven AI
**Methodology**: Building AI products starting from the real problem
**Owner**: Alfonso Morcuende (alfonso.morcuende@gmail.com)
**Site**: Bilingual ES/EN
**Scope**: Methodology documentation + commercial programs + lead generation

## 2. Product Catalog (P1-P10)

| Product | Description | Key Features |
|---------|-------------|--------------|
| **P1: Public Website** | Bilingual site with 6 sections | 6 sections + Programs, Next.js 15, MDX, all public |
| **P2: Editorial CMS** | Admin panel for content management | Markdown editor, image management, drafts, scheduled publishing, bilingual |
| **P3: Lead Capture + Ebook** | Lead generation with automatic delivery | Configurable form, auto email via Resend, download tracking |
| **P4: Workshop Management** | Complete workshop lifecycle | CRUD, states (draft/published/past/cancelled), registration, gallery, CSV export |
| **P5: Enterprise Services** | Company client management | Cards with contact/sector/logo, services, photos, testimonials, internal notes |
| **P6: Events Management** | Event organization and tracking | CRUD, states (confirmed/pending/past), materials, photos, public page |
| **P7: CRM & Communications** | Unified contact management | Contacts from all sources, tagging, segmentation, email sending, history |
| **P8: AI Illustration Generator** | AI-powered image creation | Base prompt, scene input, PNG output, SVG option, gallery, variations |
| **P9: Central Dashboard** | Hub for all operations | Key metrics, module shortcuts, recent activity, workshop/event status |
| **P10: Analytics** | Privacy-first metrics | Page metrics, traffic, conversion, funnel, GDPR compliant, no tracking cookies |

## 3. Content Structure (6 Sections)

### Section Layout
- **Vision** (4 pages)
  - Overview
  - Manifesto
  - One-Pager
  - Human Thinking

- **Methodology** (31 pages)
  - 10 Principles
  - 20 Phases (5 modules × 4 phases each)
  - 1 FAQ

- **Planning** (30 pages)
  - 5 Phases × 6 pages each
    - Step by Step
    - Roles
    - Effort
    - Anti Patterns
    - Artifacts
    - Gate Review

- **Operational** (~37 pages with sub-sections)
  - Problem (10 pages)
  - Solution (14+ pages)
  - Context (6 pages)
  - AI Build (2 pages)
  - Market (5 pages)

- **Resources** (3 pages)
  - Glossary
  - Roadmap
  - Changelog

- **Programs** (dynamic)
  - Workshops
  - E-Book

### Content Characteristics
- **Total**: ~105 pages + dynamic content
- **Visibility**: ALL CONTENT IS PUBLIC
- **No hidden content**
- **No user registration required**
- **Authentication**: Admin panel only (magic links)

## 4. Technical Architecture

> Complete technical details are in RULES-architecture.md

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| **Framework** | Next.js 15 (App Router, Server Components, MDX) | Modern, performant, ESM-native |
| **Hosting** | Vercel (free tier) | Optimal for Next.js, seamless deployment |
| **Database & Auth** | Supabase (Postgres, magic links, Storage) | Free tier sufficient, single backend |
| **Email** | Resend (3,000/month free) | Reliable transactional email delivery |
| **AI Images** | Replicate (Flux) (1-5€/month) | Cost-effective image generation |
| **Analytics** | Umami (free) | GDPR compliant, privacy-first |
| **i18n** | next-intl | Bilingual ES/EN implementation |

**Infrastructure Commitment**: Monthly budget max €0-50

## 5. Implementation Phases

### Phase 1: Foundation (Weeks 1-3)
- Migrate to Next.js 15
- Configure Supabase (auth, storage)
- Set up all public content structure
- Implement admin panel
- Configure i18n (next-intl)

### Phase 2: Capture (Weeks 4-5)
- Lead capture forms
- Ebook delivery system
- Email integration (Resend)
- Basic CRM functionality

### Phase 3: Programs (Weeks 6-7)
- Workshop CRUD
- Public workshop pages
- Registration system
- Photo gallery

### Phase 4: Enterprise (Weeks 8-9)
- Company client management
- Event CRUD and pages
- Portfolio section

### Phase 5: Tools (Weeks 10-11)
- AI illustration generator
- Central dashboard
- Analytics dashboard
- Full CRM with communications

### Phase 6: Launch (Week 12)
- Integration testing
- Domain migration
- Admin documentation
- Go live

## 6. Current State

| Aspect | Status | Notes |
|--------|--------|-------|
| **Content Assets** | 124 existing .mdx files | From Docusaurus version, need reorganization to 6-section structure |
| **New Content Needed** | Identified | Human Thinking, FAQ, Discovery Bias, Problem Paths, Operating Cadences |
| **Landing Pages** | Existing texts | Previous structure, need adaptation |
| **Infrastructure** | Starting from scratch | Next.js + Supabase + Vercel |
| **Active Phase** | Pre-Phase 1 | Context Engineering design |
| **i18n** | Decided (ES/EN) | Implementation pending |

## 7. Decisions Locked (Do Not Revisit)

1. **Framework Migration**: Docusaurus → Next.js (not extended)
2. **Backend**: Supabase as single backend (multi-service replaced by integrated solution)
3. **Hosting**: Vercel for Next.js hosting
4. **Authentication**: Magic links for admin-only access (no passwords)
5. **Email**: Resend for transactional emails
6. **Content Visibility**: ALL public (no user registration, no hidden/premium content)
7. **Commercial Section**: Called "Programs" (not Products)
8. **Budget Constraint**: €0-50/month maximum
9. **Execution Model**: Alfonso manages all decisions without dedicated developer
10. **Development**: Built entirely with AI assistance (Claude)
11. **Internationalization**: Bilingual ES/EN with i18n library
12. **Site Structure**: 6-section layout (Vision, Methodology, Planning, Operational, Resources, Programs)
13. **URL Structure**: English URLs and section names as canonical (ES is translated variant)

---

**Last Updated**: 2026-03-05
**Version**: 1.0
**Owner**: Alfonso Morcuende
**Related Documents**: RULES-architecture.md, RULES-content.md, RULES-development.md
