import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:4321/#services', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
const s = await page.$('#services'); if (s) await s.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/car-1.png' });
let active = await page.$$eval('.pricing-dot', ds => ds.findIndex(d => d.hasAttribute('data-active')));
console.log('initial active dot:', active);
// tap dot 2 (index 1)
await page.$$eval('.pricing-dot', ds => ds[1].click());
await page.waitForTimeout(700);
await page.screenshot({ path: '/tmp/car-2.png' });
active = await page.$$eval('.pricing-dot', ds => ds.findIndex(d => d.hasAttribute('data-active')));
console.log('after tapping dot 2, active dot:', active);
await browser.close();
