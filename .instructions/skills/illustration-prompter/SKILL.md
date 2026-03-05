---
name: illustration-prompter
description: "Generar prompts para ilustraciones editoriales consistentes con el estilo visual de Problem-Driven AI, y escribir captions con la metáfora cartográfica. Usar cuando se necesite crear una ilustración para una sección, una landing page, o cualquier pieza visual del sitio. Se activa con: ilustración, prompt, imagen, caption, visual, metáfora cartográfica."
---

# Illustration Prompter — Problem-Driven AI

## Antes de generar

1. Lee `rules/RULES-brand.md` — estilo visual, correspondencia sección-metáfora, paleta
2. Identifica qué sección es (Vision, Methodology, Planning, Operational)
3. Consulta la tabla de correspondencia metáfora-ilustración

## Prompt base provisional

El siguiente prompt base define el estilo visual consistente para todas las ilustraciones:

```
Editorial illustration in a clean, sophisticated cartographic style.
Muted color palette: blue-gray, warm ochre, soft coral.
Subtle cartographic elements (contour lines, route markers, compass elements).
No text in the image. No people. No screens.
Professional editorial quality. Flat perspective with layered depth.
Clean negative space. Suitable for a methodology website.
```

Añadir al prompt base la descripción específica de la escena según la sección.

## Correspondencia sección → escena

| Sección | Escena | Elementos clave |
|---------|--------|-----------------|
| Vision | Vista aérea/satelital de un territorio extenso | Horizonte amplio, formaciones geográficas, perspectiva panorámica |
| Methodology | Mapa desplegado con rutas y leyenda | Caminos trazados, puntos de referencia, brújula, escala |
| Planning | Mesa de planificación con guía de ruta y equipamiento | Instrumentos de medición, brújula, cuaderno de ruta |
| Operational | Estación de trabajo con instrumentos y bitácora | Instrumentos precisos, registros, marcadores, bitácora abierta |

## Reglas de caption

Cada ilustración lleva un caption que sigue estas reglas:

- **Longitud**: 10-20 palabras
- **Estilo**: Cursiva
- **Tono**: Poético pero preciso
- **Metáfora**: Siempre referencia la metáfora cartográfica de su sección
- **Nunca** repite el título de la página
- **Nunca** explica la imagen literalmente
- **Siempre** contiene un giro conceptual o paradoja sutil

## Ejemplos de captions

- *"La vista satelital no muestra los caminos. Muestra por dónde merece la pena abrirlos."*
- *"Un mapa que solo confirma lo que ya sabes no es un mapa. Es un espejo."*
- *"El mejor equipamiento no acelera el viaje. Te permite elegir cuándo detenerte."*
- *"La bitácora no registra el destino. Registra las decisiones que te trajeron hasta aquí."*

## Output

Cuando generes una ilustración, entrega:

1. **Prompt completo**: prompt base + descripción de escena específica
2. **Caption ES**: En español, siguiendo las reglas
3. **Caption EN**: Traducción al inglés manteniendo el tono
4. **Sección**: A qué sección pertenece
5. **Contexto**: Para qué página o landing se usará
