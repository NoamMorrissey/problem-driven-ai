import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Problem Drive AI',
  tagline: 'A methodology for solving real problems with Artificial Intelligence',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://problem-drive-ai.dev',
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
          // Map localized ES path segments back to English originals for redirects
          const mappings = [
            {localized: '/principios/', english: '/principles/'},
            {localized: '/fases/', english: '/phases/'},
            {localized: '/modelo-comercial/', english: '/commercial/'},
            {localized: '/planificacion/', english: '/planning/'},
            {localized: '/recursos/', english: '/resources/'},
          ];

          for (const {localized, english} of mappings) {
            if (existingPath.includes(localized)) {
              return [existingPath.replace(localized, english)];
            }
          }

          // Category index pages (exact match, no trailing slash content)
          const indexMappings = [
            {localized: '/principios', english: '/principles'},
            {localized: '/fases', english: '/phases'},
            {localized: '/modelo-comercial', english: '/commercial'},
            {localized: '/planificacion', english: '/planning'},
            {localized: '/recursos', english: '/resources'},
          ];

          for (const {localized, english} of indexMappings) {
            if (existingPath === localized) {
              return [english];
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
          customCss: './src/css/custom.css',
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
      title: 'Problem Drive AI',
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
            {label: 'Principles', to: '/principles'},
            {label: 'Phases', to: '/phases'},
          ],
        },
        {
          title: 'Framework',
          items: [
            {label: 'Processes & Artifacts', to: '/framework'},
            {label: 'Commercial Model', to: '/commercial'},
            {label: 'Planning', to: '/planning'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'Resources', to: '/resources'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Problem Drive AI. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
