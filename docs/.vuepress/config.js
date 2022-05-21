module.exports = {
  title: "yktakaha4.github.io",
  description: "",
  dest: "./dist",
  extraWatchFiles: ["**/*"],
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Noto+Sans+JP"
      }
    ],
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "no-cache"
      }
    ]
  ],
  plugins: {
    "@snowdog/vuepress-plugin-pdf-export": {
      outputFileName: "./out/site.pdf",
      puppeteerLaunchOptions: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      }
    },
    '@vuepress/google-analytics': {
      'ga': process.env.GA_TRACKING_ID
    }
  },
  themeConfig: {
    navbar: false,
    search: false,
    nextLinks: false,
    prevLinks: false
  }
};
