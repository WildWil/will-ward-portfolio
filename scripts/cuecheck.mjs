import { chromium } from 'playwright';
const browser = await chromium.launch();
// mobile: cue hidden
let page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
console.log('MOBILE scroll-cue visible (expect false):', await page.isVisible('.scroll-cue'));
await page.close();
// desktop: cue still visible
page = await browser.newPage({ viewport: { width: 1440, height: 820 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
console.log('DESKTOP scroll-cue visible (expect true):', await page.isVisible('.scroll-cue'));
await browser.close();
