import { chromium } from 'playwright';
const browser = await chromium.launch();
// About at desktop
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/#about', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
const about = await page.$('#about');
if (about) await about.scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/about-check.png' });
// Mobile full
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await m.waitForTimeout(1500);
await m.screenshot({ path: '/tmp/mobile-full.png', fullPage: true });
await browser.close();
console.log('done');
