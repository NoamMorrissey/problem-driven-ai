import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './styles.module.css';

const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ';

interface NavCard {
  title: {en: string; es: string};
  description: {en: string; es: string};
  href: {en: string; es: string};
  icon: string;
  iconDark: string;
}

const NAV_CARDS: NavCard[] = [
  {
    title: {en: 'Methodology', es: 'Metodología'},
    description: {
      en: 'The strategic layer. Understand the principles, phases, and philosophy behind building AI products that solve real problems.',
      es: 'La capa estratégica. Comprende los principios, fases y filosofía detrás de construir productos de IA que resuelven problemas reales.',
    },
    href: {en: '/overview', es: '/es/overview'},
    icon: '/img/principios-ico.png',
    iconDark: '/img/principios-ico-dark.png',
  },
  {
    title: {en: 'Framework', es: 'Framework'},
    description: {
      en: 'The operational layer. Step-by-step guides, artifact templates, and anti-pattern detection for every phase of the lifecycle.',
      es: 'La capa operativa. Guías paso a paso, plantillas de artefactos y detección de anti-patrones para cada fase del ciclo de vida.',
    },
    href: {en: '/framework', es: '/es/framework'},
    icon: '/img/fases-ico.png',
    iconDark: '/img/fases-ico-dark.png',
  },
  {
    title: {en: 'Resources', es: 'Recursos'},
    description: {
      en: 'Supporting tools. Glossary, FAQ, and roadmap to navigate the methodology effectively.',
      es: 'Herramientas de apoyo. Glosario, FAQ y roadmap para navegar la metodología de forma efectiva.',
    },
    href: {en: '/resources', es: '/es/recursos'},
    icon: '/img/glosario-ico.png',
    iconDark: '/img/glosario-ico-dark.png',
  },
];

interface FeatureBlock {
  title: {en: string; es: string};
  text: {en: string; es: string};
}

const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    title: {en: 'Problem First', es: 'El Problema Primero'},
    text: {
      en: 'Before designing any solution, you define and validate the real problem with the people who live it every day. If the team can\'t agree on the problem, nothing gets built.',
      es: 'Antes de diseñar cualquier solución, defines y validas el problema real con las personas que lo viven cada día. Si el equipo no se pone de acuerdo en el problema, no se construye nada.',
    },
  },
  {
    title: {en: 'Context by Design', es: 'Contexto por Diseño'},
    text: {
      en: 'AI works well when it receives structured knowledge, not improvised prompts. You build organized documents that tell the AI exactly what it needs to know.',
      es: 'La IA funciona bien cuando recibe conocimiento estructurado, no prompts improvisados. Construyes documentos organizados que le dicen a la IA exactamente lo que necesita saber.',
    },
  },
  {
    title: {en: '5 Phases, 5 Gates', es: '5 Fases, 5 Puertas'},
    text: {
      en: 'The process is divided into five phases with a quality gate between each one. You can only move forward when the current phase is complete. No skipping steps, no shortcuts.',
      es: 'El proceso se divide en cinco fases con una puerta de calidad entre cada una. Solo puedes avanzar cuando la fase actual está completa. Sin saltar pasos, sin atajos.',
    },
  },
  {
    title: {en: 'Defined Roles', es: 'Roles Definidos'},
    text: {
      en: 'Every team member knows what they own and what they deliver at each phase. Product, engineering, and business work together with clear responsibilities.',
      es: 'Cada miembro del equipo sabe qué le pertenece y qué entrega en cada fase. Producto, ingeniería y negocio trabajan juntos con responsabilidades claras.',
    },
  },
];

const PILLS = {
  en: [
    'Question first',
    'Context by design',
    'Validate or stop',
    'One team, one truth',
  ],
  es: [
    'Primero la pregunta',
    'Contexto por diseño',
    'Valida o detente',
    'Un equipo, una verdad',
  ],
};

export default function Homepage(): React.ReactElement {
  const {i18n} = useDocusaurusContext();
  const {colorMode} = useColorMode();
  const locale = i18n.currentLocale === 'es' ? 'es' : 'en';
  const isDark = colorMode === 'dark';

  return (
    <div className={styles.homepage}>
      {/* Section A: Hero Text */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Problem-Driven AI</h1>
        <p className={styles.heroSubtitle}>
          {locale === 'es'
            ? 'No construyas más rápido. Construye lo que importa.'
            : 'Don\'t build faster. Build what matters.'}
        </p>
      </section>

      {/* Section B: Video Hero */}
      <section className={styles.videoSection}>
        <div className={styles.videoWrapper}>
          <iframe
            className={styles.videoIframe}
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
            title="Problem-Driven AI"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Section C: Navigation Cards */}
      <section className={styles.navCards}>
        {NAV_CARDS.map((card) => (
          <a
            key={card.title.en}
            href={card.href[locale]}
            className={styles.navCard}
          >
            <div className={styles.navCardHeader}>
              <img
                src={isDark ? card.iconDark : card.icon}
                alt=""
                className={styles.navCardIcon}
                loading="lazy"
              />
              <span className={styles.navCardTitle}>{card.title[locale]}</span>
              <span className={styles.navCardArrow}>→</span>
            </div>
            <p className={styles.navCardDescription}>
              {card.description[locale]}
            </p>
          </a>
        ))}
      </section>

      {/* Section D: Why Problem-Driven AI? */}
      <section className={styles.whySection}>
        <h2 className={styles.whyTitle}>
          {locale === 'es'
            ? '¿Por qué Problem-Driven AI?'
            : 'Why Problem-Driven AI?'}
        </h2>
        <p className={styles.whySubtitle}>
          {locale === 'es'
            ? 'La tecnología nunca es el cuello de botella. La claridad sí.'
            : 'Technology is never the bottleneck. Clarity is.'}
        </p>

        <div className={styles.pills}>
          {PILLS[locale].map((pill) => (
            <span key={pill} className={styles.pill}>
              {pill}
            </span>
          ))}
        </div>

        <div className={styles.featureGrid}>
          {FEATURE_BLOCKS.map((block) => (
            <div key={block.title.en} className={styles.featureBlock}>
              <h3 className={styles.featureBlockTitle}>
                {block.title[locale]}
              </h3>
              <p className={styles.featureBlockText}>{block.text[locale]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
