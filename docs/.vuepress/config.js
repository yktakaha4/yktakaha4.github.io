module.exports = {
  title: 'yktakaha4.github.io',
  description: '',
  dest: './dist',
  extraWatchFiles: [
    '**/*'
  ],
  head: [
    [
      'link', {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP'
      }
    ]
  ],
  plugins: [
    ['@snowdog/vuepress-plugin-pdf-export', {
      outputFileName: './out/site.pdf',
      puppeteerLaunchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    }]
  ],
  themeConfig: {
    navbar: false,
    search: false,
    nextLinks: false,
    prevLinks: false
  }
};
