import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import ReactDOMServer from 'react-dom/server';
import { FaFileDownload, FaGithub } from 'react-icons/fa';
import dayjs from 'dayjs';
import { BsFillMusicPlayerFill } from 'react-icons/bs';
import { IconBaseProps } from 'react-icons';

// https://soundcloud.com/yktakaha4/sets
const soundPlayerAnchor = 'music';
const soundPlayerHtml = `
<div id="${soundPlayerAnchor}">
<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1746472359&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=true"></iframe>
</div>
`;

const iconStyle: IconBaseProps = {
  style: { display: 'flex', alignItems: 'center', fontSize: '1.2rem' },
};

const iconWrapper = (iconHtml: string, title: string) =>
  `<span title="${title}">${iconHtml}</span><span class="capy--mobile-only" style="margin-left: 0.5rem">${title}</span>`;
const githubIconHtml = iconWrapper(
  ReactDOMServer.renderToString(FaGithub(iconStyle)),
  'リポジトリを表示する',
);
const fileDownloadIconHtml = iconWrapper(
  ReactDOMServer.renderToString(FaFileDownload(iconStyle)),
  'PDFファイルをダウンロードする',
);
const musicIconHtml = iconWrapper(
  ReactDOMServer.renderToString(BsFillMusicPlayerFill(iconStyle)),
  'Music Playerへ移動する',
);

const metaTitle = 'yktakaha4.github.io';
const metaUrl = 'https://yktakaha4.github.io';
const metaDescription = 'yktakaha4のポートフォリオサイト';
const metaAuthor = 'yktakaha4';

const enableGoogleAnalytics = false;
const gtagTrackingId = 'G-0BP6MEDMHQ';

const repositoryUrl = 'https://github.com/yktakaha4/yktakaha4.github.io';
const pdfUrl =
  'https://github.com/yktakaha4/yktakaha4.github.io/releases/latest/download/resume.pdf';

const config: Config = {
  title: metaTitle,
  favicon: '/img/favicon.ico',
  url: metaUrl,
  baseUrl: '/',
  organizationName: metaAuthor,
  projectName: metaTitle,
  deploymentBranch: 'master',
  trailingSlash: false,
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
          customCss: ['src/css/custom.css'],
        },
        gtag: enableGoogleAnalytics
          ? {
              trackingID: gtagTrackingId,
              anonymizeIP: true,
            }
          : undefined,
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    metadata: [
      // SEO
      { property: 'description', content: metaDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: metaUrl },
      { property: 'og:title', content: metaTitle },
      { property: 'og:description', content: metaDescription },
      { property: 'og:site_name', content: metaTitle },
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:site', content: `@${metaAuthor}` },
      { property: 'twitter:player', content: `@${metaAuthor}` },
      { property: 'author', content: metaAuthor },
      {
        httpEquiv: 'Cache-Control',
        content: 'max-age=0, must-revalidate, public',
      },
    ],
    headTags: [
      {
        tagName: 'link',
        attributes: {
          rel: 'preconnect',
          href: metaUrl,
        },
      },
    ],
    image: 'img/icon.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: true,
      items: [
        {
          position: 'right',
          href: repositoryUrl,
          html: githubIconHtml,
        },
        {
          position: 'right',
          href: pdfUrl,
          html: fileDownloadIconHtml,
        },
        {
          position: 'right',
          href: `#${soundPlayerAnchor}`,
          html: `<div style="display: flex; margin-right: 0.35rem">${musicIconHtml}</div>`,
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
