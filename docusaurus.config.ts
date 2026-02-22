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
          const mappings = [
            {es: '/principios/', en: '/principles/'},
            {es: '/fases/', en: '/phases/'},
            {es: '/framework/fases/', en: '/framework/phases/'},
            {es: '/recursos/', en: '/resources/'},
          ];

          const indexMappings = [
            {es: '/principios', en: '/principles'},
            {es: '/fases', en: '/phases'},
            {es: '/recursos', en: '/resources'},
          ];

          // ES pages: redirect English-segment URLs → Spanish-segment URLs
          // e.g. /es/phases/problem-discovery → /es/fases/problem-discovery
          for (const {es, en} of mappings) {
            if (existingPath.includes(es)) {
              return [existingPath.replace(es, en)];
            }
          }
          for (const {es, en} of indexMappings) {
            if (existingPath === es) {
              return [en];
            }
          }

          // EN pages: redirect Spanish-segment URLs → English-segment URLs
          // Fixes locale switcher: ES→EN tries /fases/x, needs redirect to /phases/x
          for (const {es, en} of mappings) {
            if (existingPath.includes(en)) {
              return [existingPath.replace(en, es)];
            }
          }
          for (const {es, en} of indexMappings) {
            if (existingPath === en) {
              return [es];
            }
          }

          return undefined;
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
      title: 'Problem-Driven AI',
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
