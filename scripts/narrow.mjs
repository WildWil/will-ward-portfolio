import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const w of [430, 360, 320]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `/tmp/narrow-${w}.png`, fullPage: false });
  await page.close();
}
await browser.close();
console.log('done');
