# Roadmap: Problem-Driven AI — De Beta 0.1 a 1.0 (y más allá)

## Context

Problem-Driven AI es una metodología completa para construir productos de IA centrados en el problema. El sitio actual tiene ~97 páginas bilingües (EN/ES) con dos capas: metodología (conceptual) y framework (operativa), 10 principios, 5 fases, FAQ y glosario.

El objetivo es tratar la metodología como un **producto versionado** que evoluciona desde Beta 0.1 (estado actual) hasta una versión 1.0 estable, con releases incrementales que incluyen fixes, nuevas funcionalidades y mejoras. La visión a largo plazo incluye un Centro de Excelencia, módulo BMAD, comunidad y certificación.

**Prioridades para 1.0:** Profundidad de contenido (sin huecos teóricos) + Herramientas prácticas (que alguien pueda USAR la metodología).

---

## Modelo de Versionado

Semver con milestones temáticos: `MAJOR.MINOR.PATCH`
- **PATCH (0.1.x):** Fixes, correcciones, ajustes menores
- **MINOR (0.x.0):** Nuevas funcionalidades, secciones, herramientas
- **MAJOR:** 1.0 = salida de beta, 2.0 = ecosistema

---

## Beta 0.1 — *Foundation* (Estado actual)

Lo que existe hoy. Marca el punto de partida del versionado.

**Entregable:** Publicación del sitio con badge de versión "Beta 0.1" + página de changelog.

### Tareas:
- [ ] Crear componente/badge de versión visible en el sitio (footer o header)
- [ ] Crear página de changelog en Resources (`/resources/changelog`)
- [ ] Primera entrada del changelog documentando el estado actual

---

## Beta 0.2 — *Content Complete*

**Objetivo:** Cerrar todos los huecos de contenido. Que las 5 fases tengan profundidad uniforme y no existan gaps teóricos.

### Capa Metodología — Contenido nuevo:

| Fase | Página | Descripción |
|---|---|---|
| Fase 2 | `05-the-alignment-trap.mdx` | **"The Alignment Trap"** — El riesgo característico de la Fase 2: confundir alineamiento aparente con consenso real, validación por autoridad vs. evidencia, asunciones clasificadas como hechos |
| Fase 3 | `XX-what-it-is-and-isnt.mdx` | **"What it is and isn't"** — La única fase sin esta página estándar. Completar el patrón uniforme |

### Capa Framework — Correcciones:

| Fase | Acción | Detalle |
|---|---|---|
| Fase 2 | Renumerar archivos framework | Alinear `05-step-by-step` → `07-step-by-step`, `07-artifacts` → `09-artifacts`, etc. para consistencia con el patrón `07-12` de las otras 4 fases |
| Fase 3/5 | Crear anatomía KPI & OKR Register | Documentar este artefacto referenciado pero sin anatomía propia |

### Capa Principios:

| Acción | Detalle |
|---|---|
| Mapa de relaciones de principios | Crear una visualización (componente React o diagrama) que muestre cómo los 10 principios se interrelacionan como sistema, no como lista |

### Bilingüe:
- Todas las páginas nuevas se crean en EN + ES simultáneamente
- Redirects actualizados para cada nueva página (3 niveles: dir, index, slug)

### Verificación:
- `npm run build` sin errores
- Redirect HTMLs verificados para cada nueva página
- Todas las fases tienen ≥6 sub-páginas en metodología
- Framework Phase 2 usa numeración `07-12`

---

## Beta 0.3 — *Toolkit*

**Objetivo:** Que alguien pueda USAR la metodología con plantillas descargables. Transformar la documentación de artefactos en herramientas prácticas.

### Infraestructura:
- [ ] Crear sección "Toolkit" o "Templates" en Resources (`/resources/toolkit`)
- [ ] Componente de descarga de plantillas (botón de descarga por artefacto)
- [ ] Definir formatos por tipo de artefacto:
  - **Documentos narrativos** (Problem Statement, Solution Brief, PRD, Iteration Brief): Markdown + Google Docs
  - **Registros tabulares** (Assumptions Register, Decision Matrix, Signal Log, Decision Log): Google Sheets
  - **Definiciones estructuradas** (Agent Definitions, Story Files, ADRs, project-context.md): Markdown
  - **Actas/minutos** (Integration Minutes, Build Validation Report): Google Docs
  - **Visuales** (Actor Map, Synthesis Board, Solution Trees): Guía de estructura + template Miro/FigJam (enlace)

### Tier 1 — Templates con estructura ya implícita (prioridad):

| # | Artefacto | Fase | Formato |
|---|---|---|---|
| 1 | Problem Statement | 1 | Markdown + Google Doc |
| 2 | project-context.md | 3 | Markdown |
| 3 | Agent Definition | 3 | Markdown |
| 4 | Story File / Skill | 3 | Markdown |
| 5 | ADR (Architecture Decision Record) | 3 | Markdown |
| 6 | Signal Log | 5 | Google Sheet |
| 7 | Context Update Record | 5 | Google Sheet |
| 8 | Iteration Brief | 5 | Markdown + Google Doc |

### Tier 2 — Templates que requieren ensamblaje:

| # | Artefacto | Fase | Formato |
|---|---|---|---|
| 9 | Solution Brief | 2 | Markdown + Google Doc |
| 10 | PRD | 3 | Markdown + Google Doc |
| 11 | Interview Guide | 1 | Google Doc |
| 12 | Assumptions Register | 2 | Google Sheet |
| 13 | Decision Matrix | 2 | Google Sheet |
| 14 | Distributed Decision Log | 4 | Google Sheet |
| 15 | Build Validation Report | 4 | Google Doc |
| 16 | Integration Synchronization Minutes | 4 | Google Doc |

### Tier 3 — Guías de estructura para artefactos visuales:

| # | Artefacto | Fase | Formato |
|---|---|---|---|
| 17 | Actor Map | 1 | Guía de zonas + template board |
| 18 | Synthesis Board | 1 | Guía de zonas + template board |
| 19 | Solution Trees | 2 | Guía de 4 dimensiones |
| 20 | KPI Dashboard | 5 | Checklist de requisitos |

### Verificación:
- Cada template descargable enlazado desde su página de artefactos correspondiente
- Templates probados (abiertos, editables, estructura correcta)
- Sección Toolkit navegable y completa

---

## Beta 0.4 — *Experience*

**Objetivo:** Que alguien nuevo pueda entrar al sitio y aplicar la metodología de punta a punta. Experiencia de onboarding completa.

### Quick Start — Tutorial guiado:

- [ ] Crear sección "Getting Started" o "Quick Start" (`/getting-started` o dentro de Overview)
- [ ] Tutorial paso a paso: "Aplica Problem-Driven AI a tu primer proyecto"
  - Paso 1: Entiende el problema (resumen Fase 1 + template Problem Statement)
  - Paso 2: Diseña la solución (resumen Fase 2 + template Solution Brief)
  - Paso 3: Construye el contexto (resumen Fase 3 + templates key)
  - Paso 4: Construye con IA (resumen Fase 4)
  - Paso 5: Valida con el mercado (resumen Fase 5)
  - Cada paso enlaza a las páginas detalladas y a los templates relevantes

### Caso de estudio end-to-end:

- [ ] Crear sección "Case Studies" en Resources o como sección propia
- [ ] Caso real anonimizado que atraviese las 5 fases:
  - Contexto del proyecto y problema original
  - Cómo se aplicó cada fase
  - Artefactos producidos (ejemplos reales adaptados)
  - Resultados y aprendizajes
  - Qué habría pasado sin la metodología (contrafactual)
- [ ] Considerar expandir el ejemplo del inventario retail que ya aparece en Fase 1 como base

### Verificación:
- Un usuario nuevo puede seguir el Quick Start de principio a fin
- El caso de estudio referencia artefactos reales y es coherente con la metodología
- Los enlaces del tutorial apuntan correctamente a las páginas y templates

---

## Beta 0.5 — *Polish*

**Objetivo:** El sitio es profesional, pulido y navegable. UX de calidad de un producto serio.

### UX y navegación:
- [ ] Revisar home page (actualmente 14 líneas) — valorar si necesita más contenido o es intencional
- [ ] Asegurar que el flujo Overview → Principios → Fases → Framework → Resources es intuitivo
- [ ] Mejorar cross-linking entre las capas metodología y framework
- [ ] Revisar consistencia de componentes visuales (acordeones, cards, heros)

### Mapa de principios:
- [ ] Componente interactivo o diagrama que muestre las relaciones entre los 10 principios
- [ ] Integrar en la página index de Principios

### Changelog y versionado:
- [ ] Poblar el changelog con todas las versiones anteriores (0.1 → 0.5)
- [ ] Semver badge actualizado

### SEO y metadata:
- [ ] Revisar meta descriptions de todas las páginas
- [ ] Open Graph tags para compartir en redes
- [ ] Sitemap optimizado

### Verificación:
- Navegación fluida en todas las rutas
- Lighthouse score ≥ 90 en todas las categorías
- Locale switcher funcional en todas las páginas
- Changelog completo y actualizado

---

## RC 1.0 — *Release Candidate*

**Objetivo:** Validación externa antes del lanzamiento. Todo el contenido y las herramientas están completas; se busca feedback de beta testers.

### Acciones:
- [ ] Revisión completa de contenido (coherencia, errores, gaps residuales)
- [ ] Revisión de todos los templates (usabilidad, completitud)
- [ ] Reclutar 3-5 beta testers (personas reales que apliquen la metodología)
- [ ] Recoger feedback estructurado
- [ ] Fixes basados en el feedback
- [ ] Freeze de contenido para 1.0

### Criterios de salida:
- 0 bugs conocidos en navegación/redirects
- Al menos 1 beta tester ha completado el Quick Start con éxito
- Feedback integrado o documentado como backlog para 1.x

---

## 1.0 — *Stable*

**Objetivo:** Lanzamiento público oficial. La metodología está completa, usable y validada.

### Entregable:
- Badge "1.0" visible en el sitio
- Anuncio de lanzamiento
- Changelog entry celebratoria
- Contenido completo: 5 fases con profundidad uniforme + 10 principios + framework operativo
- Herramientas: ~20 templates descargables
- Experiencia: Quick Start + caso de estudio real
- UX: sitio profesional y navegable

---

## Post-1.0 — Visión de futuro

### 1.x — *Operations* (Centro de Excelencia)

| Componente | Descripción |
|---|---|
| Modelo operativo | Roles, estructura de equipo, responsabilidades |
| Procesos | Flujos de trabajo formalizados entre fases |
| Ceremonias | Rituales de equipo (kickoffs, reviews, retrospectivas) |
| Datos y métricas | Qué se mide, cómo se recoge, KPIs por fase |
| Análisis y mejora | Cómo los datos alimentan la depuración de procesos |
| Centro de Excelencia | Estructura organizacional que sostiene todo |
| Herramientas/dashboards | Tooling para datos y toma de decisiones |

### 2.0 — *Ecosystem*

| Componente | Descripción |
|---|---|
| Módulo BMAD | Extensión/módulo de BMAD adaptado a Problem-Driven AI (no fork, extensión) |
| Comunidad | Discord/GitHub Discussions, contribuciones externas |
| Casos de estudio múltiples | Biblioteca de casos reales de diferentes industrias |
| Certificación | Formación y certificación en la metodología |

---

## Resumen visual del roadmap

```
Beta 0.1 (Foundation)     → Publicar + changelog + badge versión
     ↓
Beta 0.2 (Content)        → Cerrar gaps de contenido (Fase 2, 3, KPI Register, principios)
     ↓
Beta 0.3 (Toolkit)        → 20 templates descargables en formatos apropiados
     ↓
Beta 0.4 (Experience)     → Quick Start tutorial + caso de estudio real
     ↓
Beta 0.5 (Polish)         → UX, SEO, mapa principios, home page
     ↓
RC 1.0 (Candidate)        → Beta testers + feedback + fixes
     ↓
1.0 (Stable)              → Lanzamiento público
     ↓
1.x (Operations)          → Centro de Excelencia + modelo operativo
     ↓
2.0 (Ecosystem)           → BMAD module + comunidad + certificación
```
