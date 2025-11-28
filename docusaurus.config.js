"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var server_1 = require("react-dom/server");
var fa_1 = require("react-icons/fa");
var dayjs_1 = __importDefault(require("dayjs"));
var bs_1 = require("react-icons/bs");
var process = __importStar(require("process"));
var path = __importStar(require("path"));
var fs_extra_1 = require("fs-extra");
var buildAt = (0, dayjs_1.default)().format();
var commitHash = 'unset';
try {
    commitHash = (0, child_process_1.execSync)('git rev-parse HEAD').toString();
}
catch (e) {
    console.warn(e);
}
// https://soundcloud.com/yktakaha4/sets
var soundPlayerAnchor = 'music';
var soundPlayerHtml = "\n<div id=\"".concat(soundPlayerAnchor, "\">\n<iframe width=\"100%\" title=\"Music Player\" height=\"300\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1746472359&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=true\"></iframe>\n</div>\n");
var iconStyle = {
    style: { display: 'flex', alignItems: 'center', fontSize: '1.2rem' },
};
var iconWrapper = function (iconHtml, title) {
    return "<span title=\"".concat(title, "\">").concat(iconHtml, "</span><span class=\"capy--mobile-only\" style=\"margin-left: 0.5rem\">").concat(title, "</span>");
};
var githubIconHtml = iconWrapper((0, server_1.renderToString)((0, fa_1.FaGithub)(iconStyle)), 'リポジトリを表示する');
var fileDownloadIconHtml = iconWrapper((0, server_1.renderToString)((0, fa_1.FaFileDownload)(iconStyle)), 'PDFファイルをダウンロードする');
var musicIconHtml = iconWrapper((0, server_1.renderToString)((0, bs_1.BsFillMusicPlayerFill)(iconStyle)), 'Music Playerへ移動する');
var metaTitle = 'yktakaha4.github.io';
var metaUrl = 'https://yktakaha4.github.io';
var metaDescription = 'yktakaha4のポートフォリオサイト';
var metaAuthor = 'yktakaha4';
var enableGoogleAnalytics = false;
var gtagTrackingId = 'G-0BP6MEDMHQ';
var repositoryUrl = 'https://github.com/yktakaha4/yktakaha4.github.io';
var pdfUrl = 'https://github.com/yktakaha4/yktakaha4.github.io/releases/latest/download/resume.pdf';
var isDevelopment = process.env.NODE_ENV === 'development';
var isProduction = process.env.NODE_ENV === 'production';
var embeddedContentSourceFilePath = path.join('src', 'embedded', 'source.mdx');
if (!(0, fs_extra_1.existsSync)(embeddedContentSourceFilePath)) {
    (0, fs_extra_1.writeFileSync)(embeddedContentSourceFilePath, '');
}
var withEmbeddedContent = !!(0, fs_extra_1.readFileSync)(embeddedContentSourceFilePath, 'utf-8');
var customFields = {
    buildAt: buildAt,
    commitHash: commitHash,
    isDevelopment: isDevelopment,
    isProduction: isProduction,
    withEmbeddedContent: withEmbeddedContent,
};
var config = {
    title: metaTitle,
    favicon: '/img/favicon.ico',
    url: metaUrl,
    baseUrl: '/',
    organizationName: metaAuthor,
    projectName: metaTitle,
    deploymentBranch: 'master',
    trailingSlash: false,
    onBrokenAnchors: 'log',
    onDuplicateRoutes: 'throw',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',
    i18n: {
        defaultLocale: 'ja',
        locales: ['ja'],
    },
    customFields: customFields,
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
            },
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
            { property: 'twitter:site', content: "@".concat(metaAuthor) },
            { property: 'twitter:player', content: "@".concat(metaAuthor) },
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
        image: 'img/ogp.jpg',
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
                    href: "#".concat(soundPlayerAnchor),
                    html: "<div style=\"display: flex; margin-right: 0.35rem\">".concat(musicIconHtml, "</div>"),
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
            copyright: "\u00A9 ".concat((0, dayjs_1.default)().year(), " Yuuki Takahashi"),
        },
    },
};
exports.default = config;
