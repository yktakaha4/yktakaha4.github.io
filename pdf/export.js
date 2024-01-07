const puppeteer = require('puppeteer');

const format = 'A4';
const fontName = 'Noto Sans JP';
const footerTemplate = `
<div style="width: 100%; font-size: 12px; padding: 0 0.5cm; display: flex; justify-content: space-between;">
  <div></div>
  <div>
    <span class="pageNumber"></span> / <span class="totalPages"></span>
  </div>
</div>
`;
const margin = {
  top: '0.4cm',
  bottom: '0.8cm',
};

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
    content: `
:root {
  --ifm-font-family-base: "${fontName}" !important;
  --ifm-font-family-monospace: "${fontName}" !important;
}`,
  });
  await page.pdf({
    path: output,
    format,
    displayHeaderFooter: true,
    footerTemplate,
    margin,
  });

  await browser.close();
  console.log('Done: Generating PDF');
}

run();
