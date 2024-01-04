import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import ReactDOMServer from 'react-dom/server';
import {FaFileDownload, FaGithub} from 'react-icons/fa';

import dayjs from "dayjs";
import {BsFillMusicPlayerFill} from "react-icons/bs";
import {IconBaseProps} from "react-icons";

const soundPlayerHtml = `
<div id="music">
<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1746472359&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=true"></iframe>
</div>
`

const iconStyle: IconBaseProps = { style: { display: 'flex', alignItems: 'center', fontSize: '1.2rem' } }
const githubIconHtml = ReactDOMServer.renderToString(FaGithub(iconStyle))
const fileDownloadIconHtml = ReactDOMServer.renderToString(FaFileDownload(iconStyle))
const musicIconHtml = ReactDOMServer.renderToString(BsFillMusicPlayerFill(iconStyle));

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
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: true,
      items: [
        {
          position: 'right',
          href: 'https://github.com/yktakaha4/yktakaha4.github.io',
          html: `<div title="リポジトリを表示する">${githubIconHtml}</div>`,
        },
        {
          position: 'right',
          href: 'https://example.com',
          html: `<div title="PDFファイルをダウンロードする">${fileDownloadIconHtml}</div>`,
        },
        {
          position: 'right',
          to: '#music',
          html: `<div style="margin-right: 0.4rem" title="Music Playerへ移動する">${musicIconHtml}</div>`,
        },
      ],
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
              label: 'note',
              href: 'https://note.com/yktakaha4/',
            },
            {
              label: 'LAPRAS',
              href: 'https://lapras.com/public/yktakaha4',
            },
            {
              label: 'X',
              href: 'https://x.com/yktakaha4',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/profile.php?id=100008421756149',
            },
          ],
        },
        {
          title: 'Music Player',
          items: [
            {
              html: soundPlayerHtml,
            },
          ],
        },
      ],
      copyright: `© ${dayjs().year()} Yuuki Takahashi / Powered by <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">Docusaurus</a>`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
