const gaTrackingId = process.env.GA_TRACKING_ID;

const metas = [
  ["og:url", "https://yktakaha4.github.io/"],
  ["og:type", "website"],
  ["og:title", "yktakaha4.github.io"],
  ["og:description", "自己紹介"],
  ["og:site_name", "yktakaha4.github.io"],
  ["og:image", "https://yktakaha4.github.io/images/yktakaha4.jpg"],
];

module.exports = {
  title: "yktakaha4.github.io",
  description: "",
  dest: "./dist",
  extraWatchFiles: ["**/*"],
  head: [
    ...metas.map(([property, content]) => ["meta", { property, content }]),
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Noto+Sans+JP",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Emoji",
      },
    ],
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "max-age=0, must-revalidate, public",
      },
    ],
    [
      "script",
      {
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`,
      },
    ],
    [
      "script",
      {},
      [
        `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${gaTrackingId}');`,
      ],
    ],
  ],
  plugins: {
    "@snowdog/vuepress-plugin-pdf-export": {
      outputFileName: "./out/resume.pdf",
      puppeteerLaunchOptions: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    },
  },
  themeConfig: {
    navbar: false,
    search: false,
    nextLinks: false,
    prevLinks: false,
  },
};
