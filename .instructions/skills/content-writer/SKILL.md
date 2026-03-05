---
name: content-writer
description: "Escribir y editar contenido de la metodología Problem-Driven AI siguiendo las reglas editoriales del proyecto. Usar siempre que se necesite crear una nueva página .mdx, reescribir contenido existente, revisar el estilo de un texto, o generar contenido para cualquiera de las 6 secciones (Vision, Methodology, Planning, Operational, Resources, Programs). También se activa cuando se mencionan: landing page, contenido de sección, principios, fases, anti-patrones, gate reviews, checklists, o cualquier término sagrado de la metodología."
---

# Content Writer — Problem-Driven AI

## Antes de escribir

1. Lee `rules/RULES-content.md` completo — contiene las reglas editoriales, terminología sagrada, estilo y estructura
2. Lee `rules/RULES-brand.md` — para nombres de secciones y metáfora cartográfica
3. Identifica en qué sección va el contenido (Vision, Methodology, Planning, Operational, Resources, Programs) y adapta la profundidad al público de esa sección

## Estructura de cada página

Aplica el patrón Three-Move:

**Move 1 — Stakes**: Abre con lo que está en juego. No con definiciones. El lector necesita saber por qué esto le importa antes de saber qué es.

**Move 2 — Contenido principal**: La definición, el proceso, la herramienta. Aquí va el cuerpo del conocimiento.

**Move 3 — Reencuadre**: Cierra conectando con un principio de la metodología. Deja al lector con una perspectiva nueva.

## Checklist de calidad

Antes de entregar cualquier texto, verifica:

- [ ] Frases entre 15-24 palabras de media (ninguna supera 35)
- [ ] Párrafos de 2-8 líneas (nunca párrafos de una línea)
- [ ] Negritas solo para paradojas/giros conceptuales (4-10 por página)
- [ ] CERO em dashes (" — ") en el texto
- [ ] Terminología sagrada en su forma exacta (Problem Statement, no "problem statement")
- [ ] Sin metáforas cartográficas en el cuerpo del texto
- [ ] Sin referencias temporales ("en 2 semanas"), usar framing de esfuerzo
- [ ] Sin emojis
- [ ] Sin lenguaje motivacional vacío
- [ ] Autoexplicativo para alguien que llega por primera vez

## Formato MDX

Cuando generes un archivo .mdx:

```yaml
---
title: "Título de la página"
slug: /ruta/en/el-idioma
description: "Descripción para SEO (1-2 frases, máx 160 chars)"
tags: [tag1, tag2]
---
```

Recuerda escapar llaves en texto: `\{valor\}` en lugar de `{valor}`.

## Secciones y su público

| Sección | Público | Profundidad |
|---------|---------|-------------|
| Vision | Cualquiera | Conceptual, inspirador, panorámico |
| Methodology | Interesados en el marco | Principios, fases conceptuales, FAQ |
| Planning | Equipos que planifican | Procesos, roles, esfuerzo, gate reviews |
| Operational | Equipos ejecutando | Técnicas, herramientas, métodos concretos |
| Resources | Referencia | Glosario, roadmap, changelog |
| Programs | Participantes | Workshops, e-book |

El sitio es bilingüe (ES/EN). Cada contenido existe en ambos idiomas.
