import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 760 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
// mid-typing (typewriter starts ~0.5s, runs 2s)
await page.waitForTimeout(1400);
await page.screenshot({ path: '/tmp/typing-mid.png' });
// final
await page.waitForTimeout(2500);
await page.screenshot({ path: '/tmp/typing-final.png' });
await browser.close();
console.log('done');
