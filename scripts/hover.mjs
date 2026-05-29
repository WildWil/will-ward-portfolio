import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 760 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
// baseline (no hover)
await page.screenshot({ path: '/tmp/grid-nohover.png' });
// move cursor into the hero left/center area
await page.mouse.move(300, 300, { steps: 10 });
await page.mouse.move(500, 380, { steps: 10 });
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/grid-hover.png' });
await browser.close();
console.log('done');
