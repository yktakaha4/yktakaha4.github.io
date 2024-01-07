const puppeteer = require('puppeteer');
const { execSync } = require('child_process');

const sleepTime = 3000;
const pdfGenerateTimeout = 60000;

const fontName = 'Noto Sans CJK JP';
const monoFontName = 'Noto Sans Mono CJK JP';
const format = 'A4';
const headerTemplate = '';
const footerTemplate = `
<div style="width: 100%; font-size: 12px; padding: 0 0.5cm; display: flex; justify-content: space-between;">
  <div>
    <span class="title"></span>
  </div>
  <div>
    <span class="pageNumber"></span> / <span class="totalPages"></span>
  </div>
</div>
`;
const margin = {
  top: '0.8cm',
  bottom: '1.2cm',
};

const styleTagContent = `
:root {
  --ifm-font-family-base: '${fontName}', sans-serif !important;
  --ifm-font-family-monospace: '${monoFontName}', monospace !important;
}
`;
const expectedContent = 'yktakaha4.github.io';

const escape = (arg) => `'${arg.replace(/'/g, "'\\''")}'`;

const run = async () => {
  const args = process.argv.slice(2);
  const url = args[0];
  const path = args[1];

  console.log('Precondition check...');
  const stdout = execSync('fc-list');
  for (const font of [fontName, monoFontName]) {
    console.log(`Checking font: ${font}`);
    if (!stdout.toString().includes(font)) {
      throw new Error(`Font not installed: ${font}`);
    }
  }

  console.log(`Starting: Generating PDF from ${url} to ${path}`);
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  console.log('Opening page...');
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: styleTagContent });
  await page.waitForTimeout(sleepTime);

  console.log(`Checking expected content: ${expectedContent}`);
  const content = await page.content();
  if (!content.includes(expectedContent)) {
    throw new Error(`Expected content not found: ${expectedContent}`);
  }

  console.log('Generating PDF...');
  await page.pdf({
    path,
    format,
    displayHeaderFooter: true,
    headerTemplate,
    footerTemplate,
    margin,
    timeout: pdfGenerateTimeout,
  });

  console.log('Writing metadata...');
  const title = (await page.title()) || 'Untitled';
  const author =
    (await page.evaluate(
      () => document.querySelector('meta[property="author"]')?.content,
    )) || 'Unknown';
  console.log(`Title: ${title}, Author: ${author}`);
  await execSync(
    `exiftool -title=${escape(title)} -author=${escape(author)} ${escape(
      path,
    )}`,
  );

  console.log('Closing browser...');
  await browser.close();

  console.log('Done: Generating PDF');
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
