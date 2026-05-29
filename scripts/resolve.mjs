import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
try {
  await page.goto('https://share.google/nxhCQB9l7DoTD76EQ', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(3000);
  console.log('FINAL URL: ' + page.url());
  const title = await page.title();
  console.log('TITLE: ' + title);
} catch (e) { console.log('ERR: ' + e.message + ' | url=' + page.url()); }
await browser.close();
