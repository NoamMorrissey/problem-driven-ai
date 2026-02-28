import React from 'react';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import {useCurrentSidebarSiblings} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './styles.module.css';

interface PrincipleIcon {
  icon: string;
  iconDark: string;
}

interface PrincipleText {
  en: string;
  es: string;
}

const icons: Record<string, PrincipleIcon> = {
  'the-problem-is-sacred': {
    icon: '/img/The problem is sacred-ico.png',
    iconDark: '/img/The problem is sacred-ico-dark.png',
  },
  'el-problema-es-sagrado': {
    icon: '/img/The problem is sacred-ico.png',
    iconDark: '/img/The problem is sacred-ico-dark.png',
  },
  'the-client-doesnt-know-what-they-want': {
    icon: "/img/The client doesn't know what they want, but knows what they feel-ico.png",
    iconDark: "/img/The client doesn't know what they want, but knows what they feel-ico-dark.png",
  },
  'el-cliente-no-sabe-lo-que-quiere': {
    icon: "/img/The client doesn't know what they want, but knows what they feel-ico.png",
    iconDark: "/img/The client doesn't know what they want, but knows what they feel-ico-dark.png",
  },
  'without-consensus-no-context': {
    icon: '/img/Without consensus, there is no context-ico.png',
    iconDark: '/img/Without consensus, there is no context-ico-dark.png',
  },
  'sin-consenso-no-hay-contexto': {
    icon: '/img/Without consensus, there is no context-ico.png',
    iconDark: '/img/Without consensus, there is no context-ico-dark.png',
  },
  'context-engineering-is-design': {
    icon: '/img/Context Engineering is design, not writing-ico.png',
    iconDark: '/img/Context Engineering is design, not writing-ico-dark.png',
  },
  'context-engineering-es-diseno': {
    icon: '/img/Context Engineering is design, not writing-ico.png',
    iconDark: '/img/Context Engineering is design, not writing-ico-dark.png',
  },
  'building-is-a-symptom': {
    icon: '/img/Building is a symptom, not a goal-ico.png',
    iconDark: '/img/Building is a symptom, not a goal-ico-dark.png',
  },
  'la-construccion-es-un-sintoma': {
    icon: '/img/Building is a symptom, not a goal-ico.png',
    iconDark: '/img/Building is a symptom, not a goal-ico-dark.png',
  },
  'speed-is-a-reward': {
    icon: '/img/Speed is a reward, not a strategy-ico.png',
    iconDark: '/img/Speed is a reward, not a strategy-ico-dark.png',
  },
  'la-velocidad-es-una-recompensa': {
    icon: '/img/Speed is a reward, not a strategy-ico.png',
    iconDark: '/img/Speed is a reward, not a strategy-ico-dark.png',
  },
  'the-market-always-knows-more': {
    icon: '/img/The market always knows more than you-ico.png',
    iconDark: '/img/The market always knows more than you-ico-dark.png',
  },
  'el-mercado-siempre-sabe-mas': {
    icon: '/img/The market always knows more than you-ico.png',
    iconDark: '/img/The market always knows more than you-ico-dark.png',
  },
  'iterating-is-not-repeating': {
    icon: '/img/Iterating is not repeating-ico.png',
    iconDark: '/img/Iterating is not repeating-ico-dark.png',
  },
  'iterar-no-es-repetir': {
    icon: '/img/Iterating is not repeating-ico.png',
    iconDark: '/img/Iterating is not repeating-ico-dark.png',
  },
  'context-is-a-living-asset': {
    icon: '/img/Context is a living asset-ico.png',
    iconDark: '/img/Context is a living asset-ico-dark.png',
  },
  'el-contexto-es-un-activo-vivo': {
    icon: '/img/Context is a living asset-ico.png',
    iconDark: '/img/Context is a living asset-ico-dark.png',
  },
  'clarity-is-the-only-luxury': {
    icon: "/img/Clarity is the only luxury you can't afford to lose-ico.png",
    iconDark: "/img/Clarity is the only luxury you can't afford to lose-ico-dark.png",
  },
  'la-claridad-es-el-unico-lujo': {
    icon: "/img/Clarity is the only luxury you can't afford to lose-ico.png",
    iconDark: "/img/Clarity is the only luxury you can't afford to lose-ico-dark.png",
  },
};

const descriptions: Record<string, PrincipleText> = {
  'the-problem-is-sacred': {
    en: 'Never assume you understand the problem. The real problem is rarely the one presented in the first conversation.',
    es: 'Nunca asumas que entiendes el problema. El problema real raramente es el que te presentan en la primera conversación.',
  },
  'el-problema-es-sagrado': {
    en: 'Never assume you understand the problem. The real problem is rarely the one presented in the first conversation.',
    es: 'Nunca asumas que entiendes el problema. El problema real raramente es el que te presentan en la primera conversación.',
  },
  'the-client-doesnt-know-what-they-want': {
    en: "Don't ask the client what solution they need. Ask them what hurts, what slows them down, what costs them.",
    es: 'No le preguntes al cliente qué solución necesita. Pregúntale qué le duele, qué le frena, qué le cuesta.',
  },
  'el-cliente-no-sabe-lo-que-quiere': {
    en: "Don't ask the client what solution they need. Ask them what hurts, what slows them down, what costs them.",
    es: 'No le preguntes al cliente qué solución necesita. Pregúntale qué le duele, qué le frena, qué le cuesta.',
  },
  'without-consensus-no-context': {
    en: "You can't write precise context for AI if there's disagreement within your organization about the problem or solution.",
    es: 'No puedes escribir un contexto preciso para la IA si dentro de tu organización hay desacuerdo sobre el problema o la solución.',
  },
  'sin-consenso-no-hay-contexto': {
    en: "You can't write precise context for AI if there's disagreement within your organization about the problem or solution.",
    es: 'No puedes escribir un contexto preciso para la IA si dentro de tu organización hay desacuerdo sobre el problema o la solución.',
  },
  'context-engineering-is-design': {
    en: "Writing context for AI is not summarizing what you know. It's making deliberate decisions about what to include, exclude, and how to structure.",
    es: 'Escribir el contexto para la IA no es resumir lo que sabes. Es tomar decisiones deliberadas sobre qué incluir, qué excluir y cómo estructurar.',
  },
  'context-engineering-es-diseno': {
    en: "Writing context for AI is not summarizing what you know. It's making deliberate decisions about what to include, exclude, and how to structure.",
    es: 'Escribir el contexto para la IA no es resumir lo que sabes. Es tomar decisiones deliberadas sobre qué incluir, qué excluir y cómo estructurar.',
  },
  'building-is-a-symptom': {
    en: "Building is the natural consequence of having thought well. It's not an achievement in itself.",
    es: 'Construir es la consecuencia natural de haber pensado bien. No es un logro en sí mismo.',
  },
  'la-construccion-es-un-sintoma': {
    en: "Building is the natural consequence of having thought well. It's not an achievement in itself.",
    es: 'Construir es la consecuencia natural de haber pensado bien. No es un logro en sí mismo.',
  },
  'speed-is-a-reward': {
    en: 'The speed AI offers is the result of having done the prior work well, not the goal of doing it.',
    es: 'La velocidad que ofrece la IA es el resultado de haber hecho bien el trabajo previo, no el objetivo de hacerlo.',
  },
  'la-velocidad-es-una-recompensa': {
    en: 'The speed AI offers is the result of having done the prior work well, not the goal of doing it.',
    es: 'La velocidad que ofrece la IA es el resultado de haber hecho bien el trabajo previo, no el objetivo de hacerlo.',
  },
  'the-market-always-knows-more': {
    en: 'No discovery, however deep, replaces real contact with the market.',
    es: 'Ningún discovery, por profundo que sea, sustituye al contacto real con el mercado.',
  },
  'el-mercado-siempre-sabe-mas': {
    en: 'No discovery, however deep, replaces real contact with the market.',
    es: 'Ningún discovery, por profundo que sea, sustituye al contacto real con el mercado.',
  },
  'iterating-is-not-repeating': {
    en: "Each iteration must incorporate new information. If you return to the same point without learning something new, you're not iterating.",
    es: 'Cada iteración debe incorporar nueva información. Si vuelves al mismo punto sin haber aprendido algo nuevo, no estás iterando.',
  },
  'iterar-no-es-repetir': {
    en: "Each iteration must incorporate new information. If you return to the same point without learning something new, you're not iterating.",
    es: 'Cada iteración debe incorporar nueva información. Si vuelves al mismo punto sin haber aprendido algo nuevo, no estás iterando.',
  },
  'context-is-a-living-asset': {
    en: 'The context you build for AI is not a static document. It evolves with each iteration, market signal, and new learning.',
    es: 'El contexto que construyes para la IA no es un documento estático. Evoluciona con cada iteración, señal del mercado y nuevo aprendizaje.',
  },
  'el-contexto-es-un-activo-vivo': {
    en: 'The context you build for AI is not a static document. It evolves with each iteration, market signal, and new learning.',
    es: 'El contexto que construyes para la IA no es un documento estático. Evoluciona con cada iteración, señal del mercado y nuevo aprendizaje.',
  },
  'clarity-is-the-only-luxury': {
    en: 'In every phase of this methodology, clarity is the scarcest and most valuable resource.',
    es: 'En cada fase de esta metodología, la claridad es el recurso más escaso y más valioso.',
  },
  'la-claridad-es-el-unico-lujo': {
    en: 'In every phase of this methodology, clarity is the scarcest and most valuable resource.',
    es: 'En cada fase de esta metodología, la claridad es el recurso más escaso y más valioso.',
  },
};

function getPrincipleSlug(href: string): string | null {
  const segments = href.replace(/\/$/, '').split('/');
  return segments[segments.length - 1] || null;
}

export default function PrincipleCardList(): React.JSX.Element {
  const items = useCurrentSidebarSiblings();
  const {pathname} = useLocation();
  const {i18n} = useDocusaurusContext();
  const {colorMode} = useColorMode();
  const locale = i18n.currentLocale === 'es' ? 'es' : 'en';
  const isDark = colorMode === 'dark';

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

        const slug = getPrincipleSlug(href);
        const principle = slug ? descriptions[slug] : undefined;
        if (!principle) return null;
        const description = principle[locale];
        const principleIcon = slug ? icons[slug] : undefined;
        const iconSrc = principleIcon
          ? isDark
            ? principleIcon.iconDark
            : principleIcon.icon
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
