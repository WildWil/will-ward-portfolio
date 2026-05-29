import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
try {
  await page.goto('https://example-plumbing-site.warwil533.workers.dev', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'public/work-plumbing.jpg', quality: 82, type: 'jpeg' });
  console.log('captured plumbing site');
} catch (e) {
  console.log('FAILED: ' + e.message);
}
await browser.close();
