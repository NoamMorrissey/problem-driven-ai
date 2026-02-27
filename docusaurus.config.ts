import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Problem-Driven AI',
  tagline: 'A methodology for solving real problems with Artificial Intelligence',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],

  url: 'https://problem-driven-ai.dev',
  baseUrl: '/',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
      },
      es: {
        label: 'Español',
        direction: 'ltr',
        htmlLang: 'es-ES',
        calendar: 'gregory',
      },
    },
  },

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {from: '/framework/phases', to: '/framework'},
          {from: '/framework/fases', to: '/framework'},
        ],
        createRedirects(existingPath: string) {
          const redirects: string[] = [];

          // Directory segment translations
          const dirMappings = [
            {es: '/principios/', en: '/principles/'},
            {es: '/framework/fases/', en: '/framework/phases/'},
            {es: '/fases/', en: '/phases/'},
            {es: '/recursos/', en: '/resources/'},
          ];

          const indexMappings = [
            {es: '/principios', en: '/principles'},
            {es: '/framework/fases', en: '/framework/phases'},
            {es: '/fases', en: '/phases'},
            {es: '/recursos', en: '/resources'},
          ];

          // Page-level slug translations for locale switcher.
          // Docusaurus locale switcher prepends/removes /es/ but keeps the
          // source slug, so we need redirects from the full EN path (for ES
          // pages) and from the full ES path (for EN pages).
          const slugMappings = [
            // Manifesto (root-level, different namespace EN vs ES)
            {en: '/manifesto', es: '/overview/manifiesto'},
            // Principles
            {en: '/principles/the-problem-is-sacred', es: '/principios/el-problema-es-sagrado'},
            {en: '/principles/the-client-doesnt-know-what-they-want', es: '/principios/el-cliente-no-sabe-lo-que-quiere'},
            {en: '/principles/building-is-a-symptom', es: '/principios/la-construccion-es-un-sintoma'},
            {en: '/principles/context-engineering-is-design', es: '/principios/context-engineering-es-diseno'},
            {en: '/principles/without-consensus-no-context', es: '/principios/sin-consenso-no-hay-contexto'},
            {en: '/principles/speed-is-a-reward', es: '/principios/la-velocidad-es-una-recompensa'},
            {en: '/principles/the-market-always-knows-more', es: '/principios/el-mercado-siempre-sabe-mas'},
            {en: '/principles/iterating-is-not-repeating', es: '/principios/iterar-no-es-repetir'},
            {en: '/principles/context-is-a-living-asset', es: '/principios/el-contexto-es-un-activo-vivo'},
            {en: '/principles/clarity-is-the-only-luxury', es: '/principios/la-claridad-es-el-unico-lujo'},
            // Phase 1: Problem Phase (methodology)
            {en: '/phases/problem-phase/why-this-phase-exists', es: '/fases/problem-phase/por-que-esta-fase-existe'},
            {en: '/phases/problem-phase/the-solution-trap', es: '/fases/problem-phase/la-trampa-de-la-solucion'},
            {en: '/phases/problem-phase/what-it-is-and-isnt', es: '/fases/problem-phase/que-es-y-que-no-es'},
            {en: '/phases/problem-phase/cognitive-biases', es: '/fases/problem-phase/sesgos-cognitivos'},
            {en: '/phases/problem-phase/who-participates', es: '/fases/problem-phase/quien-participa'},
            {en: '/phases/problem-phase/the-questions', es: '/fases/problem-phase/las-preguntas'},
            {en: '/phases/problem-phase/connection-to-phase-2', es: '/fases/problem-phase/conexion-con-fase-2'},
            // Phase 2: Solution Phase (methodology)
            {en: '/phases/solution-phase/why-this-phase-exists', es: '/fases/solution-phase/por-que-esta-fase-existe'},
            {en: '/phases/solution-phase/anatomy-of-a-good-solution', es: '/fases/solution-phase/anatomia-de-una-buena-solucion'},
            {en: '/phases/solution-phase/what-it-is-and-isnt', es: '/fases/solution-phase/que-es-y-que-no-es'},
            {en: '/phases/solution-phase/who-participates', es: '/fases/solution-phase/quien-participa'},
            {en: '/phases/solution-phase/thinking-about-ai', es: '/fases/solution-phase/pensar-en-la-ia'},
            {en: '/phases/solution-phase/connection-to-phase-3', es: '/fases/solution-phase/conexion-con-fase-3'},
            // Phase 3: Context Phase (methodology)
            {en: '/phases/context-phase/why-this-phase-exists', es: '/fases/context-phase/por-que-esta-fase-existe'},
            {en: '/phases/context-phase/context-vs-prompt', es: '/fases/context-phase/contexto-vs-prompt'},
            {en: '/phases/context-phase/who-participates', es: '/fases/context-phase/quien-participa'},
            {en: '/phases/context-phase/rules-the-constitution', es: '/fases/context-phase/reglas-la-constitucion'},
            {en: '/phases/context-phase/agents-orchestrators-and-executors', es: '/fases/context-phase/agentes-orquestadores-y-ejecutores'},
            {en: '/phases/context-phase/skills-concrete-tasks', es: '/fases/context-phase/skills-tareas-concretas'},
            {en: '/phases/context-phase/connection-to-phase-4', es: '/fases/context-phase/conexion-con-fase-4'},
            // Phase 4: AI Build Phase (methodology)
            {en: '/phases/ai-build-phase/why-this-phase-exists', es: '/fases/ai-build-phase/por-que-esta-fase-existe'},
            {en: '/phases/ai-build-phase/the-cost-inversion', es: '/fases/ai-build-phase/la-inversion-del-coste'},
            {en: '/phases/ai-build-phase/what-it-is-and-isnt', es: '/fases/ai-build-phase/que-es-y-que-no-es'},
            {en: '/phases/ai-build-phase/parallel-construction', es: '/fases/ai-build-phase/construccion-paralela'},
            {en: '/phases/ai-build-phase/who-participates', es: '/fases/ai-build-phase/quien-participa'},
            {en: '/phases/ai-build-phase/connection-to-phase-5', es: '/fases/ai-build-phase/conexion-con-fase-5'},
            // Framework Phase 1
            {en: '/framework/phases/problem-phase/step-by-step-process', es: '/framework/fases/problem-phase/proceso-paso-a-paso'},
            {en: '/framework/phases/problem-phase/problem-statement-anatomy', es: '/framework/fases/problem-phase/anatomia-del-problem-statement'},
            {en: '/framework/phases/problem-phase/artifacts', es: '/framework/fases/problem-phase/artefactos'},
            {en: '/framework/phases/problem-phase/anti-patterns', es: '/framework/fases/problem-phase/anti-patrones'},
            {en: '/framework/phases/problem-phase/effort', es: '/framework/fases/problem-phase/esfuerzo'},
            // Framework Phase 2
            {en: '/framework/phases/solution-phase/step-by-step-process', es: '/framework/fases/solution-phase/proceso-paso-a-paso'},
            {en: '/framework/phases/solution-phase/solution-brief-anatomy', es: '/framework/fases/solution-phase/anatomia-del-solution-brief'},
            {en: '/framework/phases/solution-phase/artifacts', es: '/framework/fases/solution-phase/artefactos'},
            {en: '/framework/phases/solution-phase/anti-patterns', es: '/framework/fases/solution-phase/anti-patrones'},
            {en: '/framework/phases/solution-phase/effort', es: '/framework/fases/solution-phase/esfuerzo'},
            // Framework Phase 3
            {en: '/framework/phases/context-phase/step-by-step-process', es: '/framework/fases/context-phase/proceso-paso-a-paso'},
            {en: '/framework/phases/context-phase/context-system-anatomy', es: '/framework/fases/context-phase/anatomia-del-sistema-de-contexto'},
            {en: '/framework/phases/context-phase/artifacts', es: '/framework/fases/context-phase/artefactos'},
            {en: '/framework/phases/context-phase/anti-patterns', es: '/framework/fases/context-phase/anti-patrones'},
            {en: '/framework/phases/context-phase/effort', es: '/framework/fases/context-phase/esfuerzo'},
            // Framework Phase 4
            {en: '/framework/phases/ai-build-phase/step-by-step-process', es: '/framework/fases/ai-build-phase/proceso-paso-a-paso'},
            {en: '/framework/phases/ai-build-phase/parallel-build-anatomy', es: '/framework/fases/ai-build-phase/anatomia-de-la-construccion-paralela'},
            {en: '/framework/phases/ai-build-phase/artifacts', es: '/framework/fases/ai-build-phase/artefactos'},
            {en: '/framework/phases/ai-build-phase/anti-patterns', es: '/framework/fases/ai-build-phase/anti-patrones'},
            {en: '/framework/phases/ai-build-phase/effort', es: '/framework/fases/ai-build-phase/esfuerzo'},
            // Phase 5: Market Phase (methodology)
            {en: '/phases/market-phase/why-this-phase-exists', es: '/fases/market-phase/por-que-esta-fase-existe'},
            {en: '/phases/market-phase/the-learning-spiral', es: '/fases/market-phase/la-espiral-de-aprendizaje'},
            {en: '/phases/market-phase/what-it-is-and-isnt', es: '/fases/market-phase/que-es-y-que-no-es'},
            {en: '/phases/market-phase/market-signals', es: '/fases/market-phase/las-senales-del-mercado'},
            {en: '/phases/market-phase/progressive-automation', es: '/fases/market-phase/automatizacion-progresiva'},
            {en: '/phases/market-phase/who-participates', es: '/fases/market-phase/quien-participa'},
            {en: '/phases/market-phase/the-living-context', es: '/fases/market-phase/el-contexto-vivo'},
            // Framework Phase 5
            {en: '/framework/phases/market-phase/step-by-step-process', es: '/framework/fases/market-phase/proceso-paso-a-paso'},
            {en: '/framework/phases/market-phase/iteration-cycle-anatomy', es: '/framework/fases/market-phase/anatomia-del-ciclo-de-iteracion'},
            {en: '/framework/phases/market-phase/artifacts', es: '/framework/fases/market-phase/artefactos'},
            {en: '/framework/phases/market-phase/anti-patterns', es: '/framework/fases/market-phase/anti-patrones'},
            {en: '/framework/phases/market-phase/effort', es: '/framework/fases/market-phase/esfuerzo'},
            // Resources
            {en: '/resources/glossary', es: '/recursos/glosario'},
            {en: '/resources/tools', es: '/recursos/herramientas'},
          ];

          // Directory-level redirects (translate directory segments)
          // ES pages: /es/fases/X → also reachable via /es/phases/X
          for (const {es, en} of dirMappings) {
            if (existingPath.includes(es)) {
              redirects.push(existingPath.replace(es, en));
              break;
            }
          }
          // EN pages: /phases/X → also reachable via /fases/X
          for (const {es, en} of dirMappings) {
            if (existingPath.includes(en)) {
              redirects.push(existingPath.replace(en, es));
              break;
            }
          }

          // Index-level redirects
          for (const {es, en} of indexMappings) {
            if (existingPath === es) redirects.push(en);
            if (existingPath === en) redirects.push(es);
          }

          // Page-level slug redirects (fixes locale switcher)
          // existingPath never includes locale prefix (/es/) — the plugin
          // handles that internally. Both directions use the same pattern.
          for (const {es, en} of slugMappings) {
            if (existingPath === es) redirects.push(en);
            if (existingPath === en) redirects.push(es);
          }

          return redirects.length > 0 ? redirects : undefined;
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: [
            './src/css/fonts.css',
            './src/css/variables.css',
            './src/css/custom.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    image: 'img/social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: 'Problem-Driven AI',
        src: 'img/logo-dark.png',
        srcDark: 'img/logo-light.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'methodologySidebar',
          position: 'left',
          label: 'Methodology',
        },
        {
          type: 'docSidebar',
          sidebarId: 'frameworkSidebar',
          position: 'left',
          label: 'Framework',
        },
        {
          type: 'docSidebar',
          sidebarId: 'resourcesSidebar',
          position: 'left',
          label: 'Resources',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Methodology',
          items: [
            {label: 'Overview', to: '/overview'},
            {label: 'Manifesto', to: '/manifesto'},
            {label: 'Principles', to: '/principles'},
            {label: 'Phases', to: '/phases'},
          ],
        },
        {
          title: 'Framework',
          items: [
            {label: 'Phases', to: '/framework'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'FAQ', to: '/resources/faq'},
            {label: 'Glossary', to: '/resources/glossary'},
            {label: 'Tools', to: '/resources/tools'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} <a href="https://morcuende.info" target="_blank" rel="noopener noreferrer">Alfonso Morcuende</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer"><img src="https://licensebuttons.net/l/by-sa/4.0/88x31.png" alt="CC BY-SA 4.0" style="vertical-align: middle; height: 20px;" /> CC BY-SA 4.0</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
