const gaTrackingId = process.env.GA_TRACKING_ID;

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
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      }
    },
  },
  themeConfig: {
    navbar: false,
    search: false,
    nextLinks: false,
    prevLinks: false
  }
};
