import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
for (const id of ['services','it-services','reviews']) {
  const el = await page.$('#' + id);
  if (el) { await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(700); await el.screenshot({ path: `/tmp/mob-${id}.png` }); }
}
await browser.close();
console.log('done');
