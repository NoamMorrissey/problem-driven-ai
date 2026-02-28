import React from 'react';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import {useCurrentSidebarSiblings} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './styles.module.css';

interface Text {
  en: string;
  es: string;
}

const ICON_LIGHT = '/img/metodologia-card-fase-ico.png';
const ICON_DARK = '/img/metodologia-card-fase-ico-dark.png';

/* ── Phase 1: Problem Phase ── */
const problemPhase: Record<string, Text> = {
  'why-this-phase-exists': {
    en: 'Problem Phase exists to interrupt the pattern of building without understanding. It\'s the highest-return investment in the entire process.',
    es: 'Problem Phase existe para interrumpir el patrón de construir sin entender. Es la inversión con mayor retorno de todo el proceso.',
  },
  'por-que-esta-fase-existe': {
    en: 'Problem Phase exists to interrupt the pattern of building without understanding. It\'s the highest-return investment in the entire process.',
    es: 'Problem Phase existe para interrumpir el patrón de construir sin entender. Es la inversión con mayor retorno de todo el proceso.',
  },
  'the-solution-trap': {
    en: 'The unstoppable urge to jump to solutions is the number one enemy of good discovery. The antidote is seeking evidence that contradicts your assumptions.',
    es: 'La urgencia irrefrenable de saltar a las soluciones es el enemigo número uno de un buen discovery. El antídoto es buscar evidencia que contradiga tus asunciones.',
  },
  'la-trampa-de-la-solucion': {
    en: 'The unstoppable urge to jump to solutions is the number one enemy of good discovery. The antidote is seeking evidence that contradicts your assumptions.',
    es: 'La urgencia irrefrenable de saltar a las soluciones es el enemigo número uno de un buen discovery. El antídoto es buscar evidencia que contradiga tus asunciones.',
  },
  'what-it-is-and-isnt': {
    en: 'Most failures in this phase don\'t come from doing it poorly, but from confusing it with something else.',
    es: 'La mayoría de los fracasos en esta fase no vienen de hacerla mal, sino de confundirla con otra cosa.',
  },
  'que-es-y-que-no-es': {
    en: 'Most failures in this phase don\'t come from doing it poorly, but from confusing it with something else.',
    es: 'La mayoría de los fracasos en esta fase no vienen de hacerla mal, sino de confundirla con otra cosa.',
  },
  'cognitive-biases': {
    en: 'No team enters discovery with a blank mind. These are the most common biases and the antidotes we apply to counteract them.',
    es: 'Ningún equipo entra al discovery con la mente en blanco. Estos son los sesgos más frecuentes y los antídotos que aplicamos.',
  },
  'sesgos-cognitivos': {
    en: 'No team enters discovery with a blank mind. These are the most common biases and the antidotes we apply to counteract them.',
    es: 'Ningún equipo entra al discovery con la mente en blanco. Estos son los sesgos más frecuentes y los antídotos que aplicamos.',
  },
  'who-participates': {
    en: 'The composition of the discovery team is a design decision that determines the quality of what you\'ll discover. The Actor Map changes everything.',
    es: 'La composición del equipo de discovery es una decisión de diseño que determina la calidad de lo que vas a descubrir. El Mapa de Actores lo cambia todo.',
  },
  'quien-participa': {
    en: 'The composition of the discovery team is a design decision that determines the quality of what you\'ll discover. The Actor Map changes everything.',
    es: 'La composición del equipo de discovery es una decisión de diseño que determina la calidad de lo que vas a descubrir. El Mapa de Actores lo cambia todo.',
  },
  'the-questions': {
    en: 'Six fundamental questions structure the investigation. Each opens a different angle on the problem to compose a complete picture.',
    es: 'Seis preguntas fundamentales estructuran la investigación. Cada una abre un ángulo distinto del problema para componer una imagen completa.',
  },
  'las-preguntas': {
    en: 'Six fundamental questions structure the investigation. Each opens a different angle on the problem to compose a complete picture.',
    es: 'Seis preguntas fundamentales estructuran la investigación. Cada una abre un ángulo distinto del problema para componer una imagen completa.',
  },
  'connection-to-phase-2': {
    en: 'When the Gate Review is complete, the team earns the right to think about solutions. The Problem Statement becomes the foundation for everything that follows.',
    es: 'Cuando el Gate Review se completa, el equipo gana el derecho a pensar en soluciones. El Problem Statement se convierte en la base de todo lo que sigue.',
  },
  'conexion-con-fase-2': {
    en: 'When the Gate Review is complete, the team earns the right to think about solutions. The Problem Statement becomes the foundation for everything that follows.',
    es: 'Cuando el Gate Review se completa, el equipo gana el derecho a pensar en soluciones. El Problem Statement se convierte en la base de todo lo que sigue.',
  },
};

/* ── Phase 2: Solution Phase ── */
const solutionPhase: Record<string, Text> = {
  'why-this-phase-exists': {
    en: 'The distance between a well-defined problem and a well-aligned solution is larger than it seems.',
    es: 'La distancia entre un problema bien definido y una solución bien alineada es más grande de lo que parece.',
  },
  'por-que-esta-fase-existe': {
    en: 'The distance between a well-defined problem and a well-aligned solution is larger than it seems.',
    es: 'La distancia entre un problema bien definido y una solución bien alineada es más grande de lo que parece.',
  },
  'anatomy-of-a-good-solution': {
    en: 'Thinking before deciding. Decomposing the problem into addressable pieces and examining the four dimensions of every AI solution.',
    es: 'Pensar antes de decidir. Descomponer el problema en piezas abordables y examinar las cuatro dimensiones de toda solución IA.',
  },
  'anatomia-de-una-buena-solucion': {
    en: 'Thinking before deciding. Decomposing the problem into addressable pieces and examining the four dimensions of every AI solution.',
    es: 'Pensar antes de decidir. Descomponer el problema en piezas abordables y examinar las cuatro dimensiones de toda solución IA.',
  },
  'what-it-is-and-isnt': {
    en: 'Solution Phase is an iterative alignment process, not a hierarchical approval event.',
    es: 'Solution Phase es un proceso iterativo de alineación, no un evento de aprobación jerárquica.',
  },
  'que-es-y-que-no-es': {
    en: 'Solution Phase is an iterative alignment process, not a hierarchical approval event.',
    es: 'Solution Phase es un proceso iterativo de alineación, no un evento de aprobación jerárquica.',
  },
  'who-participates': {
    en: 'The group composition changes from Phase 1: stakeholders excluded from discovery are needed for alignment.',
    es: 'La composición del grupo cambia respecto a la Fase 1: los stakeholders excluidos del discovery son necesarios para la alineación.',
  },
  'quien-participa': {
    en: 'The group composition changes from Phase 1: stakeholders excluded from discovery are needed for alignment.',
    es: 'La composición del grupo cambia respecto a la Fase 1: los stakeholders excluidos del discovery son necesarios para la alineación.',
  },
  'thinking-about-ai': {
    en: 'The team begins thinking about how AI will process the solution, without writing a single line of context.',
    es: 'El equipo empieza a pensar en cómo la IA procesará la solución, sin escribir una sola línea de contexto.',
  },
  'pensar-en-la-ia': {
    en: 'The team begins thinking about how AI will process the solution, without writing a single line of context.',
    es: 'El equipo empieza a pensar en cómo la IA procesará la solución, sin escribir una sola línea de contexto.',
  },
  'connection-to-phase-3': {
    en: 'How the Solution Brief translates into AI-processable context: the transition from human thinking to Context Phase.',
    es: 'Cómo el Solution Brief se traduce en contexto procesable por la IA: la transición de pensamiento humano a Context Phase.',
  },
  'conexion-con-fase-3': {
    en: 'How the Solution Brief translates into AI-processable context: the transition from human thinking to Context Phase.',
    es: 'Cómo el Solution Brief se traduce en contexto procesable por la IA: la transición de pensamiento humano a Context Phase.',
  },
};

/* ── Phase 3: Context Phase ── */
const contextPhase: Record<string, Text> = {
  'why-this-phase-exists': {
    en: 'The gap between what a team understands and what AI can process is the context. Context Phase is the discipline of crossing it.',
    es: 'La distancia entre lo que un equipo entiende y lo que una IA puede procesar es el contexto. Context Engineering es la disciplina de cruzar esa distancia.',
  },
  'por-que-esta-fase-existe': {
    en: 'The gap between what a team understands and what AI can process is the context. Context Phase is the discipline of crossing it.',
    es: 'La distancia entre lo que un equipo entiende y lo que una IA puede procesar es el contexto. Context Engineering es la disciplina de cruzar esa distancia.',
  },
  'context-vs-prompt': {
    en: 'A prompt is a point-in-time instruction. Context is an information architecture composed of Agents, Rules, and Skills. Confusing the two is the most common mistake.',
    es: 'Un prompt es una instrucción puntual. El contexto es una arquitectura de información compuesta por Agentes, Reglas y Skills. Confundirlos es el error más común.',
  },
  'contexto-vs-prompt': {
    en: 'A prompt is a point-in-time instruction. Context is an information architecture composed of Agents, Rules, and Skills. Confusing the two is the most common mistake.',
    es: 'Un prompt es una instrucción puntual. El contexto es una arquitectura de información compuesta por Agentes, Reglas y Skills. Confundirlos es el error más común.',
  },
  'who-participates': {
    en: 'The Context Engineer is the architect of the Agents, Rules, and Skills system. Not a prompt engineer — a system designer who works across three dimensions simultaneously.',
    es: 'El Context Engineer es el arquitecto del sistema de Agentes, Reglas y Skills. No es un prompt engineer, es un diseñador de sistemas que trabaja en tres dimensiones simultáneamente.',
  },
  'quien-participa': {
    en: 'The Context Engineer is the architect of the Agents, Rules, and Skills system. Not a prompt engineer — a system designer who works across three dimensions simultaneously.',
    es: 'El Context Engineer es el arquitecto del sistema de Agentes, Reglas y Skills. No es un prompt engineer, es un diseñador de sistemas que trabaja en tres dimensiones simultáneamente.',
  },
  'rules-the-constitution': {
    en: 'Rules are the norms that apply to the entire project. They are what turns a collection of independent Agents and Skills into a coherent system.',
    es: 'Las Reglas son las normas que aplican a todo el proyecto. Son lo que convierte un conjunto de Agentes y Skills independientes en un sistema coherente.',
  },
  'reglas-la-constitucion': {
    en: 'Rules are the norms that apply to the entire project. They are what turns a collection of independent Agents and Skills into a coherent system.',
    es: 'Las Reglas son las normas que aplican a todo el proyecto. Son lo que convierte un conjunto de Agentes y Skills independientes en un sistema coherente.',
  },
  'agents-orchestrators-and-executors': {
    en: 'Agents are specialized AI profiles — not generic instances. Each one has a defined role, clear limits, and a protocol for when information is insufficient.',
    es: 'Los Agentes son perfiles especializados de IA, no instancias genéricas. Cada uno tiene un rol definido, límites claros y un protocolo para cuando la información es insuficiente.',
  },
  'agentes-orquestadores-y-ejecutores': {
    en: 'Agents are specialized AI profiles — not generic instances. Each one has a defined role, clear limits, and a protocol for when information is insufficient.',
    es: 'Los Agentes son perfiles especializados de IA, no instancias genéricas. Cada uno tiene un rol definido, límites claros y un protocolo para cuando la información es insuficiente.',
  },
  'skills-concrete-tasks': {
    en: 'Skills are the \'what gets done concretely.\' Self-contained work units with all the context an Agent needs to complete them without ambiguity.',
    es: 'Los Skills son el \'qué se hace concretamente\'. Unidades de trabajo autocontenidas con todo el contexto que un Agente necesita para completarlas sin ambigüedad.',
  },
  'skills-tareas-concretas': {
    en: 'Skills are the \'what gets done concretely.\' Self-contained work units with all the context an Agent needs to complete them without ambiguity.',
    es: 'Los Skills son el \'qué se hace concretamente\'. Unidades de trabajo autocontenidas con todo el contexto que un Agente necesita para completarlas sin ambigüedad.',
  },
  'connection-to-phase-4': {
    en: 'When the Gate Review is complete, the team has a system of Agents, Rules, and Skills. The construction phase doesn\'t start with a briefing — it starts with context.',
    es: 'Cuando el Gate Review se completa, el equipo tiene un sistema de Agentes, Reglas y Skills. La fase de construcción no empieza con un briefing, empieza con contexto.',
  },
  'conexion-con-fase-4': {
    en: 'When the Gate Review is complete, the team has a system of Agents, Rules, and Skills. The construction phase doesn\'t start with a briefing — it starts with context.',
    es: 'Cuando el Gate Review se completa, el equipo tiene un sistema de Agentes, Reglas y Skills. La fase de construcción no empieza con un briefing, empieza con contexto.',
  },
};

/* ── Phase 4: AI Build Phase ── */
const aiBuildPhase: Record<string, Text> = {
  'why-this-phase-exists': {
    en: 'Phase 4 exists so that AI\'s construction speed becomes an asset, not a risk. Its function is to protect context integrity during construction.',
    es: 'La Fase 4 existe para que la velocidad de construcción de la IA se convierta en un activo, no en un riesgo. Su función es proteger la integridad del contexto durante la construcción.',
  },
  'por-que-esta-fase-existe': {
    en: 'Phase 4 exists so that AI\'s construction speed becomes an asset, not a risk. Its function is to protect context integrity during construction.',
    es: 'La Fase 4 existe para que la velocidad de construcción de la IA se convierta en un activo, no en un riesgo. Su función es proteger la integridad del contexto durante la construcción.',
  },
  'the-cost-inversion': {
    en: 'Construction contributes only 10% of an AI project\'s value. The value was already captured in previous phases. Understanding this changes how Phase 4 is managed.',
    es: 'La construcción aporta solo el 10% del valor de un proyecto de IA. El valor ya estaba capturado en las fases anteriores. Entender esto cambia cómo se gestiona la Fase 4.',
  },
  'la-inversion-del-coste': {
    en: 'Construction contributes only 10% of an AI project\'s value. The value was already captured in previous phases. Understanding this changes how Phase 4 is managed.',
    es: 'La construcción aporta solo el 10% del valor de un proyecto de IA. El valor ya estaba capturado en las fases anteriores. Entender esto cambia cómo se gestiona la Fase 4.',
  },
  'what-it-is-and-isnt': {
    en: 'AI Build Phase is a process of context materialization, distributed fidelity supervision, and coordinated gap management. It is not free design, nor discovery, nor unrequested improvement.',
    es: 'AI Build Phase es un proceso de materialización del contexto, supervisión de fidelidad distribuida y gestión coordinada de gaps. No es diseño libre, ni descubrimiento, ni mejora no solicitada.',
  },
  'que-es-y-que-no-es': {
    en: 'AI Build Phase is a process of context materialization, distributed fidelity supervision, and coordinated gap management. It is not free design, nor discovery, nor unrequested improvement.',
    es: 'AI Build Phase es un proceso de materialización del contexto, supervisión de fidelidad distribuida y gestión coordinada de gaps. No es diseño libre, ni descubrimiento, ni mejora no solicitada.',
  },
  'parallel-construction': {
    en: 'How to manage simultaneous construction by multiple teams and AI agents without losing coherence. The dependency graph, role hierarchy, and distributed Decision Log.',
    es: 'Cómo gestionar la construcción simultánea por múltiples equipos y agentes de IA sin perder coherencia. El grafo de dependencias, la jerarquía de roles y el Decision Log distribuido.',
  },
  'construccion-paralela': {
    en: 'How to manage simultaneous construction by multiple teams and AI agents without losing coherence. The dependency graph, role hierarchy, and distributed Decision Log.',
    es: 'Cómo gestionar la construcción simultánea por múltiples equipos y agentes de IA sin perder coherencia. El grafo de dependencias, la jerarquía de roles y el Decision Log distribuido.',
  },
  'who-participates': {
    en: 'Phase 4 introduces a functional hierarchy with five decision levels. The Context Engineer supervises, the Tech Lead coordinates, Dev Leads execute, and the QA Agent protects.',
    es: 'La Fase 4 introduce una jerarquía funcional con cinco niveles de decisión. El Context Engineer supervisa, el Tech Lead coordina, los Dev Leads ejecutan y el QA Agent protege.',
  },
  'quien-participa': {
    en: 'Phase 4 introduces a functional hierarchy with five decision levels. The Context Engineer supervises, the Tech Lead coordinates, Dev Leads execute, and the QA Agent protects.',
    es: 'La Fase 4 introduce una jerarquía funcional con cinco niveles de decisión. El Context Engineer supervisa, el Tech Lead coordina, los Dev Leads ejecutan y el QA Agent protege.',
  },
  'context-drift': {
    en: 'Context Drift is the gradual accumulation of technical decisions that, individually reasonable, silently move the built solution away from the original problem.',
    es: 'Context Drift es la acumulación gradual de decisiones técnicas que, individualmente razonables, alejan silenciosamente la solución del problema original.',
  },
  'connection-to-phase-5': {
    en: 'Construction is not the end of thinking. It\'s the way to put thinking to the test. Three specific transfers connect AI Build Phase to Market Phase.',
    es: 'La construcción no es el final del pensamiento. Es la forma de poner el pensamiento a prueba. Tres transferencias específicas conectan AI Build Phase con Market Phase.',
  },
  'conexion-con-fase-5': {
    en: 'Construction is not the end of thinking. It\'s the way to put thinking to the test. Three specific transfers connect AI Build Phase to Market Phase.',
    es: 'La construcción no es el final del pensamiento. Es la forma de poner el pensamiento a prueba. Tres transferencias específicas conectan AI Build Phase con Market Phase.',
  },
};

/* ── Phase 5: Market Phase ── */
const marketPhase: Record<string, Text> = {
  'why-this-phase-exists': {
    en: 'Phase 5 exists so the market stops being a silent judge and becomes a permanent teacher. Without it, the Context Document freezes at the moment of launch.',
    es: 'La Fase 5 existe para que el mercado deje de ser un juez silencioso y se convierta en un profesor permanente. Sin ella, el Context Document se congela en el momento del lanzamiento.',
  },
  'por-que-esta-fase-existe': {
    en: 'Phase 5 exists so the market stops being a silent judge and becomes a permanent teacher. Without it, the Context Document freezes at the moment of launch.',
    es: 'La Fase 5 existe para que el mercado deje de ser un juez silencioso y se convierta en un profesor permanente. Sin ella, el Context Document se congela en el momento del lanzamiento.',
  },
  'the-learning-spiral': {
    en: 'Phase 5 is not the end of the methodology. It\'s the transition from a linear cycle to a learning spiral where each turn produces a more precise Context Document.',
    es: 'La Fase 5 no es el final de la metodología. Es la transición de un ciclo lineal a una espiral de aprendizaje donde cada vuelta produce un Context Document más preciso.',
  },
  'la-espiral-de-aprendizaje': {
    en: 'Phase 5 is not the end of the methodology. It\'s the transition from a linear cycle to a learning spiral where each turn produces a more precise Context Document.',
    es: 'La Fase 5 no es el final de la metodología. Es la transición de un ciclo lineal a una espiral de aprendizaje donde cada vuelta produce un Context Document más preciso.',
  },
  'what-it-is-and-isnt': {
    en: 'Market Phase is a continuous process of capturing, interpreting, and acting on market signals. It is not hypothesis validation, user feedback collection, or a sprint cycle.',
    es: 'Market Phase es un proceso continuo de captura, interpretación y acción sobre señales del mercado. No es validación de hipótesis, no es feedback de usuarios, no es un ciclo de sprints.',
  },
  'que-es-y-que-no-es': {
    en: 'Market Phase is a continuous process of capturing, interpreting, and acting on market signals. It is not hypothesis validation, user feedback collection, or a sprint cycle.',
    es: 'Market Phase es un proceso continuo de captura, interpretación y acción sobre señales del mercado. No es validación de hipótesis, no es feedback de usuarios, no es un ciclo de sprints.',
  },
  'market-signals': {
    en: 'Not all market signals have the same value. The core skill of Phase 5 is reading the right data the right way and translating it into Context Document updates.',
    es: 'No todas las señales del mercado tienen el mismo valor. La habilidad central de la Fase 5 es leer los datos correctos de la forma correcta y traducirlos en actualizaciones del Context Document.',
  },
  'las-senales-del-mercado': {
    en: 'Not all market signals have the same value. The core skill of Phase 5 is reading the right data the right way and translating it into Context Document updates.',
    es: 'No todas las señales del mercado tienen el mismo valor. La habilidad central de la Fase 5 es leer los datos correctos de la forma correcta y traducirlos en actualizaciones del Context Document.',
  },
  'progressive-automation': {
    en: 'Phase 5 is progressively automated: from instrumented observation to a learning system. The precision of the Context Document determines how much automation is viable.',
    es: 'La Fase 5 se automatiza progresivamente: desde la observación instrumentada hasta un sistema que aprende. La precisión del Context Document determina cuánta automatización es viable.',
  },
  'automatizacion-progresiva': {
    en: 'Phase 5 is progressively automated: from instrumented observation to a learning system. The precision of the Context Document determines how much automation is viable.',
    es: 'La Fase 5 se automatiza progresivamente: desde la observación instrumentada hasta un sistema que aprende. La precisión del Context Document determina cuánta automatización es viable.',
  },
  'context-debt': {
    en: 'Context Debt in Phase 5 occurs when the market sends change signals and the Context Document doesn\'t incorporate them. It\'s not technical — it\'s semantic.',
    es: 'La Context Debt en la Fase 5 se produce cuando el mercado envía señales de cambio y el Context Document no las incorpora. No es técnica, es semántica.',
  },
  'who-participates': {
    en: 'Phase 5 is not an isolated product process. It\'s the continuation of the organizational consensus built in Phase 2. Stakeholders from Phases 1 and 2 actively participate.',
    es: 'La Fase 5 no es un proceso de producto aislado. Es la continuación del consenso organizacional construido en la Fase 2. Los stakeholders de las Fases 1 y 2 participan activamente.',
  },
  'quien-participa': {
    en: 'Phase 5 is not an isolated product process. It\'s the continuation of the organizational consensus built in Phase 2. Stakeholders from Phases 1 and 2 actively participate.',
    es: 'La Fase 5 no es un proceso de producto aislado. Es la continuación del consenso organizacional construido en la Fase 2. Los stakeholders de las Fases 1 y 2 participan activamente.',
  },
  'the-living-context': {
    en: 'A mature Context Document — one that has survived twelve months of Market Phase — contains the deepest understanding available about the problem, the solution, and the context in which both operate.',
    es: 'Un Context Document maduro (uno que ha sobrevivido doce meses de Market Phase) contiene la comprensión más profunda disponible sobre el problema, la solución y el contexto en el que ambos operan.',
  },
  'el-contexto-vivo': {
    en: 'A mature Context Document — one that has survived twelve months of Market Phase — contains the deepest understanding available about the problem, the solution, and the context in which both operate.',
    es: 'Un Context Document maduro (uno que ha sobrevivido doce meses de Market Phase) contiene la comprensión más profunda disponible sobre el problema, la solución y el contexto en el que ambos operan.',
  },
};

const phaseMap: Record<string, Record<string, Text>> = {
  'problem-phase': problemPhase,
  'solution-phase': solutionPhase,
  'context-phase': contextPhase,
  'ai-build-phase': aiBuildPhase,
  'market-phase': marketPhase,
};

function getSlug(href: string): string | null {
  const segments = href.replace(/\/$/, '').split('/');
  return segments[segments.length - 1] || null;
}

function getPhaseFromPath(pathname: string): string | null {
  const match = pathname.match(/(problem-phase|solution-phase|context-phase|ai-build-phase|market-phase)/);
  return match ? match[1] : null;
}

export default function MethodologyCardList(): React.JSX.Element {
  const items = useCurrentSidebarSiblings();
  const {pathname} = useLocation();
  const {i18n} = useDocusaurusContext();
  const {colorMode} = useColorMode();
  const locale = i18n.currentLocale === 'es' ? 'es' : 'en';
  const isDark = colorMode === 'dark';
  const iconSrc = isDark ? ICON_DARK : ICON_LIGHT;

  const phase = getPhaseFromPath(pathname);
  const descriptions = phase ? phaseMap[phase] : undefined;

  const filtered = items.filter((item) => {
    if (item.type === 'link') return item.href !== pathname;
    if (item.type === 'category' && item.href) return item.href !== pathname;
    return true;
  });

  return (
    <div className={styles.grid}>
      {filtered.map((item) => {
        const href =
          item.type === 'link'
            ? item.href
            : item.type === 'category'
              ? item.href
              : undefined;
        if (!href) return null;

        const slug = getSlug(href);
        const entry = slug && descriptions ? descriptions[slug] : undefined;
        const description = entry ? entry[locale] : undefined;

        return (
          <article key={href} className={styles.card}>
            <Link href={href} className={styles.cardLink}>
              <h2 className={styles.cardTitle}>
                <img
                  src={iconSrc}
                  alt=""
                  className={styles.cardIcon}
                  loading="lazy"
                />
                {'label' in item && item.label}
              </h2>
              {description && (
                <p className={styles.cardDescription}>{description}</p>
              )}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
