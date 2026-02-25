import React from 'react';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import {useCurrentSidebarSiblings} from '@docusaurus/plugin-content-docs/client';
import {findFirstSidebarItemLink} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './styles.module.css';

interface PhaseText {
  en: string;
  es: string;
}

interface PhaseIcon {
  icon: string;
  iconDark: string;
}

const icons: Record<string, PhaseIcon> = {
  'problem-discovery': {
    icon: '/img/problema-ico.png',
    iconDark: '/img/problema-ico-dark.png',
  },
  'solution-alignment': {
    icon: '/img/solucion-ico.png',
    iconDark: '/img/solucion-ico-dark.png',
  },
  'context-engineering': {
    icon: '/img/contexto-ico.png',
    iconDark: '/img/contexto-ico-dark.png',
  },
  'ai-build': {
    icon: '/img/aibuid-ico.png',
    iconDark: '/img/aibuid-ico-dark.png',
  },
  'market-iteration': {
    icon: '/img/market-ico.png',
    iconDark: '/img/market-ico-dark.png',
  },
  'manifesto': {
    icon: '/img/manifiesto-ico.png',
    iconDark: '/img/manifiesto-ico-dark.png',
  },
  'manifiesto': {
    icon: '/img/manifiesto-ico.png',
    iconDark: '/img/manifiesto-ico-dark.png',
  },
  'principles': {
    icon: '/img/principios-ico.png',
    iconDark: '/img/principios-ico-dark.png',
  },
  'principios': {
    icon: '/img/principios-ico.png',
    iconDark: '/img/principios-ico-dark.png',
  },
  'phases': {
    icon: '/img/fases-ico.png',
    iconDark: '/img/fases-ico-dark.png',
  },
  'fases': {
    icon: '/img/fases-ico.png',
    iconDark: '/img/fases-ico-dark.png',
  },
};

const methodology: Record<string, PhaseText> = {
  'problem-discovery': {
    en: 'Active investigation with the people who live the problem to produce a precise, validated definition before thinking about solutions.',
    es: 'Investigaci\u00f3n activa con las personas que viven el problema para producir una definici\u00f3n precisa y validada antes de pensar en soluciones.',
  },
  'solution-alignment': {
    en: 'Iterative process to turn a well-defined problem into a solution with real organizational consensus, not just hierarchical approval.',
    es: 'Proceso iterativo para convertir un problema bien definido en una soluci\u00f3n con consenso organizacional real, no solo aprobaci\u00f3n jer\u00e1rquica.',
  },
  'context-engineering': {
    en: 'Translating human thinking into a system of Agents, Rules, and Skills that enables AI to build with precision and coherence.',
    es: 'Traducci\u00f3n del pensamiento humano a un sistema de Agentes, Reglas y Skills que permite a la IA construir con precisi\u00f3n y coherencia.',
  },
  'ai-build': {
    en: 'Materializing context into a built solution, protecting fidelity to the Problem Statement in every technical decision.',
    es: 'Materializaci\u00f3n del contexto en una soluci\u00f3n construida, protegiendo la fidelidad al Problem Statement en cada decisi\u00f3n t\u00e9cnica.',
  },
  'market-iteration': {
    en: 'Permanent regime of capturing and incorporating market signals so that each construction cycle is more precise than the last.',
    es: 'R\u00e9gimen permanente de captura e incorporaci\u00f3n de se\u00f1ales del mercado para que cada ciclo de construcci\u00f3n sea m\u00e1s preciso que el anterior.',
  },
};

const framework: Record<string, PhaseText> = {
  'problem-discovery': {
    en: 'The team conducts interviews, synthesizes findings, and drafts a Problem Statement validated with real users and with the person who has the authority to solve it.',
    es: 'El equipo realiza entrevistas, sintetiza los hallazgos y redacta un Problem Statement validado con usuarios reales y con quien tiene autoridad para resolverlo.',
  },
  'solution-alignment': {
    en: 'The team generates options, evaluates them with explicit criteria, and reaches a real agreement on what to build. The result is a Solution Brief with no unresolved critical assumptions.',
    es: 'El equipo genera opciones, las eval\u00faa con criterios expl\u00edcitos y alcanza un acuerdo real sobre qu\u00e9 construir. El resultado es un Solution Brief sin asunciones cr\u00edticas sin resolver.',
  },
  'context-engineering': {
    en: 'The team defines the project Rules, each Agent\u2019s roles, and concrete tasks in Story Files. Everything must be self-contained and traceable before building.',
    es: 'El equipo define las Reglas del proyecto, los roles de cada Agente y las tareas concretas en Story Files. Todo debe ser autocontenido y trazable antes de construir.',
  },
  'ai-build': {
    en: 'The team builds following Story Files and documents every unforeseen decision. The phase ends when technical and non-technical stakeholders recognize the result as faithful to the original problem.',
    es: 'El equipo construye siguiendo los Story Files y documenta cada decisi\u00f3n no prevista. La fase termina cuando stakeholders t\u00e9cnicos y no t\u00e9cnicos reconocen el resultado como fiel al problema original.',
  },
  'market-iteration': {
    en: 'The team captures market signals, interprets them, and updates the context in each cycle. It has no end: it operates continuously while the product is active.',
    es: 'El equipo captura se\u00f1ales del mercado, las interpreta y actualiza el contexto en cada ciclo. No tiene fin: opera de forma continua mientras el producto est\u00e1 activo.',
  },
};

const overview: Record<string, PhaseText> = {
  'manifesto': {
    en: 'The founding declaration: AI doesn\'t solve poorly defined problems faster — it builds them wrong, faster. The value lies in prior thinking.',
    es: 'La declaración fundacional: la IA no resuelve problemas mal definidos más rápido, los construye mal más rápido. El valor está en el pensamiento previo.',
  },
  'manifiesto': {
    en: 'The founding declaration: AI doesn\'t solve poorly defined problems faster — it builds them wrong, faster. The value lies in prior thinking.',
    es: 'La declaración fundacional: la IA no resuelve problemas mal definidos más rápido, los construye mal más rápido. El valor está en el pensamiento previo.',
  },
  'principles': {
    en: 'The ten principles that govern every decision within Problem-Driven AI. They are the criteria to know if you\'re on the right track.',
    es: 'Los diez principios que gobiernan cada decisión dentro de Problem-Driven AI. Son el criterio para saber si vas por buen camino.',
  },
  'principios': {
    en: 'The ten principles that govern every decision within Problem-Driven AI. They are the criteria to know if you\'re on the right track.',
    es: 'Los diez principios que gobiernan cada decisión dentro de Problem-Driven AI. Son el criterio para saber si vas por buen camino.',
  },
  'phases': {
    en: 'The complete lifecycle in five interdependent phases: from Problem Discovery to Market Iteration. Each phase is the precondition for the next.',
    es: 'El ciclo de vida completo en cinco fases interdependientes: desde Problem Discovery hasta Market Iteration. Cada fase es la condición de posibilidad de la siguiente.',
  },
  'fases': {
    en: 'The complete lifecycle in five interdependent phases: from Problem Discovery to Market Iteration. Each phase is the precondition for the next.',
    es: 'El ciclo de vida completo en cinco fases interdependientes: desde Problem Discovery hasta Market Iteration. Cada fase es la condición de posibilidad de la siguiente.',
  },
};

const variants = {methodology, framework, overview};

function getPhaseSlug(href: string): string | null {
  const segments = href.replace(/\/$/, '').split('/');
  return segments[segments.length - 1] || null;
}

interface Props {
  variant?: 'methodology' | 'framework' | 'overview';
}

export default function PhaseCardList({
  variant = 'methodology',
}: Props): React.JSX.Element {
  const items = useCurrentSidebarSiblings();
  const {pathname} = useLocation();
  const {i18n} = useDocusaurusContext();
  const {colorMode} = useColorMode();
  const locale = i18n.currentLocale === 'es' ? 'es' : 'en';
  const isDark = colorMode === 'dark';
  const descriptions = variants[variant];

  const filtered = items.filter((item) => {
    if (item.type === 'link') return item.href !== pathname;
    if (item.type === 'category' && item.href) return item.href !== pathname;
    return true;
  });

  return (
    <div className={styles.grid}>
      {filtered.map((item) => {
        const href =
          item.type === 'category'
            ? findFirstSidebarItemLink(item) ?? item.href
            : item.type === 'link'
              ? item.href
              : undefined;
        if (!href) return null;

        const slug = getPhaseSlug(
          item.type === 'category' ? (item.href ?? href) : href,
        );
        const phase = slug ? descriptions[slug] : undefined;
        if (!phase) return null;
        const description = phase[locale];
        const phaseIcon = slug ? icons[slug] : undefined;
        const iconSrc = phaseIcon
          ? isDark
            ? phaseIcon.iconDark
            : phaseIcon.icon
          : undefined;

        return (
          <article key={href} className={styles.card}>
            <Link href={href} className={styles.cardLink}>
              <h2 className={styles.cardTitle}>
                {iconSrc && (
                  <img
                    src={iconSrc}
                    alt=""
                    className={styles.cardIcon}
                    loading="lazy"
                  />
                )}
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
