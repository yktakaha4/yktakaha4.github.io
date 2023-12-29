import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import dayjs from "dayjs";

const soundPlayer = `
<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1746472359&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=true"></iframe>
`

const config: Config = {
  title: 'yktakaha4.github.io',
  favicon: 'img/favicon.ico',
  url: 'https://yktakaha4.github.io/',
  baseUrl: '/',
  organizationName: 'yktakaha4',
  projectName: 'yktakaha4.github.io',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },
  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: [
            './src/css/custom.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/icon.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: true,
    },
    footer: {
      links: [
        {
          title: 'SNS',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/yktakaha4',
            },
            {
              label: 'Zenn',
              href: 'https://zenn.dev/yktakaha4',
            },
            {
              label: 'Qiita',
              href: 'https://qiita.com/yktakaha4',
            },
            {
              label: 'Connpass',
              href: 'https://connpass.com/user/yktakaha4',
            },
            {
              label: 'Speaker Deck',
              href: 'https://speakerdeck.com/yktakaha4',
            },
            {
              label: 'X',
              href: 'https://x.com/yktakaha4',
            },
          ],
        },
        {
          title: '🎵',
          items: [
            {
              html: soundPlayer,
            },
          ],
        },
      ],
      copyright: `© ${dayjs().year()} Yuuki Takahashi`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
