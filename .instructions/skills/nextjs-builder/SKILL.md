---
name: nextjs-builder
description: "Construir y mantener la infraestructura técnica del proyecto Problem-Driven AI en Next.js 15. Usar para toda tarea de desarrollo: crear componentes, configurar rutas, escribir APIs, crear migraciones SQL, configurar integraciones, y resolver problemas técnicos. Se activa con: componente, ruta, API, migración, Supabase, deploy, build, error, bug técnico."
---

# Next.js Builder — Problem-Driven AI

## Antes de desarrollar

1. Lee `rules/RULES-architecture.md` — stack, convenciones, esquema SQL, estructura
2. Lee `rules/RULES-project.md` — para saber qué producto y fase estás construyendo

## Patrones por producto

### P1: Sitio web bilingüe
- **Rutas**: `app/[locale]/[section]/[...slug]/page.tsx`
- **Contenido**: Leer MDX de `content/[locale]/[section]/`
- **i18n**: next-intl middleware en `middleware.ts`
- **Componentes MDX**: Registrar en `lib/mdx-components.tsx`
- **Mermaid**: Componente client-side `components/content/MermaidDiagram.tsx`

### P2: CMS editorial
- **Rutas**: `app/admin/content/`
- **Editor**: Textarea con markdown preview
- **Imágenes**: Upload a Supabase Storage bucket `images`
- **Borradores**: Campo `status` en tabla content (draft/published)

### P3: Lead capture + ebook
- **Formulario**: Server Action en `app/[locale]/programs/ebook/page.tsx`
- **Validación**: Zod schema para email + nombre
- **Email**: Resend API en `lib/resend/send-ebook.ts`
- **Tracking**: Insertar en `ebook_downloads` + `contacts`

### P4: Workshops
- **CRUD admin**: `app/admin/workshops/`
- **Público**: `app/[locale]/programs/workshops/page.tsx` (listado)
- **Detalle**: `app/[locale]/programs/workshops/[slug]/page.tsx`
- **Inscripción**: Server Action → `workshop_registrations` + `contacts`
- **Galería**: Supabase Storage bucket `images/workshops/[slug]/`

### P5: Empresas
- **CRUD admin**: `app/admin/companies/`
- **Público**: `app/[locale]/programs/clients/page.tsx` (logos + testimonios)
- **RLS**: Solo testimonios con `is_public = true` visibles

### P6: Eventos
- **CRUD admin**: `app/admin/events/`
- **Público**: `app/[locale]/programs/events/page.tsx`
- **Archivo**: Filtrar por `status = 'pasado'`

### P7: CRM
- **Rutas**: `app/admin/crm/`
- **Fuentes**: Cada formulario inserta en `contacts` con `source`
- **Segmentación**: Filtros por tags, source, fecha
- **Email**: Seleccionar segmento → componer → enviar via Resend

### P8: Ilustraciones IA
- **Rutas**: `app/admin/illustrations/`
- **Generación**: `lib/replicate/generate-illustration.ts`
- **Prompt**: Base prompt de `site_settings` + input del usuario
- **Almacenamiento**: Supabase Storage bucket `illustrations`

### P9: Dashboard
- **Ruta**: `app/admin/page.tsx`
- **Widgets**: Contadores de contacts, workshops, events, downloads
- **Accesos directos**: Links a cada módulo admin
- **Actividad reciente**: Últimas inscripciones, descargas, contactos

### P10: Analytics
- **Umami**: Script en `app/layout.tsx`
- **Custom**: `app/admin/analytics/page.tsx` con datos de Umami API

## Supabase: comandos de referencia

```bash
# Crear nueva migración
supabase migration new nombre_descriptivo

# Aplicar migraciones
supabase db push

# Generar tipos TypeScript
supabase gen types typescript --local > lib/supabase/database.types.ts

# Reset de base de datos
supabase db reset
```

## Componentes a migrar desde Docusaurus

| Original | Nuevo | Ubicación |
|----------|-------|-----------|
| `PhaseCardList` | `PhaseCardList.tsx` | `components/content/` |
| `SaturationChart` | `SaturationChart.tsx` (recharts) | `components/content/` |
| `RadarChart` | `RadarChart.tsx` (recharts) | `components/content/` |
| `StepAccordion` | `StepAccordion.tsx` (Tailwind) | `components/content/` |
| `section-hero` divs | `SectionHero.tsx` | `components/content/` |
| Mermaid code blocks | `MermaidDiagram.tsx` (client) | `components/content/` |
| `:::tip/danger/warning` | `Admonition.tsx` | `components/content/` |
| `GlossaryTooltip` | `GlossaryTooltip.tsx` (Portal) | `components/content/` |
