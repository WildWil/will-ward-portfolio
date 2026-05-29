import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 820 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2600);
await page.screenshot({ path: '/tmp/hero-final.png' });
await browser.close();
console.log('done');
