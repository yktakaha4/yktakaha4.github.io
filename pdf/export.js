const puppeteer = require('puppeteer');

async function run() {
  const args = process.argv.slice(2);
  const url = args[0];
  const output = args[1];

  console.log(`Starting: Generating PDF from ${url} to ${output}`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--lang=ja'],
  });

  console.log('Opening page...');
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  console.log('Generating PDF...');
  await page.addStyleTag({
    content: `* {font-family: "Noto Sans JP", sans-serif !important;}`,
  });
  await page.pdf({
    path: output,
    format: 'A4',
    displayHeaderFooter: true,
    footerTemplate:
      '<div style="width: 100%; font-size: 12px; padding: 0 0.5cm; display: flex; justify-content: space-between;"><div></div><div><span class="pageNumber"></span> / <span class="totalPages"></span></div></div>',
    margin: {
      top: '0.4cm',
      bottom: '0.8cm',
    },
  });

  await browser.close();
  console.log('Done: Generating PDF');
}

run();
