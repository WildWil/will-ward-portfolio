import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
// clip the hero region (top ~1050px)
await page.screenshot({ path: '/tmp/hero-clip.png', clip: { x: 0, y: 0, width: 390, height: 1050 } });
await browser.close();
console.log('done');
