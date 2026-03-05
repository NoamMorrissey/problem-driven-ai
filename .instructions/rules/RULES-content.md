# RULES-content.md — Reglas editoriales completas

> Este archivo es la referencia editorial del proyecto. Todo agente que escriba
> o revise contenido debe leerlo antes de cada operación.
> Fusiona las reglas estratégicas del proyecto con la profundidad del content-curator.

---

## Idioma

El sitio es bilingüe (ES/EN). Todo contenido existe en ambos idiomas.
Las traducciones mantienen el mismo tono y estructura, no son adaptaciones libres.

---

## Terminología sagrada

Ver `rules/sacred-terms.md` para la lista canónica. Reglas:

- NUNCA traducir los términos sagrados, ni siquiera en documentos en español
- Siempre Title Case como aparecen en sacred-terms.md
- Nunca cursiva, nunca entre comillas: son terminología naturalizada
- En texto español, los artículos concuerdan con el género gramatical:
  el Problem Statement, la Solution Brief, los Story Files, los Skills

**Severidad**: Alta — auto-corregir inmediatamente.

---

## Estructura de cada página: Three-Move Pattern

Toda página de contenido sigue esta macroestructura:

**Move 1 — Stakes**: Abre con lo que está en juego. No con definiciones.
El lector necesita saber por qué esto le importa antes de saber qué es.

**Move 2 — Contenido principal**: La definición, el proceso, la herramienta.
Aquí va el cuerpo del conocimiento.

**Move 3 — Reencuadre**: Cierra conectando con un principio de la metodología.
Deja al lector con una perspectiva nueva. Nunca un resumen.

| Violación | Severidad |
|---|---|
| La página no tiene Move 1 (empieza con definiciones) | Media |
| La página no tiene Move 3 (termina sin principio/reencuadre) | Media |
| Move 3 es un resumen en lugar de un reencuadre | Media |

---

## Estilo de escritura

### 1. Estructura de frases

| Regla | Umbral | Ejemplo bueno | Ejemplo malo |
|---|---|---|---|
| Longitud de frase | 15-24 palabras de media por página | "La Fase 4 existe para que la velocidad de construcción de la IA se convierta en un activo, no en un riesgo." (22 palabras) | Frases consistentemente >30 palabras con múltiples subordinadas anidadas. |
| Patrón de ritmo | Variar corta-media-larga. Nunca 3+ largas seguidas. | Corta → media → larga → corta punch. | Cuatro frases consecutivas de 28 palabras. |
| Preguntas retóricas | Como pivotes de sección, a menudo en negrita. Máx 2-3 por página. | **"¿y ahora qué?"** — abre un giro conceptual. | 6 preguntas retóricas en una página diluyen su impacto. |
| Fragmentos | Evitar. Usar frases completas. | "La respuesta es la Fase 4." | "Fase 4. Eso." |

### 2. Estructura de párrafos

| Regla | Umbral |
|---|---|
| Longitud de párrafo | 2-8 líneas. Nunca superar 10 sin un corte (tabla, lista, admonition). |
| Técnica de apertura | Stakes, riesgo, narrativa ("Hay un momento..."), contraste, o definición directa. Nunca meta-comentario ("En esta sección vamos a..."). |
| Técnica de cierre | Siempre basada en un principio. Reencuadra la comprensión, nunca resume. |

### 3. Uso de negritas

| Regla | Umbral |
|---|---|
| Qué poner en negrita | Paradojas, giros conceptuales, definiciones de rol, acciones clave, advertencias críticas. |
| Posición | Inline dentro de frases críticas. Nunca párrafos enteros. |
| Frecuencia | 4-10 negritas por página. |
| Regla de oro | La negrita marca lo que el lector debe recordar si solo escanea la página. |

### 4. Calibración de tono

| Contexto | Tono | Señales |
|---|---|---|
| Tablas, roles, matrices, lógica condicional | Sobrio/técnico | Vocabulario preciso, sin recursos retóricos. |
| Aperturas, resolución de paradojas, cierres | Motivador/inspiracional | Framing narrativo, esperanza contraintuitiva. |
| Riesgos y anti-patrones | Gestionable, nunca catastrofista | "Señales", "trampas", "drift": siempre prevenibles. |
| Escenarios "Imagina que..." | Cautelar o diagnóstico | Testea comprensión o revela problemas. Nunca aspiracional. |

### 5. Em dashes (solo español)

- Evitar em dashes (" — ") en texto corrido en español
- Reemplazar con comas o paréntesis
- Excepciones: títulos de admonitions, atribuciones de citas
- En inglés, los em dashes son aceptables

**Bueno (ES):** `Las Reglas no restringen la creatividad de los Agentes, la canalizan.`
**Malo (ES):** `Las Reglas no restringen la creatividad de los Agentes — la canalizan.`

### 6. Sin referencias temporales: esfuerzo sobre duración

- Nunca referenciar tiempo calendario (semanas, días, meses, porcentajes de tiempo)
- Usar framing de esfuerzo: actividades, intensidad, dedicación
- sidebar_label de páginas de esfuerzo: "Esfuerzo" (ES) / "Effort" (EN)

**Malo:** `El Problem Phase debería ocupar entre 2 y 3 semanas.`
**Bueno:** `El esfuerzo del Problem Phase incluye al menos 5 entrevistas de calidad, una síntesis rigurosa y dos niveles de validación.`

**Severidad (Sección Estilo)**: Media — reportar sin auto-corregir (requiere juicio humano).

---

## Estructura de páginas

### Uso de admonitions

| Tipo | Contenido | Estructura |
|---|---|---|
| `:::tip` | Principios, tests diagnósticos, guía experta | Formato libre. 2-4 frases. |
| `:::danger` | Anti-patrones. Siempre 3 partes. | Qué es / Cómo detectarlo / Cómo prevenirlo |
| `:::warning` | Ejemplos cautelares. Qué pasa si haces X. | Basado en escenario. |

| Violación | Severidad |
|---|---|
| Anti-patrón en `:::tip` en vez de `:::danger` | Alta — auto-corregir tipo |
| `:::danger` sin estructura de 3 partes | Media — reportar |

### Uso de tablas

- Las tablas son **herramientas de decisión**, nunca decorativas
- Mínimo 3 columnas. Patrones comunes: Tipo/Condición/Ejemplo, Rol/Qué hace/Qué decide
- Si un párrafo tiene 3+ ítems paralelos comparados → debería ser tabla

### Líneas horizontales y blockquotes

- `---`: Solo entre secciones mayores de anti-patrones. No entre H2 regulares.
- `>` blockquotes: Reservados para declaraciones filosóficas/capstone. Máx 1 por página, al final.

---

## Metáfora cartográfica

La metáfora cartográfica es el hilo visual del proyecto. Reglas estrictas:

- **NUNCA** usar metáforas cartográficas en el cuerpo del texto de las páginas
- **SÍ** usarlas en las descripciones de ilustraciones y sus captions
- **SÍ** usarlas en landing pages (solo en la sección de ilustración)

Correspondencia por sección:

| Sección | Metáfora visual | Estilo de caption |
|---------|----------------|-------------------|
| Vision | Imagen satelital del territorio | Panorámica, contemplativa |
| Methodology | Mapa del sistema con rutas | Estructural, orientadora |
| Planning | Guía de ruta, equipamiento | Preparatoria, pragmática |
| Operational | Instrumentos + bitácora | Precisa, instrumental |

---

## Consistencia cross-file

### Paridad EN↔ES

Para cada par de archivos (EN + ES), verificar:

| Check | Severidad |
|---|---|
| Mismo número de H2 headings | Alta |
| Mismo número de tablas | Alta |
| Mismos tipos de admonition en mismo orden | Alta |
| Terminología sagrada idéntica (no traducida) en ambas versiones | Alta |
| Tags de frontmatter presentes en ambas versiones | Media |

### Vocabulario preferido (guía blanda)

**Verbos preferidos (ES):** proteger, materializar, trazar, escalar, detectar, supervisar, iterar, validar, gobernar

**Adjetivos preferidos (ES):** distribuido/a, fiel, incoherente, implícito/a, operativo/a, trazable

**Sustantivos preferidos (ES):** fidelidad, brecha, riesgo, señal, umbral, ciclo, régimen

**Preferred verbs (EN):** protect, materialize, trace, escalate, detect, supervise, iterate, validate, govern

### Consistencia de vocabulario cross-fase

El mismo concepto usa el mismo término en todas partes. Flaggear si:
- "Context Document" aparece como "documento de contexto" en un archivo y "Context Document" en otro
- Un nombre de rol cambia (ej: "Product Lead" vs "Product Owner" para el mismo rol)
- Un nombre de artefacto varía (ej: "Signal Log" vs "log de señales")

**Severidad**: Alta para drift terminológico. Baja para sugerencias de vocabulario.

---

## Glossary y tooltips

### Schema de términos

Cada término en `glossary.json` debe tener:
- `term_en`, `term_es` (idénticos si canonical)
- `category`: Global | Methodology | Framework | Anti-pattern | AI Technical
- `phase`: Array de fases relevantes
- `definition_en/es`: Máx 50 palabras
- `context_en/es`: Cómo se aplica en esta metodología. Máx 80 palabras.
- `related_terms`: Array de term_en de otras entradas
- `canonical`: true = sagrado (nunca traducir), false = bilingüe
- `acronym_full`: Expansión del acrónimo o null

### Elegibilidad para tooltips

Solo categorías **Methodology**, **Framework** y **Anti-pattern** generan tooltips.
Las categorías **Global** y **AI Technical** NO.

### Comportamiento de tooltips

- Solo la primera aparición por página
- Nunca dentro de headings, links, code blocks o componentes de navegación
- El tooltip muestra definition_en/es según locale + link al glosario

---

## Estructura de landing pages

### Landing de sección (Vision, Methodology, Planning, Operational)

```
1. Título: Nombre de la sección
2. Subtítulo: Una frase que explica el valor de la sección
3. [Ilustración + caption con metáfora cartográfica]
4. Párrafo de contexto: Qué es Problem-Driven AI (para quien llega sin contexto)
5. Cuerpo: Qué encontrará el lector y por qué importa (patrón Three-Move)
6. Navegación al contenido: Bloques organizados con descripción breve
```

### Reglas críticas para landings

- Todo el contenido del sitio es público. No hay registro ni contenido oculto.
- Cada landing funciona de forma independiente (el lector puede no haber visto nada más)
- NO contener metáforas cartográficas en el cuerpo del texto
- SÍ contener la metáfora en la descripción de la ilustración y su caption
- Cerrar con la navegación al contenido interno organizado en bloques
- El sitio es bilingüe (ES/EN). Los textos deben existir en ambos idiomas.

---

## Ejemplos con IA aplicada

- Los ejemplos DEBEN usar escenarios de IA aplicada, no software genérico
- **Bueno**: "Cuando un equipo pide a un LLM que genere una API sin definir primero el problema, el output parece profesional pero resuelve la necesidad equivocada"
- **Malo**: "Cuando un equipo empieza a programar sin requisitos, pierde tiempo"

**Severidad**: WARN — solicitar ejemplo específico de IA.

---

## Checklist de calidad

Antes de entregar cualquier texto, verificar:

- [ ] Frases entre 15-24 palabras de media (ninguna supera 35)
- [ ] Párrafos de 2-8 líneas (nunca párrafos de una línea)
- [ ] Negritas solo para paradojas/giros conceptuales (4-10 por página)
- [ ] CERO em dashes (" — ") en el texto en español
- [ ] Terminología sagrada en su forma exacta
- [ ] Sin metáforas cartográficas en el cuerpo del texto
- [ ] Sin referencias temporales, usar framing de esfuerzo
- [ ] Sin emojis
- [ ] Sin lenguaje motivacional vacío
- [ ] Autoexplicativo para alguien que llega por primera vez
- [ ] Patrón Three-Move aplicado (Move 1, 2, 3)
- [ ] Admonitions con tipo correcto (:::danger para anti-patrones)
- [ ] Paridad EN↔ES verificada
