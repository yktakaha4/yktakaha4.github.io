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
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Emoji"
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
      outputFileName: "./out/resume.pdf",
      puppeteerLaunchOptions: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      }
    },
    "@vuepress/google-analytics": {
      "ga": process.env.GA_TRACKING_ID
    },
  },
  themeConfig: {
    navbar: false,
    search: false,
    nextLinks: false,
    prevLinks: false
  }
};
