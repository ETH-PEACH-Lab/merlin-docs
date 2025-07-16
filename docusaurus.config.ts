import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Mermaid Documentation',
  tagline: 'Bridging Code and Diagrams for Better Understanding',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://eth-peach-lab.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/merlin-docs',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ETH-PEACH-Lab', // Usually your GitHub org/user name.
  projectName: 'merlin-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ETH-PEACH-Lab/merlin-docs/tree/main/',
          remarkPlugins: [],
          rehypePlugins: [],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  markdown: {
    mermaid: true,
  },

  themes: [
    '@docusaurus/theme-mermaid',
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/merlin-social-card.jpg',
    navbar: {
      title: 'Merlin',
      logo: {
        alt: 'Merlin Logo',
        src: 'img/logo.svg',
        width: 24,
        height: 24,
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/development',
          label: 'Development',
          position: 'left',
        },
        {
          to: 'https://eth-peach-lab.github.io/merlin/',
          label: 'Merlin Editor',
          position: 'left',
        },
        {
          href: 'https://github.com/ETH-PEACH-Lab/merlin',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ETH-PEACH-Lab/merlin',
            },
            {
              label: 'PEACH Lab',
              href: 'https://peachlab.inf.ethz.ch',
            },
            {
              label: 'Merlin Editor',
              href: 'https://eth-peach-lab.github.io/merlin/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PEACH Lab.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['merlin', 'bash'], // Add any additional languages you want to support
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
