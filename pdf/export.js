const puppeteer = require('puppeteer');

async function run() {
  const args = process.argv.slice(2);
  const url = args[0];
  const output = args[1];

  console.log(`Starting: Generating PDF from ${url} to ${output}`);
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  console.log('Opening page...');
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  console.log('Generating PDF...');
  await page.pdf({ path: output, format: 'A4' });

  await browser.close();
  console.log('Done: Generating PDF');
}

run();
