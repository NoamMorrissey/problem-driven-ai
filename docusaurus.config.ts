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
            // Phase 1: Problem Discovery (methodology)
            {en: '/phases/problem-discovery/why-this-phase-exists', es: '/fases/problem-discovery/por-que-esta-fase-existe'},
            {en: '/phases/problem-discovery/the-solution-trap', es: '/fases/problem-discovery/la-trampa-de-la-solucion'},
            {en: '/phases/problem-discovery/what-it-is-and-isnt', es: '/fases/problem-discovery/que-es-y-que-no-es'},
            {en: '/phases/problem-discovery/cognitive-biases', es: '/fases/problem-discovery/sesgos-cognitivos'},
            {en: '/phases/problem-discovery/who-participates', es: '/fases/problem-discovery/quien-participa'},
            {en: '/phases/problem-discovery/the-questions', es: '/fases/problem-discovery/las-preguntas'},
            {en: '/phases/problem-discovery/connection-to-phase-2', es: '/fases/problem-discovery/conexion-con-fase-2'},
            // Phase 2: Solution Alignment (methodology)
            {en: '/phases/solution-alignment/why-this-phase-exists', es: '/fases/solution-alignment/por-que-esta-fase-existe'},
            {en: '/phases/solution-alignment/anatomy-of-a-good-solution', es: '/fases/solution-alignment/anatomia-de-una-buena-solucion'},
            {en: '/phases/solution-alignment/what-it-is-and-isnt', es: '/fases/solution-alignment/que-es-y-que-no-es'},
            {en: '/phases/solution-alignment/who-participates', es: '/fases/solution-alignment/quien-participa'},
            {en: '/phases/solution-alignment/thinking-about-ai', es: '/fases/solution-alignment/pensar-en-la-ia'},
            {en: '/phases/solution-alignment/connection-to-phase-3', es: '/fases/solution-alignment/conexion-con-fase-3'},
            // Phase 3: Context Engineering (methodology)
            {en: '/phases/context-engineering/why-this-phase-exists', es: '/fases/context-engineering/por-que-esta-fase-existe'},
            {en: '/phases/context-engineering/context-vs-prompt', es: '/fases/context-engineering/contexto-vs-prompt'},
            {en: '/phases/context-engineering/who-participates', es: '/fases/context-engineering/quien-participa'},
            {en: '/phases/context-engineering/rules-the-constitution', es: '/fases/context-engineering/reglas-la-constitucion'},
            {en: '/phases/context-engineering/agents-orchestrators-and-executors', es: '/fases/context-engineering/agentes-orquestadores-y-ejecutores'},
            {en: '/phases/context-engineering/skills-concrete-tasks', es: '/fases/context-engineering/skills-tareas-concretas'},
            {en: '/phases/context-engineering/connection-to-phase-4', es: '/fases/context-engineering/conexion-con-fase-4'},
            // Phase 4: AI Build (methodology)
            {en: '/phases/ai-build/why-this-phase-exists', es: '/fases/ai-build/por-que-esta-fase-existe'},
            {en: '/phases/ai-build/the-cost-inversion', es: '/fases/ai-build/la-inversion-del-coste'},
            {en: '/phases/ai-build/what-it-is-and-isnt', es: '/fases/ai-build/que-es-y-que-no-es'},
            {en: '/phases/ai-build/parallel-construction', es: '/fases/ai-build/construccion-paralela'},
            {en: '/phases/ai-build/who-participates', es: '/fases/ai-build/quien-participa'},
            {en: '/phases/ai-build/connection-to-phase-5', es: '/fases/ai-build/conexion-con-fase-5'},
            // Framework Phase 1
            {en: '/framework/phases/problem-discovery/step-by-step-process', es: '/framework/fases/problem-discovery/proceso-paso-a-paso'},
            {en: '/framework/phases/problem-discovery/problem-statement-anatomy', es: '/framework/fases/problem-discovery/anatomia-del-problem-statement'},
            {en: '/framework/phases/problem-discovery/artifacts', es: '/framework/fases/problem-discovery/artefactos'},
            {en: '/framework/phases/problem-discovery/anti-patterns', es: '/framework/fases/problem-discovery/anti-patrones'},
            {en: '/framework/phases/problem-discovery/effort', es: '/framework/fases/problem-discovery/esfuerzo'},
            // Framework Phase 2
            {en: '/framework/phases/solution-alignment/step-by-step-process', es: '/framework/fases/solution-alignment/proceso-paso-a-paso'},
            {en: '/framework/phases/solution-alignment/solution-brief-anatomy', es: '/framework/fases/solution-alignment/anatomia-del-solution-brief'},
            {en: '/framework/phases/solution-alignment/artifacts', es: '/framework/fases/solution-alignment/artefactos'},
            {en: '/framework/phases/solution-alignment/anti-patterns', es: '/framework/fases/solution-alignment/anti-patrones'},
            {en: '/framework/phases/solution-alignment/effort', es: '/framework/fases/solution-alignment/esfuerzo'},
            // Framework Phase 3
            {en: '/framework/phases/context-engineering/step-by-step-process', es: '/framework/fases/context-engineering/proceso-paso-a-paso'},
            {en: '/framework/phases/context-engineering/context-system-anatomy', es: '/framework/fases/context-engineering/anatomia-del-sistema-de-contexto'},
            {en: '/framework/phases/context-engineering/artifacts', es: '/framework/fases/context-engineering/artefactos'},
            {en: '/framework/phases/context-engineering/anti-patterns', es: '/framework/fases/context-engineering/anti-patrones'},
            {en: '/framework/phases/context-engineering/effort', es: '/framework/fases/context-engineering/esfuerzo'},
            // Framework Phase 4
            {en: '/framework/phases/ai-build/step-by-step-process', es: '/framework/fases/ai-build/proceso-paso-a-paso'},
            {en: '/framework/phases/ai-build/parallel-build-anatomy', es: '/framework/fases/ai-build/anatomia-de-la-construccion-paralela'},
            {en: '/framework/phases/ai-build/artifacts', es: '/framework/fases/ai-build/artefactos'},
            {en: '/framework/phases/ai-build/anti-patterns', es: '/framework/fases/ai-build/anti-patrones'},
            {en: '/framework/phases/ai-build/effort', es: '/framework/fases/ai-build/esfuerzo'},
            // Phase 5: Market Iteration (methodology)
            {en: '/phases/market-iteration/why-this-phase-exists', es: '/fases/market-iteration/por-que-esta-fase-existe'},
            {en: '/phases/market-iteration/the-learning-spiral', es: '/fases/market-iteration/la-espiral-de-aprendizaje'},
            {en: '/phases/market-iteration/what-it-is-and-isnt', es: '/fases/market-iteration/que-es-y-que-no-es'},
            {en: '/phases/market-iteration/market-signals', es: '/fases/market-iteration/las-senales-del-mercado'},
            {en: '/phases/market-iteration/progressive-automation', es: '/fases/market-iteration/automatizacion-progresiva'},
            {en: '/phases/market-iteration/who-participates', es: '/fases/market-iteration/quien-participa'},
            {en: '/phases/market-iteration/the-living-context', es: '/fases/market-iteration/el-contexto-vivo'},
            // Framework Phase 5
            {en: '/framework/phases/market-iteration/step-by-step-process', es: '/framework/fases/market-iteration/proceso-paso-a-paso'},
            {en: '/framework/phases/market-iteration/iteration-cycle-anatomy', es: '/framework/fases/market-iteration/anatomia-del-ciclo-de-iteracion'},
            {en: '/framework/phases/market-iteration/artifacts', es: '/framework/fases/market-iteration/artefactos'},
            {en: '/framework/phases/market-iteration/anti-patterns', es: '/framework/fases/market-iteration/anti-patrones'},
            {en: '/framework/phases/market-iteration/effort', es: '/framework/fases/market-iteration/esfuerzo'},
            // Framework section indexes
            {en: '/framework/processes', es: '/framework/procesos'},
            {en: '/framework/artifacts', es: '/framework/artefactos'},
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
            {label: 'Manifesto', to: '/overview/manifiesto'},
            {label: 'Principles', to: '/principles'},
            {label: 'Phases', to: '/phases'},
          ],
        },
        {
          title: 'Framework',
          items: [
            {label: 'Phases', to: '/framework'},
            {label: 'Processes', to: '/framework/processes'},
            {label: 'Artifacts', to: '/framework/artifacts'},
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
