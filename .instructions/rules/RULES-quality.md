# RULES-quality.md — Reglas de validación y calidad

> Este archivo define las reglas de validación bloqueantes y no bloqueantes
> para todo el contenido del proyecto. Adaptado del sistema de core-rules
> y phase-content-rules original, eliminando todo lo específico de Docusaurus.

---

## Non-Negotiable Rules

Estas reglas son BLOQUEANTES. El contenido que las viola debe ser rechazado
con un mensaje claro solicitando la información faltante.

---

### Rule 1: Exit Criteria Required

- **Aplica a**: Toda página de Fase (`methodology/phases/`, `planning/`)
- **Requisito**: Debe contener una sección `## Exit Criteria` (EN) / `## Criterio de Salida` (ES)
- **Formato**: Lista de condiciones medibles que deben cumplirse antes de avanzar
- **Violación**: BLOCK publicación.

---

### Rule 2: One Anti-pattern Per Phase

- **Aplica a**: Toda página de Fase
- **Requisito**: Exactamente UN anti-patrón por fase
- **Formato**: Admonition `:::danger Anti-pattern: [Name]` (EN) / `:::danger Anti-patrón: [Name]` (ES)
- **Contenido**: Nombre + descripción del anti-patrón
- **Violación**: BLOCK publicación.

---

### Rule 3: Bidirectionality

- **Aplica a**: Todos los artefactos y fases
- **Requisito**: Los artefactos deben enlazar a su fase Y las fases deben enlazar a sus artefactos
- **Verificación**: Paso de cross-reference del content-agent
- **Violación**: WARN y auto-sugerir links faltantes.

---

### Rule 4: Sacred Terminology

- **Aplica a**: Todo el contenido en ambos idiomas
- **Términos protegidos**: Ver `rules/sacred-terms.md` para la lista canónica
- **Casing**: Siempre Title Case como se define en sacred-terms.md
- **Violación**: Auto-corregir. Registrar en changelog.

---

### Rule 5: No Artifact = No Process

- **Aplica a**: Cada paso de proceso en Planning
- **Requisito**: Cada paso debe generar un entregable documentado
- **Formato**: Card de artefacto con nombre, descripción y link a fase
- **Violación**: BLOCK.

---

### Rule 6: Complete Programs Section

- **Aplica a**: Toda página en Programs
- **Requisito**: Debe contener las secciones obligatorias según tipo:
  - **Workshop**: Descripción, formato, audiencia, temario, precio, inscripción
  - **E-book**: Descripción, contenido, formulario de descarga
  - **Servicio empresa**: Segmento, propuesta de valor, formato, métricas
- **Violación**: BLOCK publicación. Listar secciones faltantes.

---

### Rule 7: Frontmatter Completeness

- **Aplica a**: Todo archivo `.mdx`
- **Campos obligatorios**: `title`, `description`, `slug`, `tags`
- **Paridad**: `slug` debe ser consistente entre EN y ES
- **Tags**: Localizados por idioma (EN: `principle`, ES: `principio`)
- **Description**: Máximo 160 caracteres (SEO)
- **Violación**: WARN si falta campo. Auto-fix si es posible.

---

### Rule 8: Principle Structure

- **Aplica a**: Toda página de Principio (`methodology/principles/`)
- **Secciones obligatorias**:
  1. Blockquote (declaración core)
  2. `## Statement` / `## Enunciado`
  3. `## Why it matters` / `## Por qué importa`
  4. `## Practical implications` / `## Implicaciones prácticas`
  5. `:::danger Anti-pattern` / `:::danger Anti-patrón`
  6. `## Connections` / `## Conexiones`
- **Violación**: BLOCK. Listar secciones faltantes.

---

## Phase Content Rules

Estas reglas aplican a TODO el contenido de fases (Methodology + Planning).

---

### Rule 20: AI-Applied Examples

- **Aplica a**: Todas las páginas de fases y planning
- **Requisito**: Los ejemplos DEBEN usar escenarios de IA aplicada, no software genérico
- **Violación**: WARN. Solicitar ejemplo específico de IA.

---

### Rule 21: Audience Accessibility

- **Aplica a**: Todas las páginas de Planning
- **Requisito**: Los conceptos técnicos DEBEN explicarse para audiencia mixta (diseñadores, developers, negocio, estrategia). Sin jargon sin explicación inline.
- **Violación**: WARN. Solicitar clarificación.

---

### Rule 22: Methodology Page Structure

- **Aplica a**: Páginas de fase en Methodology (`methodology/phases/`)
- **Páginas estándar** (deben existir para cada fase):
  1. Overview (index)
  2. "Why this phase exists"
  3. "Who participates and when"
  4. "Connection to Phase N+1"
- **Páginas específicas**: Determinadas por contenido. Mínimo 2, sin máximo.
- **Violación**: WARN si faltan páginas estándar.

---

### Rule 23: Planning Page Structure

- **Aplica a**: Páginas de fase en Planning (`planning/`)
- **Páginas obligatorias** (estructura idéntica para cada fase):
  1. Step by Step
  2. Roles
  3. Effort
  4. Anti-patterns
  5. Artifacts
  6. Gate Review
- **Violación**: BLOCK si falta alguna de las 6 páginas.

---

### Rule 24: Content Length Guidelines

- **Methodology pages**: 80-150 líneas
- **Planning pages**: 100-250 líneas
- **Index pages**: 30-60 líneas
- **Violación**: WARN si fuera de rango.

---

### Rule 25: Human Review Gate

- **Aplica a**: Todo contenido generado por IA
- **Requisito**: NUNCA se commitea contenido sin aprobación humana explícita
- **Flujo**: Generar → Preview → Presentar → Humano revisa → APROBAR o RECHAZAR
- **Violación**: BLOCK. Nunca auto-commitear contenido generado.

---

### Rule 26: Preview Before Review

- **Aplica a**: Todo contenido generado
- **Requisito**: Antes de presentar para revisión, el sitio DEBE estar construido y servido localmente
- **Proceso**:
  1. `npm run build`
  2. `npm run start` (o preview de Vercel)
  3. Confirmar que las páginas nuevas renderizan correctamente
- **Violación**: WARN. La revisión sin preview visual produce errores de formato.

---

## Validation Matrix

| Content Type | Exit Criteria (R1) | Anti-pattern (R2) | Bidirectional (R3) | Sacred Terms (R4) | Frontmatter (R7) | Principle Struct (R8) |
|---|---|---|---|---|---|---|
| Phase (Methodology) | REQUIRED | REQUIRED | REQUIRED | REQUIRED | REQUIRED | — |
| Principle | — | REQUIRED | REQUIRED | REQUIRED | REQUIRED | REQUIRED |
| Phase (Planning) | — | — | REQUIRED | REQUIRED | REQUIRED | — |
| Operational | — | — | REQUIRED | REQUIRED | REQUIRED | — |
| Resource | — | — | — | REQUIRED | REQUIRED | — |
| Programs | — | — | — | REQUIRED | REQUIRED | — |

| Content Type | AI Examples (R20) | Accessibility (R21) | Page Structure (R22/23) | Length (R24) | Human Review (R25) |
|---|---|---|---|---|---|
| Phase (Methodology) | REQUIRED | — | R22 REQUIRED | WARN | BLOCK |
| Phase (Planning) | REQUIRED | REQUIRED | R23 REQUIRED | WARN | BLOCK |
| Operational | REQUIRED | REQUIRED | — | WARN | BLOCK |
| Programs | — | — | R6 REQUIRED | — | BLOCK |
