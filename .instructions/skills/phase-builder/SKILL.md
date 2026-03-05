---
name: phase-builder
description: "Construir contenido completo de una fase (Methodology + Planning) desde una fuente (PDF, documento, o briefing). Genera contenido bilingüe ES/EN con revisión humana obligatoria. Usar cuando se necesite crear o reconstruir todo el contenido de una fase completa. Se activa con: construir fase, fase completa, contenido de fase."
---

# Phase Builder — Problem-Driven AI

## Trigger

Comando `construir fase [N] [name]` donde:
- `[N]` = número de fase (1-5)
- `[name]` = nombre en inglés (e.g., "Problem Phase", "AI Build Phase")

---

## Referencia: Patrones establecidos

### Methodology Pages (en `content/[locale]/methodology/phases/[phase-name]/`)

Páginas estándar (presentes en cada fase):

| Posición | EN label | ES label | Foco |
|---|---|---|---|
| 1 | "Why this phase" | "Por qué esta fase" | Motivación, consecuencias de saltar |
| 2 | varía | varía | Definición core (what it is/isn't) |
| ... | varía | varía | Páginas específicas de la fase |
| penúltima | "Who and when" | "Quién y cuándo" | Roles, participación |
| última | "Connection to Phase N+1" | "Conexión con Fase N+1" | Puente a siguiente fase |

### Planning Pages (en `content/[locale]/planning/[phase-name]/`)

Estructura fija — mismas 6 páginas para CADA fase:

| Posición | EN label | ES label |
|---|---|---|
| 1 | "Step by Step" | "Paso a Paso" |
| 2 | "Roles" | "Roles" |
| 3 | "Effort" | "Esfuerzo" |
| 4 | "Anti-patterns" | "Anti-patrones" |
| 5 | "Artifacts" | "Artefactos" |
| 6 | "Gate Review" | "Gate Review" |

---

## Step-by-Step

### Fase A: Preparación

#### Paso 1: Extraer contenido de la fuente
- Extraer texto completo del PDF/documento proporcionado
- Almacenar texto extraído para análisis

#### Paso 2: Mapa de contenido
- Identificar secciones y subsecciones
- Clasificar cada sección como:
  - **Conceptual** → candidato para Methodology
  - **Operacional** → candidato para Planning
  - **Ambos** → dividir entre Methodology (por qué/qué) y Planning (cómo)

#### Paso 3: Cross-reference con contenido existente
- Verificar si ya existen páginas de Methodology para esta fase en `content/en/methodology/phases/`
- Verificar si ya existen páginas de Planning en `content/en/planning/`
- Identificar qué está cubierto vs qué falta
- Leer fases anteriores para entender patrones establecidos

### Fase B: Methodology (conceptual)

#### Paso 4: Determinar lista de páginas
- Mapear secciones del PDF a páginas de Methodology
- Siempre incluir páginas estándar: Why, What, Who, Connection
- Presentar lista propuesta al usuario antes de generar

#### Paso 5: Generar contenido ES
- Escribir contenido ES siguiendo RULES-content.md completo
- Tono: Simple, didáctico, profesional
- Ejemplos: Siempre de IA aplicada (Rule 20)
- Estructura: Three-Move Pattern (Move 1, 2, 3)
- Longitud: 80-150 líneas por página
- Terminología sagrada sin traducir
- Frontmatter completo

#### Paso 6: Generar contenido EN
- Traducir cada página ES a EN
- Mantener mismo slug, adaptar tags
- Verificar paridad estructural

### Fase C: Planning (operacional)

#### Paso 7: Generar 6 páginas Planning (ES)

**Step by Step**: Proceso operativo extraído de la fuente. Pasos numerados con inputs → actividades → outputs.

**Roles**: Quién participa, qué puede decidir, qué no puede decidir.

**Effort**: Actividades mínimas, señales de inversión insuficiente/excesiva. NUNCA tiempo calendario.

**Anti-patterns**: Patrones de fallo operacional. Para cada uno: qué es, cómo se manifiesta, cómo detectar, cómo prevenir.

**Artifacts**: Lista de entregables. Para cada uno: nombre, quién lo produce, quién lo consume, cuándo se crea.

**Gate Review**: Criterios de salida. Checklist de validación. Pregunta de transición.

#### Paso 8: Generar 6 páginas Planning (EN)
- Traducir, adaptar tags y frontmatter

### Fase D: Revisión y verificación

#### Paso 9: Preview
- `npm run build && npm run start`
- Confirmar que las páginas nuevas renderizan correctamente en ambos idiomas

#### Paso 10: Revisión humana
- Presentar todo el contenido al usuario
- **Si APROBADO**: Commitear
- **Si RECHAZADO**: Iterar con feedback específico, re-presentar

#### Paso 11: Verificación final
- Build sin errores
- Links bidireccionales verificados
- Frontmatter completo y consistente entre EN/ES

---

## Output Format

```
=== CONSTRUIR FASE [N]: [NAME] ===

Source: [path/description]

--- METHODOLOGY ---
Pages: [list]
Status: [PENDING REVIEW | APPROVED | ITERATING]

--- PLANNING ---
Pages: [list]
Status: [PENDING REVIEW | APPROVED | ITERATING]

--- VERIFICATION ---
Build: [SUCCESS | FAIL]
Links: [ALL PASS | issues]
```

---

## Validation

- Consulta: `rules/RULES-quality.md` (Rules 1-4, 7, 20-26)
- Consulta: `rules/RULES-content.md` (estilo, terminología, Three-Move)
- Invoca: content-agent pipeline de validación
