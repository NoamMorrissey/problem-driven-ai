# Roadmap: Problem-Driven AI — De v0.1 a v1.0

## Context

Problem-Driven AI es una metodología para construir productos de IA centrados en el problema.
El ecosistema incluye un sitio bilingüe (ES/EN), programas formativos, servicios de consultoría,
y un panel de administración con 10 productos integrados (P1-P10).

Este roadmap unifica dos líneas: **producto** (infraestructura y funcionalidades) y
**contenido** (páginas, templates, caso de estudio). Ambas avanzan en paralelo dentro de cada fase.

**Prioridades para v1.0:** Sitio funcional completo + profundidad de contenido sin huecos + herramientas prácticas.

---

## Modelo de Versionado

Semver con milestones temáticos: `MAJOR.MINOR.PATCH`
- **PATCH (0.x.Y):** Fixes, correcciones, ajustes menores
- **MINOR (0.Y.0):** Nueva fase completada, nuevas funcionalidades
- **MAJOR:** 1.0 = lanzamiento público

Tags Git: `v0.1`, `v0.2`, ..., `v1.0`
Cada tag corresponde a un merge `develop → main`.

---

## v0.1 — *Foundation* (Fase 1, semanas 1-3)

**Productos:** P1 (Sitio), P10 (Analytics)
**Objetivo:** Sitio Next.js funcional con todo el contenido público migrado.

### Infraestructura:
- [ ] Next.js 15 scaffold (App Router, TypeScript, Tailwind)
- [ ] Supabase proyecto + migraciones SQL + RLS
- [ ] next-intl configurado (ES/EN)
- [ ] MDX pipeline (loader, componentes custom, frontmatter)
- [ ] Auth admin (magic links, middleware)
- [ ] Umami analytics
- [ ] Vercel deploy (preview en develop, producción en main)

### Contenido:
- [ ] Migrar 124 .mdx a nueva estructura de 6 secciones
- [ ] Reorganizar en content/en/ y content/es/
- [ ] Verificar que todo el contenido renderiza correctamente
- [ ] Adaptar frontmatter al nuevo formato

### Context Engineering:
- [ ] Sistema .instructions/ unificado (primer commit del repo)

### Verificación:
- [ ] `npm run build` sin errores
- [ ] Todas las páginas accesibles en ambos idiomas
- [ ] Locale switcher funcional
- [ ] Admin protegido por auth

---

## v0.2 — *Capture* (Fase 2, semanas 4-5)

**Productos:** P3 (Lead/Ebook), P7 (CRM básico)
**Objetivo:** Formulario de captura + entrega automática de e-book + CRM básico.

### Infraestructura:
- [ ] Formulario de lead capture (Server Actions + Zod)
- [ ] Entrega automática de e-book por email (Resend)
- [ ] Tabla contacts en Supabase con source tracking
- [ ] CRM básico en admin: lista de contactos, filtros, exportar CSV

### Contenido:
- [ ] Landing pages de Programs (workshops, e-book)
- [ ] Contenido del e-book (si no existe, placeholder)

### Verificación:
- [ ] Formulario funcional end-to-end (submit → email → download)
- [ ] Contacto aparece en CRM con source "ebook"
- [ ] Email llega correctamente con PDF adjunto

---

## v0.3 — *Programs* (Fase 3, semanas 6-7)

**Productos:** P4 (Workshops)
**Objetivo:** CRUD de workshops + página pública + inscripciones.

### Infraestructura:
- [ ] CRUD workshops en admin (crear, editar, publicar, archivar)
- [ ] Página pública de workshops (listado + detalle)
- [ ] Formulario de inscripción → contacts
- [ ] Galería de fotos por workshop
- [ ] Exportar inscritos CSV

### Contenido nuevo:
- [ ] Human Thinking (Vision)
- [ ] FAQ (Methodology)
- [ ] Discovery Bias (Operational Solution)
- [ ] Problem Paths: Hypothesis-Driven Path + Hypothesis Pyramid
- [ ] Problem Paths: Issue-Driven Path + Issue Tree
- [ ] Problem Paths: Design Thinking Path overview

### Verificación:
- [ ] Workshop creado en admin aparece en página pública
- [ ] Inscripción funcional, contacto en CRM con source "workshop"
- [ ] Nuevo contenido renderiza correctamente en ambos idiomas

---

## v0.4 — *Enterprise* (Fase 4, semanas 8-9)

**Productos:** P5 (Servicios empresa), P6 (Eventos)
**Objetivo:** Fichas de empresa + servicios + eventos + páginas públicas.

### Infraestructura:
- [ ] CRUD empresas en admin (contacto, sector, logo, notas)
- [ ] Servicios prestados por empresa
- [ ] Testimonios (públicos/privados)
- [ ] CRUD eventos (conferencias, meetups, webinars)
- [ ] Página pública de próximos eventos + archivo
- [ ] Página pública de logos de clientes + testimonios

### Contenido nuevo:
- [ ] Design Thinking: Ideation (7 técnicas)
- [ ] Design Thinking: Validation (4 técnicas)
- [ ] Operating Cadences (Operational Market)
- [ ] Técnicas Operational Problem restantes

### Verificación:
- [ ] Empresa con testimonio público visible en la web
- [ ] Evento creado en admin aparece en página pública
- [ ] Todo el contenido Operational está completo

---

## v0.5 — *Tools* (Fase 5, semanas 10-11)

**Productos:** P2 (CMS), P8 (Ilustraciones IA), P9 (Dashboard)
**Objetivo:** Panel admin completo con CMS, generador de ilustraciones, y dashboard.

### Infraestructura:
- [ ] CMS: editor markdown, gestión de imágenes, borradores, publicación
- [ ] Generador de ilustraciones IA (Replicate/Flux)
- [ ] Galería de ilustraciones, variaciones, descarga
- [ ] Dashboard central: métricas, accesos directos, actividad reciente
- [ ] CRM completo: etiquetado, segmentación, envío de emails, historial

### Contenido:
- [ ] Quick Start tutorial (guía paso a paso de la metodología)
- [ ] Caso de estudio end-to-end (5 fases aplicadas)
- [ ] Templates descargables (Tier 1: 8 templates prioritarios)

### Verificación:
- [ ] CMS permite crear y publicar una página sin tocar código
- [ ] Ilustración generada con prompt base produce resultado consistente
- [ ] Dashboard muestra métricas reales
- [ ] Quick Start navegable de principio a fin

---

## v1.0 — *Launch* (Fase 6, semana 12)

**Objetivo:** Lanzamiento público. Todo funcional, pulido, y validado.

### Acciones:
- [ ] Revisión completa de contenido (coherencia, errores, gaps)
- [ ] SEO: meta descriptions, Open Graph, sitemap
- [ ] UX: navegación fluida, responsive, accesibilidad
- [ ] Performance: Lighthouse ≥ 90 en todas las categorías
- [ ] Migración de dominio a producción
- [ ] Documentación de admin para uso personal
- [ ] Templates restantes (Tier 2 y 3 si es posible)

### Verificación:
- [ ] 0 broken links
- [ ] Locale switcher funcional en todas las páginas
- [ ] Formularios funcionan end-to-end
- [ ] Admin completo y usable
- [ ] Deploy a producción exitoso

---

## Post-v1.0 — Visión de futuro

### v1.x — *Excellence*

| Componente | Descripción |
|---|---|
| Centro de Excelencia | Estructura organizacional, roles, procesos formalizados |
| Ceremonias | Rituales de equipo (kickoffs, reviews, retrospectivas) |
| Métricas avanzadas | KPIs por fase, dashboards de seguimiento |
| Templates Tier 2-3 | 12 templates adicionales + guías visuales |

### v2.0 — *Ecosystem*

| Componente | Descripción |
|---|---|
| Módulo BMAD | Extensión de BMAD adaptada a Problem-Driven AI |
| Comunidad | Discord/GitHub Discussions, contribuciones externas |
| Casos de estudio | Biblioteca de casos reales de diferentes industrias |
| Certificación | Formación y certificación en la metodología |

---

## Resumen visual

```
v0.1 (Foundation)  → Sitio Next.js + contenido migrado + analytics
     ↓
v0.2 (Capture)     → Lead capture + e-book + CRM básico
     ↓
v0.3 (Programs)    → Workshops + contenido nuevo (Human Thinking, FAQ, Paths)
     ↓
v0.4 (Enterprise)  → Empresas + eventos + contenido Operational completo
     ↓
v0.5 (Tools)       → CMS + ilustraciones IA + dashboard + Quick Start
     ↓
v1.0 (Launch)      → Pulido + SEO + migración dominio + lanzamiento
     ↓
v1.x (Excellence)  → Centro de Excelencia + métricas avanzadas
     ↓
v2.0 (Ecosystem)   → BMAD + comunidad + certificación
```
